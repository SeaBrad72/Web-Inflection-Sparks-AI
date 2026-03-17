# InflectionSparks.ai — Rebrand & Website Plan

## Context

Bradley is rebranding from Inflection Spark Solutions (inflectionsparksolutions.com, built on Wix) to InflectionSparks.ai. The existing site is corporate-consulting-heavy and doesn't reflect the expanded builder/engineering capabilities Bradley now offers. This is a ground-up rebuild: new brand positioning, new service framework, modern website. The approach is a **Parallel Design Sprint** — brand and website design happen together iteratively, with each section forcing the next brand decision.

---

## Brand Strategy (Locked)

### Service Framework: Lead. Build. Transform.

**LEAD**
- Fractional CTO / CAIO / CPO
- AI Strategy & Governance
- Product & Technology Roadmap
- Board & Executive Advisory
- AI Readiness Assessment

**BUILD**
- Product Design & Strategy
- AI-Embedded Products
- AI-Powered Workflows
- Software & Platform Development
- Platform Modernization

**TRANSFORM**
- Engineering & Product Org Redesign
- AI-Native Dev Methodology (Agile → Agentic)
- Team Upskilling & Adoption
- Self-Sufficiency by Design

### Three Cross-Cutting AI Engagement Modes
1. **AI in your products** — intelligent features for end users
2. **AI in your operations** — workflow automation, copilots
3. **AI as your development methodology** — agentic development, not traditional agile

### Brand Promise (through-line)
"We embed with your organization, upskill your people, and leave you self-sufficient."

### Key Differentiator
Not a body shop, not a consulting firm. We work THROUGH the organization — supplementing where needed, upskilling existing teams, and designing for self-sufficiency from day one.

### Target Audience
Enterprise-level decision makers: CTOs, CEOs, COOs, CPOs, board members. Growth-stage (Series B+) through enterprise. Companies at various stages of AI readiness.

---

## Homepage Messaging (Locked — Scroll Narrative)

### 1. Hero: The Anti-Consultant
> "We don't sell AI strategy decks. We embed with your teams, rebuild your engineering org, ship your products, and leave you self-sufficient."
>
> CTAs: [Start the Conversation] [Book an AI Readiness Call]

### 2. Credential Section: The Battle-Tested Builder
> "I've rebuilt engineering orgs at BMW, Sony, and Whitepages through every major platform shift. AI is the biggest one yet."

### 3. Thesis / Services Intro: The Provocation
> "Your agile process is slowing you down. Your teams aren't structured for AI. Your pilots aren't scaling. We fix all three."
>
> → Leads into Lead. Build. Transform. framework

### 4. Services Overview
Three-card layout: Lead / Build / Transform with brief descriptions and links to detail pages.

### 5. Proof Points
Curated metrics from past projects (e.g., "75% downtime reduction", "82% conversion lift", "32% OpEx reduction").

### 6. Featured Case Study
One highlighted project with problem/action/result.

### 7. CTA
[Start the Conversation] [Book an AI Readiness Call]

---

## Site Architecture

```
Nav: Home | Services ▾ | Work | Insights | About | Contact

├─ Home (scroll narrative above)
│
├─ Services (dropdown)
│  ├─ /lead — Fractional Leadership & AI Strategy
│  ├─ /build — Products, AI Engineering & Development
│  └─ /transform — Org & Team Evolution
│
├─ Work (Case Studies)
│  ├─ Curated from 15+ past projects
│  └─ Organized by pillar or industry
│
├─ Insights (Blog / Thought Leadership)
│  ├─ Migrate best articles from current Wix site
│  └─ AI Disruption Playbook as lead magnet
│
├─ About
│  ├─ Bradley's story & credentials
│  ├─ Philosophy ("through your org, not around it")
│  └─ Industries served
│
└─ Contact
   ├─ Contact form + Calendly embed
   └─ AI Readiness Assessment CTA

Optional future:
└─ /ai-readiness — standalone assessment tool
   Based on Playbook's 6-dimension readiness model
```

---

## Visual Identity Direction

### Logo
Keep existing InflectionSparks.ai logos (human profile + spark + neural circuits). Banner version for nav, mark version for favicon.

