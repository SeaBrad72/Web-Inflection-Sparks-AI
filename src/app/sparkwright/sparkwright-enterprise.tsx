import { Section, Wrap, Eyebrow, H2, Card, Kbd } from "./sparkwright-ui";

export default function SparkwrightEnterprise() {
  return (
    <Section id="enterprise">
      <Wrap>
        <Eyebrow>For engineering leaders &amp; compliance</Eyebrow>
        <H2>A portable, executable assurance layer you own and run in your own CI.</H2>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Card title="Relative assurance against irreversible damage">
            <p className="text-sm text-muted leading-relaxed">
              A committed agent guard, branch protection with separation of
              duties, and destructive-action denials — reused across
              runtimes via a git <Kbd>pre-push</Kbd> hook and a{" "}
              <Kbd>kit-guard</Kbd> CLI. Risk reduction, stated as such, not a
              guarantee.
            </p>
          </Card>
          <Card title="Audit-ready evidence">
            <p className="text-sm text-muted leading-relaxed">
              Controls map to SOC 2, ISO 27001:2022, and NIST SSDF, with a
              per-control evidence list, a ratification RBAC model, and a
              tested guard.
            </p>
          </Card>
          <Card title="No lock-in">
            <p className="text-sm text-muted leading-relaxed">
              Vendor-neutral, stack-neutral, model-neutral, POSIX-clean. It
              sits alongside your internal developer platform and CI, not
              instead of them.
            </p>
          </Card>
          <Card title="A staged rollout">
            <p className="text-sm text-muted leading-relaxed">
              A Stage 1–4 maturity model tightens conformance as you scale.
              Solo and lite tracks are first-class; non-negotiables
              (secret-scan, branch-protection) always hold.
            </p>
          </Card>
        </div>

        <details
          open
          className="mt-6 rounded-xl border border-border bg-surface overflow-hidden group"
        >
          <summary className="cursor-pointer list-none px-6 py-4 font-semibold flex items-center justify-between hover:bg-white/[0.015] [&::-webkit-details-marker]:hidden">
            <span>Compliance crosswalk — framework by framework</span>
            <span
              aria-hidden="true"
              className="text-teal-light transition-transform group-open:rotate-90"
            >
              ›
            </span>
          </summary>
          <div className="border-t border-border-subtle px-6 pb-6 pt-3">
            <p className="text-sm text-muted leading-relaxed">
              Each row is honestly labelled <em>Kit-enforced / Kit-assisted /
              Org-owned</em>, and a drift-guard holds the assurance tiers in
              place so the labels can&rsquo;t quietly shift.
            </p>

            <div className="mt-6 overflow-x-auto rounded-xl border border-border">
              <table className="w-full min-w-[640px] border-collapse text-sm">
                <thead>
                  <tr>
                    <th scope="col" className="border-b border-border px-4 py-3 text-left font-semibold">
                      Framework
                    </th>
                    <th scope="col" className="border-b border-border px-4 py-3 text-left font-semibold">
                      What the kit assures
                    </th>
                    <th scope="col" className="border-b border-border px-4 py-3 text-left font-semibold">
                      Org-owned
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th
                      scope="row"
                      className="border-b border-border-subtle px-4 py-3 align-top font-normal text-left"
                    >
                      SOC 2
                      <br />
                      <span className="text-muted-foreground font-normal">
                        Security + Privacy
                      </span>
                    </th>
                    <td className="border-b border-border-subtle px-4 py-3 align-top text-muted">
                      CI quality gates, secret-scan, SBOM + provenance,
                      branch protection, agent guard, audit-logging
                      primitives (CC6–CC9, CC1)
                    </td>
                    <td className="border-b border-border-subtle px-4 py-3 align-top text-muted">
                      Personnel/HR, physical security, vendor risk, the
                      platform safety boundary, the privacy program
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="border-b border-border-subtle px-4 py-3 align-top font-normal text-left"
                    >
                      ISO 27001:2022
                      <br />
                      <span className="text-muted-foreground font-normal">
                        Annex A
                      </span>
                    </th>
                    <td className="border-b border-border-subtle px-4 py-3 align-top text-muted">
                      Secure development life cycle, change management,
                      supply-chain integrity, access control in CI, logging
                      (A.8.25/.28/.32, A.5.21)
                    </td>
                    <td className="border-b border-border-subtle px-4 py-3 align-top text-muted">
                      Screening, physical controls, supplier relationships,
                      network egress/segregation
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="px-4 py-3 align-top font-normal text-left"
                    >
                      NIST SSDF
                      <br />
                      <span className="text-muted-foreground font-normal">
                        SP 800-218 + SLSA
                      </span>
                    </th>
                    <td className="px-4 py-3 align-top text-muted">
                      Secure-build practices mapped per control; SLSA Build
                      L2 provenance on artifacts from the reference pipeline
                    </td>
                    <td className="px-4 py-3 align-top text-muted">
                      Broader SSDF program adoption; SLSA L3 (hermetic build)
                      if required
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mt-[22px] text-sm text-muted leading-relaxed">
              A parallel AI-governance crosswalk maps to NIST AI RMF, ISO
              42001, US state law, and OWASP, with templates for AI system
              cards, AI policy, transparency sign-off, and artifact lineage.
            </p>
          </div>
        </details>
      </Wrap>
    </Section>
  );
}
