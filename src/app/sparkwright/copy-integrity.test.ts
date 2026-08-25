import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Guards a defect class this page has hit repeatedly.
 *
 * In JSX, a space between a closing tag and the next word does not survive
 * compilation when a newline falls between them — `<strong>x</strong>\n  y`
 * renders as "xy". The source looks correct, so review does not catch it; it
 * only shows in the rendered page. Eleven instances shipped before this test
 * existed ("insideenforced", "Who it's for.Any team", "promotion— rigor").
 *
 * The rule: a closing emphasis tag followed on the SAME line by a word
 * character is fine (the space is preserved mid-line). A closing tag at
 * end-of-line whose next line starts with a word character is the bug — that
 * needs an explicit {" "}.
 */

const DIR = join(process.cwd(), "src/app/sparkwright");

function sourceFiles(): string[] {
  return readdirSync(DIR).filter(
    (f) => f.endsWith(".tsx") && !f.endsWith(".test.tsx")
  );
}

describe("page copy integrity", () => {
  it("has no emphasis tag whose trailing space would be eaten at a line break", () => {
    const offenders: string[] = [];

    for (const file of sourceFiles()) {
      const lines = readFileSync(join(DIR, file), "utf8").split("\n");
      lines.forEach((line, i) => {
        // A line ending in a closing emphasis tag, where the next line begins
        // with prose rather than markup or an explicit {" "}.
        if (!/<\/(em|strong|code|Kbd)>\s*$/.test(line)) return;
        const next = (lines[i + 1] ?? "").trimStart();
        if (next === "" || next.startsWith("<") || next.startsWith("{")) return;
        // Punctuation correctly hugs the preceding word — ". You", ": nothing",
        // ");" — so no space is wanted there.
        if (/^[.,;:)\]!?]/.test(next)) return;
        offenders.push(`${file}:${i + 1} — "${line.trim().slice(-45)}" ⇢ "${next.slice(0, 35)}"`);
      });
    }

    expect(offenders, `Add {" "} before the line break:\n${offenders.join("\n")}`).toEqual([]);
  });

  it("keeps the research attribution disclaimer on the Why-now section", () => {
    const why = readFileSync(join(DIR, "sparkwright-why.tsx"), "utf8");
    // The statistics are third-party research about an industry problem. If this
    // disclaimer is ever dropped, the page starts presenting other people's
    // findings as Sparkwright's own measured results.
    expect(why).toMatch(/not Sparkwright&rsquo;s results/);
  });

  it("does not reintroduce an advisory or consulting CTA", () => {
    // Deliberately removed: the owner holds a full-time role elsewhere and this
    // page must not read as soliciting business. See spec §4.2.
    for (const file of sourceFiles()) {
      const src = readFileSync(join(DIR, file), "utf8");
      expect(src, `${file} must not link to /contact`).not.toMatch(/href=["']\/contact/);
    }
  });
});
