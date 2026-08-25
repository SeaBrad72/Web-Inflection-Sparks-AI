/**
 * In-memory per-IP rate limiting for the public release-notify endpoint.
 *
 * Lives in its own module so the route file exports only its HTTP handler:
 * test-only helpers must not sit in a Next route's public surface.
 *
 * KNOWN LIMITATION (documented in RUNBOOK): state is per-instance and resets
 * on cold start, and `x-forwarded-for` is client-controllable, so this stops
 * casual abuse rather than a determined attacker.
 */

const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000;
// Upper bound on distinct IPs tracked at once. Reaching this triggers a
// sweep of fully-expired entries instead of a full sweep on every request,
// keeping the amortised per-request cost O(1).
const MAX_TRACKED_IPS = 5000;
const hits = new Map<string, number[]>();

/** Test-only visibility into map growth. Not used by production logic. */
export function hitsSize(): number {
  return hits.size;
}

/** Test-only seeding of the map. Not used by production logic. */
export function __seedHitsForTest(ip: string, timestamps: number[]): void {
  hits.set(ip, timestamps);
}

/** Test-only reset of the map. Not used by production logic. */
export function __resetHitsForTest(): void {
  hits.clear();
}

function sweepExpired(now: number): void {
  for (const [candidateIp, timestamps] of hits) {
    const stillRecent = timestamps.filter((t) => now - t < RATE_WINDOW_MS);
    if (stillRecent.length === 0) {
      // Self-clean: an IP with no timestamps left in the window is dropped
      // entirely rather than kept as an empty array.
      hits.delete(candidateIp);
    } else if (stillRecent.length !== timestamps.length) {
      hits.set(candidateIp, stillRecent);
    }
  }
}

export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const isKnownIp = hits.has(ip);
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);

  if (recent.length >= RATE_LIMIT) {
    // Re-insert (delete + set) so Map insertion order tracks recency of
    // last hit, not just first-seen order. This keeps the eviction below
    // O(1)-amortised: the oldest entry is always the Map's first key.
    hits.delete(ip);
    hits.set(ip, recent);
    return true;
  }

  if (!isKnownIp && hits.size >= MAX_TRACKED_IPS) {
    sweepExpired(now);
    if (hits.size >= MAX_TRACKED_IPS) {
      // Cap still full after sweeping expired entries: evict the oldest
      // live entry (the Map's first key — see the re-insert-on-update
      // comment above) and admit the newcomer, instead of failing closed.
      //
      // `x-forwarded-for` is attacker-controlled: fail-closed here would
      // let ~5,000 cheap forged-header POSTs fill the map with live
      // entries and lock out every genuinely new visitor for up to an
      // hour on this instance, with nothing to alert on it — turning a
      // spam control into a denial-of-service lever. Fail-open (skip the
      // cap entirely) would allow unbounded memory growth. Eviction keeps
      // the O(1) memory cap AND keeps the service available to honest
      // users. A rotating-IP attacker was never stoppable by per-IP
      // limiting in the first place — that's a documented known
      // limitation, not something this change is meant to solve.
      const oldestIp = hits.keys().next().value;
      if (oldestIp !== undefined) {
        hits.delete(oldestIp);
      }
    }
  }

  hits.delete(ip);
  recent.push(now);
  hits.set(ip, recent);
  return false;
}
