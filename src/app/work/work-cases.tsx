"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Stethoscope,
  Car,
  Music,
  Film,
  Radio,
  ChevronDown,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface CaseStudy {
  id: string;
  company: string;
  title: string;
  industry: string;
  industryIcon: LucideIcon;
  pillar: "Lead" | "Build" | "Transform";
  metric: string;
  metricLabel: string;
  summary: string;
  problem: string;
  action: string;
  result: string;
  tags: string[];
}

const cases: CaseStudy[] = [
  {
    id: "matrix-medical",
    company: "Matrix Medical Network",
    title: "Cloud-native migration & org transformation for PE-backed healthcare",
    industry: "Healthcare",
    industryIcon: Stethoscope,
    pillar: "Transform",
    metric: "75%",
    metricLabel: "reduction in downtime",
    summary:
      "Migrated a PE-backed healthcare company from legacy hardware to cloud-native infrastructure while consolidating 11 fragmented engineering teams into 4 autonomous squads.",
    problem:
      "Matrix Medical's legacy infrastructure suffered from chronic downtime, costly maintenance, and compliance vulnerabilities. The engineering organization was fragmented across 11 teams — 63 internal engineers, 26 contractors, and ~40 offshore engineers — operating in silos with monthly waterfall releases, frequent outages, and poor morale. The company was preparing for a private equity-driven transaction and needed to modernize fast.",
    action:
      "Led a comprehensive modernization: migrated from legacy hardware to Azure, Kubernetes (OpenShift), and Terraform. Simultaneously redesigned the entire engineering organization — consolidating 11 teams into 4 customer-centric Agile squads (Provider Experience, Patient Experience, Carrier Experience, Data). Introduced rigorous DevSecOps pipelines, CI/CD, automated testing, and embedded QA/DevOps within each squad. Managed the subsequent offboarding of 26 contractors and rebadging of 63 engineers to an offshore vendor, all without operational disruption.",
    result:
      "75% reduction in downtime. 40-50% cut in operational costs. Deployment velocity shifted from monthly waterfall to continuous delivery. HITRUST compliance maintained through automated audits. The streamlined org structure directly enabled the PE transaction, including clean contractor offboarding and a smooth leadership handoff.",
    tags: [
      "Cloud Migration",
      "Org Redesign",
      "DevSecOps",
      "Agile Transformation",
      "PE Transaction",
      "Healthcare Compliance",
    ],
  },
  {
    id: "whitepages",
    company: "Whitepages",
    title: "Platform rebuild & ML-driven conversion engine at scale",
    industry: "Identity & SaaS",
    industryIcon: Building2,
    pillar: "Build",
    metric: "82%",
    metricLabel: "increase in conversion rates",
    summary:
      "Rebuilt a 25M+ monthly-visit platform from legacy monoliths to cloud-native microservices while deploying ML models that drove an 82% conversion lift.",
    problem:
      "Following a corporate split, Whitepages was left with outdated Ruby and Python monoliths burdened by severe technical debt, scalability constraints, and reliability issues. Most engineering talent had departed with the B2B spinoff (Ekata). The company needed a complete technology re-platforming and organizational rebuild within an aggressive 18-month timeline — complicated further by the onset of COVID-19.",
    action:
      "As VP of Engineering & Data Strategy, led a zero-downtime migration from legacy monoliths to cloud-native microservices. Rebuilt and expanded engineering, QA, SRE, and product teams by 170%. Developed ML-driven personalization and conversion platform that transformed the user experience. Implemented GDPR and CCPA compliance frameworks protecting 300M+ user records. Simultaneously launched a Data Privacy & Fraud Prevention product using ML-based behavioral analysis.",
    result:
      "82% increase in conversion rates from free to premium users. 32% reduction in operational expenses. 45%+ improvement in search relevance. Team grew 170% across North and South America. Platform handled 25M+ monthly visits with dramatically improved reliability. COVID-19 emergency contact product provided life-saving assistance to healthcare providers nationwide.",
    tags: [
      "Platform Modernization",
      "Machine Learning",
      "Zero-Downtime Migration",
      "Data Privacy",
      "GDPR/CCPA",
      "Team Building",
    ],
  },
  {
    id: "bmw-reachnow",
    company: "BMW / ReachNow",
    title: "Mobility platform, IoT gateway & ML-powered fleet intelligence",
    industry: "Automotive & Mobility",
    industryIcon: Car,
    pillar: "Build",
    metric: "67%",
    metricLabel: "fleet operations cost reduction",
    summary:
      "Rebuilt BMW's car-sharing platform from the ground up, engineered an IoT API gateway around hardware constraints, and deployed ML models that cut fleet costs by 67%.",
    problem:
      "ReachNow launched with severe technical challenges: outsourced technology, unreliable IoT hardware in vehicles, and a failing mobile app. Roughly 1 in 7 reservations required customer support, nearly half requiring tow trucks. iOS ratings sat at 1.4. Fleet operations bled money through manual vehicle repositioning and unpredictable maintenance. BMW executive confidence was low.",
    action:
      "Secured BMW Munich approval to internally rebuild the core platform. Engineered an innovative IoT API Gateway to work around 6-year hardware lifecycle constraints, enabling full remote functionality. Led complete mobile app redesign from scratch. Built ML models for predictive fleet repositioning, maintenance scheduling, and demand forecasting. Implemented fraud prevention after 40 BMWs were stolen in the first week of Brooklyn launch. Built internal teams in Seattle and Munich.",
    result:
      "Customer support calls dropped from 1:7 to fewer than 1:32 reservations. iOS ratings jumped from 1.4 to 4.8. Fleet operations costs reduced 67% via ML optimization. 9% increase in monthly revenue per vehicle. Vehicle theft virtually eliminated. Platform became the strategic technology hub for the BMW-Daimler joint venture ('Your Now'), with estimated valuation increase of several hundred million dollars.",
    tags: [
      "IoT & Telematics",
      "Machine Learning",
      "Mobile Development",
      "Fleet Optimization",
      "Cybersecurity",
      "Joint Venture Strategy",
    ],
  },
  {
    id: "ingrooves",
    company: "INgrooves / Universal Music Group",
    title: "Global platform modernization & 175-person org unification",
    industry: "Entertainment & Media",
    industryIcon: Music,
    pillar: "Transform",
    metric: "32%",
    metricLabel: "reduction in operating expenses",
    summary:
      "Modernized an 11-year-old monolithic music distribution platform to cloud-native microservices while unifying 175 globally distributed engineers into a cohesive organization.",
    problem:
      "INgrooves operated an aging monolithic platform suffering from chronic instability, downtime, and performance bottlenecks — handling approximately 65% of global music distribution and 30% of global ebook distribution. The engineering organization was fragmented: ~175 independent contractors scattered across six continents with no unified culture, high turnover (50%+ within two years), and no structured development methodology.",
    action:
      "Led comprehensive cloud migration from legacy monolith to microservices architecture. Established INgrooves' first DevOps practice. Opened a dedicated engineering hub in Victoria, Canada, scaling to 65 engineers locally plus 60 globally. Reorganized into clearly defined verticals: Major Label Platforms (UMG), Core Platform, PaaS Integrations, DevOps, QA, and eBook Supply Chain. Introduced Agile across the entire organization — engineering, product, operations, sales, marketing, and executives. Built ML capabilities for streaming trend prediction and revenue optimization.",
    result:
      "32% reduction in operating expenses. Employee retention improved from ~50% to 95%+ annually. Platform stability dramatically improved, virtually eliminating downtime. Release velocity accelerated from bi-weekly to daily deployments. ML-driven trend analytics delivered ~18% revenue uplift for label customers. The transformation positioned INgrooves as a global leader in digital content distribution.",
    tags: [
      "Cloud Migration",
      "Org Transformation",
      "Agile at Scale",
      "Machine Learning",
      "DevOps",
      "Global Teams",
    ],
  },
  {
    id: "sony",
    company: "Sony Pictures Digital Entertainment",
    title: "Pioneering digital media distribution before Netflix existed",
    industry: "Entertainment",
    industryIcon: Film,
    pillar: "Build",
    metric: "$30M+",
    metricLabel: "new revenue from digital distribution",
    summary:
      "Designed and built Sony's first global digital media supply chain and distribution platform — creating download and streaming capabilities that preceded Netflix, YouTube, and iTunes.",
    problem:
      "In the early 2000s, Sony Pictures faced disruption from emerging digital technologies and widespread piracy (Napster, Scour). Reliance on physical media distribution was limiting agility and competitiveness. Sony lacked a secure, scalable digital platform to participate in the emerging digital distribution market.",
    action:
      "Starting as Senior Architect and advancing into senior leadership, designed and implemented Sony's pioneering global digital media supply chain: secure content ingestion, metadata management, rights automation, DRM packaging, transcoding, scheduling, and the first-of-their-kind digital storefronts with multi-channel distribution. Established Sony's first Service-Oriented Architecture (SOA), creating scalable web services before cloud computing existed. Leveraged economies of scale across Sony Pictures, Sony Music, Sony Electronics, and third-party publishers.",
    result:
      "Generated $30M+ in new revenue, creating an entirely new business line from the ground up. Positioned Sony as a first mover in digital distribution — building download and streaming capabilities before Netflix, YouTube, iTunes, and Pandora launched their platforms. The digital infrastructure became foundational for Sony's long-term content strategy.",
    tags: [
      "Digital Transformation",
      "Platform Architecture",
      "Content Distribution",
      "SOA",
      "First Mover",
      "Media & Entertainment",
    ],
  },
  {
    id: "qwest",
    company: "Qwest Communications",
    title: "Enterprise backbone services from zero to $1B annual revenue",
    industry: "Telecom",
    industryIcon: Radio,
    pillar: "Lead",
    metric: "$1B+",
    metricLabel: "annual revenue at departure",
    summary:
      "Transformed a loss-leading telecom division into a billion-dollar enterprise services business through strategic product development and carrier partnerships.",
    problem:
      "Qwest, primarily a fiber optics provider, had acquired third-party enterprise services (Frame Relay, ATM, IP-based) that operated at negative revenue. The company needed to rapidly diversify beyond traditional telecom, build advanced enterprise data services, and capture significant commercial contracts from carriers and large enterprises.",
    action:
      "Progressed from Sales Engineer to Director of Product Development for Enterprise and Carrier Data Services. Led integration of acquired infrastructure, pioneered ATM and Frame Relay interworking, voice and video services over ATM/IP, and QoS-enabled IP services. Managed strategic relationships with BellSouth, US West, and Royal Dutch Telecom. Built Qwest's first North American data centers and co-led joint venture expansion for seven European data centers with Royal Dutch Telecom.",
    result:
      "Transformed a loss-leading division into a high-performing business generating over $1 billion in annual revenue. Backbone network traffic increased 20%+. Qwest established itself among the leading next-generation telecom carriers. The enterprise innovations enabled large-scale commercial contracts and strong carrier partnerships across North America and Europe.",
    tags: [
      "Product Strategy",
      "Enterprise Services",
      "Carrier Partnerships",
      "Data Centers",
      "Revenue Growth",
      "Telecom Infrastructure",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Pillar badge                                                       */
/* ------------------------------------------------------------------ */

function PillarBadge({ pillar }: { pillar: CaseStudy["pillar"] }) {
  const colors = {
    Lead: "border-teal/20 bg-teal/5 text-teal-light hover:bg-teal/10",
    Build: "border-teal/20 bg-teal/5 text-teal-light hover:bg-teal/10",
    Transform: "border-orange/20 bg-orange/5 text-orange hover:bg-orange/10",
  };
  const href = `/${pillar.toLowerCase()}`;
  return (
    <a
      href={href}
      className={`inline-flex items-center px-2.5 py-1 rounded-md border text-xs font-medium tracking-wide transition-colors ${colors[pillar]}`}
    >
      {pillar}
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  Single case card                                                   */
/* ------------------------------------------------------------------ */

function CaseCard({ cs, index }: { cs: CaseStudy; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="rounded-2xl border border-border-subtle bg-surface overflow-hidden"
    >
      {/* Header */}
      <div className="p-5 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Left: content — 3 cols */}
          <div className="lg:col-span-3">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="inline-flex items-center gap-2 text-muted-foreground">
                <cs.industryIcon className="h-4 w-4" />
                <span className="text-xs font-mono uppercase tracking-wider">
                  {cs.industry}
                </span>
              </div>
              <PillarBadge pillar={cs.pillar} />
            </div>

            <h3 className="text-sm font-medium text-teal-light mb-1">
              {cs.company}
            </h3>
            <h2 className="text-xl font-bold mb-3">{cs.title}</h2>
            <p className="text-sm text-muted leading-relaxed">{cs.summary}</p>
          </div>

          {/* Right: hero metric — 1 col */}
          <div className="flex items-center">
            <div className="w-full p-5 rounded-xl border border-teal/10 bg-teal/[0.03] text-center lg:text-left">
              <div className="text-4xl font-bold text-gradient-teal mb-1">
                {cs.metric}
              </div>
              <div className="text-xs text-muted-foreground">
                {cs.metricLabel}
              </div>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-6">
          {cs.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded text-[11px] font-medium text-muted-foreground/70 bg-background border border-border-subtle"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Expand toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-center gap-2 px-5 sm:px-8 py-3 border-t border-border-subtle text-sm text-muted-foreground hover:text-foreground hover:bg-surface-elevated transition-colors cursor-pointer"
      >
        {expanded ? "Hide details" : "Read the full story"}
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Expanded content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 sm:px-8 pb-5 sm:pb-8 pt-2 border-t border-border-subtle">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div>
                  <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                    The Problem
                  </h4>
                  <p className="text-sm text-muted leading-relaxed">
                    {cs.problem}
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                    The Action
                  </h4>
                  <p className="text-sm text-muted leading-relaxed">
                    {cs.action}
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                    The Result
                  </h4>
                  <p className="text-sm text-muted leading-relaxed">
                    {cs.result}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/*  Filter tabs                                                        */
/* ------------------------------------------------------------------ */

const pillars = ["All", "Lead", "Build", "Transform"] as const;

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function WorkCases() {
  const [filter, setFilter] = useState<string>("All");

  const filtered =
    filter === "All" ? cases : cases.filter((c) => c.pillar === filter);

  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Selected engagements
          </h2>
          <p className="text-lg text-muted max-w-2xl mb-8">
            Each of these started with a leadership conversation and ended with
            an organization that didn&apos;t need us anymore.
          </p>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2">
            {pillars.map((p) => (
              <button
                key={p}
                onClick={() => setFilter(p)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  filter === p
                    ? "bg-teal/10 text-teal-light border border-teal/20"
                    : "text-muted-foreground hover:text-foreground border border-border-subtle hover:border-border"
                }`}
              >
                {p}
                {p !== "All" && (
                  <span className="ml-1.5 text-xs text-muted-foreground">
                    ({cases.filter((c) => c.pillar === p).length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Case study cards */}
        <div className="space-y-6">
          {filtered.map((cs, i) => (
            <CaseCard key={cs.id} cs={cs} index={i} />
          ))}
        </div>

        {/* Summary stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: "8", label: "Industries served" },
            { value: "3", label: "Decades of platform shifts" },
            { value: "500+", label: "Engineers led & upskilled" },
            { value: "$1B+", label: "Revenue generated" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-xl border border-border-subtle bg-surface"
            >
              <div className="text-2xl sm:text-3xl font-bold text-gradient-teal mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