### Color Palette (Modernized, dark-mode-first)
- **Background:** Near-black (#0A0A0B or #09090B) — Linear-style dark
- **Surface:** Dark gray (#171717) — cards, sections
- **Primary accent:** Teal from logo (~#2F855A) — links, highlights
- **Highlight:** Orange from logo (#F97316) — CTAs, sparingly
- **Text:** White (#FAFAFA) for headings, muted gray (#A1A1AA) for body
- **Light mode:** Available but dark-mode-first design

### Typography
- **Headings:** Inter or Geist Sans (clean, modern, technical)
- **Body:** Inter or system font stack
- **Monospace accents:** Geist Mono (for code/tech credibility touches)

### Aesthetic References
- Linear.app — dark, clean, sharp, technical
- Vercel.com — bold typography, gradient accents, premium feel
- Resend.com — simple, confident, builder-focused

### Animation & Polish
- Smooth scroll animations (Framer Motion)
- Subtle gradient glows on hover
- Page transitions
- Clean micro-interactions

---

## Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | Next.js 15 (App Router) + React 19 + TypeScript | SSG for marketing pages, SSR for blog. Deploys natively to Vercel. |
| Styling | Tailwind CSS v4 | Utility-first, rapid iteration, perfect for dark-mode Linear aesthetic. |
| CMS | Sanity (free tier: 2 users, 500k API req/mo) | Blog posts without touching code. Real-time preview. |
| Animation | Framer Motion | Scroll animations, page transitions, premium feel. |
| Deployment | Vercel | Native Next.js hosting. Edge functions, analytics, custom domains. |
| Email | Resend (free tier: 100 emails/day) | Contact form delivery. |
| Booking | Calendly embed | Already in use on current site. |
| Analytics | Plausible or Vercel Analytics | Privacy-first, lightweight. |
| Icons | Lucide React | Clean, consistent icon set. |

---

## Existing Assets

| Asset | Location | Usage |
|-------|----------|-------|
| Logos | `assets/brand/Brand & Logos/` | Nav, footer, favicon, OG images |
| Headshots | `assets/brand/Headshots/` | About page |
| Past Projects | `assets/projects/Past Projects - 071925.pdf` | Source for case studies page |
| AI Playbook | `assets/playbooks/AI Disruption Playbook.pdf` | Lead magnet, insights content |
| LinkedIn | `assets/reference/LinkedIn Profile 021226.pdf` | About page copy, credentials |
| Resumes (4) | `assets/resumes/` | Service detail pages, credential backing |
| Current site | `.firecrawl/` scraped pages | Reference for content parity |

---

## Development Phases (Parallel Design Sprint)

### Phase 1: Foundation (Sessions 1-2)
- [ ] Initialize Next.js 15 project with TypeScript + Tailwind
- [ ] Set up project structure, Vercel deployment pipeline
- [ ] Configure Sanity CMS for blog content
- [ ] Establish design system (colors, typography, spacing, components)
- [ ] Build shared layout (nav, footer, dark theme)
- [ ] **Homepage hero section** — forces visual identity decisions
- [ ] Use visual companion for mockup review with Bradley

### Phase 2: Homepage + Services (Sessions 3-4)
- [ ] Complete homepage (full scroll narrative)
- [ ] Build /lead service page
- [ ] Build /build service page
- [ ] Build /transform service page
- [ ] Responsive design pass

### Phase 3: Content Pages (Sessions 5-6)
- [ ] Build /work (case studies) — curate 6-8 strongest from past projects
- [ ] Build /about — Bradley's story, philosophy, industries
- [ ] Build /contact — form + Calendly + AI readiness CTA
- [ ] Build /insights — blog listing page + article template
- [ ] Migrate top blog posts from current site via Sanity

### Phase 4: Polish & Launch (Sessions 7-8)
- [ ] Animation and micro-interaction pass
- [ ] SEO optimization (meta tags, OG images, structured data)
- [ ] Performance optimization (Core Web Vitals)
- [ ] Accessibility audit
- [ ] Cross-browser / cross-device testing
- [ ] Deploy to inflectionsparks.ai (once domain acquired)
- [ ] Set up analytics
- [ ] Redirect strategy from old domain (if desired)

---

## Verification / Testing

- [ ] All pages render correctly in Chrome, Firefox, Safari, mobile
- [ ] Lighthouse scores: 90+ across all categories
- [ ] Contact form sends emails successfully via Resend
- [ ] Blog posts can be created/edited in Sanity Studio
- [ ] Calendly embed loads and is bookable
- [ ] Dark mode is default, light mode toggle works
- [ ] All case study content is accurate to source materials
- [ ] Nav works on mobile (hamburger menu)
- [ ] SEO: proper meta tags, OG images, sitemap.xml, robots.txt
- [ ] HTTPS + custom domain configured on Vercel

---

## Key File Structure

```
Web-Inflection-Sparks-AI/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout (nav, footer, theme)
│   │   ├── page.tsx            # Homepage
│   │   ├── lead/page.tsx       # Lead service page
│   │   ├── build/page.tsx      # Build service page
│   │   ├── transform/page.tsx  # Transform service page
│   │   ├── work/page.tsx       # Case studies listing
│   │   ├── about/page.tsx      # About page
│   │   ├── contact/page.tsx    # Contact page
│   │   └── insights/
│   │       ├── page.tsx        # Blog listing
│   │       └── [slug]/page.tsx # Blog article
│   ├── components/
│   │   ├── nav.tsx
│   │   ├── footer.tsx
│   │   ├── hero.tsx
│   │   ├── service-card.tsx
│   │   ├── case-study-card.tsx
│   │   └── ...
│   └── lib/
│       ├── sanity.ts           # Sanity client config
│       └── types.ts            # Shared TypeScript types
├── sanity/
│   ├── schemas/                # Sanity content schemas
│   └── sanity.config.ts
├── public/
│   ├── logos/                  # Logo assets
│   └── images/                 # Static images
├── tailwind.config.ts
├── next.config.ts
└── package.json
```
