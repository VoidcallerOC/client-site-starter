// ============================================================
// FORGE-CT TRADE MASTER — BUSINESS CONFIG
//
// This is the FIRST and (for most forks) the ONLY file you edit.
//
// Everything a new contractor client needs to change lives here:
// business identity, phone/email, CTAs, trust items, services,
// service area, projects, testimonials and hours. main.js reads
// this file and renders it into index.html, so you almost never
// have to hunt through the markup.
//
//   NEW CLIENT WORKFLOW:
//   1. Edit the values below with the client's VERIFIED info.
//   2. Set BUSINESS.demo = false (removes the demo banner + tags).
//   3. Swap brand colors in assets/css/styles.css :root tokens.
//   4. Drop real images into assets/img/ and update the SEO
//      metadata in index.html's <head>, robots.txt and sitemap.xml.
//   5. Deploy to Vercel (static, no build step).
//
// ------------------------------------------------------------
// !! ANTI-FABRICATION RULE — READ BEFORE EDITING !!
// Only enter claims the client has CONFIRMED as true: years in
// business, ratings, licenses, insurance, certifications, awards,
// warranties, response times, customer counts. If you cannot
// verify it, leave it out. Never invent reviews. While
// BUSINESS.demo is true, all sample content is visibly flagged as
// demo; flipping it to false is a promise that every value here is
// real and verified.
// ------------------------------------------------------------
//
// The values below are a DEMO HVAC skin ("Charter Oak Heating &
// Cooling") built on fictional, clearly-marked placeholder data:
// a reserved 555-01xx phone number and a .example email. This is
// the first of many trade skins (plumbing, electrical, roofing,
// landscaping, etc.) — nothing about the master hard-codes HVAC.
// ============================================================

const BUSINESS = {
  // --- Identity ---
  name: "Charter Oak Heating & Cooling",
  shortName: "Charter Oak",           // used in nav / footer brand mark
  tagline: "HVAC done right, the first time",
  trade: "HVAC",                      // for reference/metadata only, not hard-coded
  demo: true,                         // TRUE => show DEMO banner + tag sample content. Set FALSE for a real, verified client.

  // --- Contact (drives every data-business="..." link) ---
  phone: "(860) 555-0142",            // DEMO: 555-01xx is a reserved fictional exchange
  phoneHref: "+18605550142",
  email: "estimates@charteroakhvac.example", // DEMO: .example is a reserved non-routable domain
  address: "West Hartford, CT 06110",
  mapsQuery: "West Hartford, CT 06110",

  // --- Service-area summary (short line used in hero + header) ---
  serviceAreaShort: "Serving Greater Hartford, CT",

  // --- Social profiles (leave "" to hide the link) ---
  social: {
    instagram: "",
    facebook: "",
  },
};

// ------------------------------------------------------------
// CALLS TO ACTION
// The two conversion actions the whole site drives toward. Fully
// configurable per trade/client. The secondary "Call Now" href is
// built automatically from BUSINESS.phoneHref by main.js.
// ------------------------------------------------------------
const CTA = {
  primary:   { label: "Request a Free Estimate", href: "#estimate" },
  secondary: { label: "Call Now" }, // href auto-filled from phone
};

// ------------------------------------------------------------
// HERO
// The first screen. Headline + value prop + both CTAs + location.
// Keep the headline short and specific to the trade.
// ------------------------------------------------------------
const HERO = {
  eyebrow: BUSINESS.serviceAreaShort,
  // Use <em>…</em> to accent a word in the brand's serif italic.
  title: "Comfortable home,<br /><em>honest price.</em>",
  lede: "Fast, clean, code-correct heating and cooling from a local crew that shows up on time and leaves the job right — repairs, installs and maintenance across Greater Hartford.",
  emergency: "24/7 emergency service available", // set "" to hide
  // Quick trust indicators under the hero CTAs. Only list what the
  // client has confirmed — see the anti-fabrication rule above.
  badges: [
    "Free estimates",
    "Licensed & insured",
    "Upfront pricing",
  ],
};

// ------------------------------------------------------------
// TRUST STRIP — quick-scan credibility, just below the hero.
// Only display items the client has actually confirmed.
// ------------------------------------------------------------
const TRUST_ITEMS = [
  { strong: "Locally owned", label: "& operated in CT" },
  { strong: "Licensed & insured", label: "CT HVAC contractor" },
  { strong: "Free estimates", label: "on new installs" },
  { strong: "Upfront pricing", label: "no surprise fees" },
];

// ------------------------------------------------------------
// SERVICES — supports 3–6. Each: name, description, and an
// optional icon key (offerings | service | community — reuse the
// existing CSS icons, or add your own). `anchor` sets the card's
// deep-link target; `cta` overrides the default estimate link.
// ------------------------------------------------------------
const SERVICES = [
  {
    name: "AC Repair",
    description: "Not cooling, short-cycling, or making noise? We diagnose fast and fix it right — most repairs done in a single visit.",
    icon: "service",
  },
  {
    name: "Heating Repair",
    description: "Furnace, boiler or heat pump acting up? Same-day diagnostics and honest options before we touch a thing.",
    icon: "service",
  },
  {
    name: "HVAC Installation",
    description: "Right-sized, properly commissioned systems from trusted brands — with a written estimate and no pressure.",
    icon: "offerings",
  },
  {
    name: "Preventive Maintenance",
    description: "Seasonal tune-ups that catch small problems early, hold efficiency, and protect your equipment warranty.",
    icon: "community",
  },
  {
    name: "Indoor Air Quality",
    description: "Filtration, humidity control and duct solutions for a home that's cleaner, healthier and easier to breathe in.",
    icon: "offerings",
  },
];

// ------------------------------------------------------------
// WHY CHOOSE US — 3–4 concrete differentiators.
// ------------------------------------------------------------
const WHY_US = {
  lead: "We started Charter Oak because Greater Hartford deserved an HVAC company that answers the phone, quotes straight, and treats a home like its own.",
  points: [
    {
      title: "Upfront, written pricing",
      body: "You approve a clear number before we start. No hourly surprises, no mystery line items.",
    },
    {
      title: "Clean, respectful crews",
      body: "Drop cloths down, boots covered, work area spotless before we leave. Every visit.",
    },
    {
      title: "Fixed right the first time",
      body: "We diagnose the actual problem — not the easy one — so you're not calling us back next week.",
    },
    {
      title: "Local and accountable",
      body: "A real Connecticut team you can reach, not a franchise call center three states away.",
    },
  ],
};

// ------------------------------------------------------------
// SERVICE AREA — the towns/region the client covers.
// Use REAL town names the client actually serves. Do not invent
// coverage. `cities` renders as a chip grid.
// ------------------------------------------------------------
const SERVICE_AREA = {
  statement: "Family-run HVAC service across Greater Hartford — if your town is nearby and not listed, call and ask.",
  region: "Hartford County, Connecticut",
  cities: [
    "Hartford", "West Hartford", "Newington", "Wethersfield",
    "Glastonbury", "Manchester", "Farmington", "Bloomfield",
    "Rocky Hill", "Bristol", "Avon", "South Windsor",
  ],
};

// ------------------------------------------------------------
// PROJECTS / PROOF — recent work. Supports a before/after or a
// simple card layout. NEVER invent completed work: until the
// client provides real jobs + photos, leave `placeholder: true`
// so each card is visibly marked as a sample.
//   image:   optional path under /assets/img/projects/ (falls back
//            to a CSS illustration when omitted).
// ------------------------------------------------------------
const PROJECTS = [
  {
    title: "Full system replacement",
    service: "HVAC Installation",
    location: "West Hartford, CT",
    description: "High-efficiency furnace and AC swap for a 1940s colonial — quieter, cheaper to run, done in a day.",
    art: "amber",
    placeholder: true,
  },
  {
    title: "Ductless mini-split add-on",
    service: "Installation",
    location: "Glastonbury, CT",
    description: "Two-zone mini-split for a finished attic that window units could never keep up with.",
    art: "ink",
    placeholder: true,
  },
  {
    title: "Emergency no-heat call",
    service: "Heating Repair",
    location: "Manchester, CT",
    description: "Failed igniter on the coldest night of the year — diagnosed and heating again within the hour.",
    art: "sage",
    placeholder: true,
  },
];

// ------------------------------------------------------------
// TESTIMONIALS — real reviews only, with permission. While
// BUSINESS.demo is true these render with a visible "Demo review"
// tag. Replace with genuine feedback (or remove) before launch —
// never present sample reviews as real.
// ------------------------------------------------------------
const TESTIMONIALS = [
  {
    quote: "Showed up when they said, explained everything, and the price at the end matched the quote. Rare these days.",
    name: "Sample Homeowner",
    meta: "West Hartford",
  },
  {
    quote: "Our furnace died overnight in January. They had heat back on before I left for work. Lifesavers.",
    name: "Sample Homeowner",
    meta: "Manchester",
  },
  {
    quote: "Clean, on time, and no upsell games. The new AC is so much quieter than the old one. Would use again.",
    name: "Sample Homeowner",
    meta: "Glastonbury",
  },
];

// ------------------------------------------------------------
// ESTIMATE FORM — dropdown options for "service needed" and
// "preferred timing". The form is front-end only: submitting
// opens the visitor's email client pre-filled to BUSINESS.email
// (no backend, no data stored). Documented in the form UI.
// ------------------------------------------------------------
const FORM = {
  services: [
    "AC Repair",
    "Heating Repair",
    "New System / Installation",
    "Maintenance / Tune-up",
    "Indoor Air Quality",
    "Something else",
  ],
  timing: [
    "Emergency — as soon as possible",
    "Within a few days",
    "Within a couple weeks",
    "Just getting a quote",
  ],
};

// ------------------------------------------------------------
// HOURS — office / dispatch hours. `closed: true` renders as a
// "Closed" row and drives the open/closed pill in the UI.
// ------------------------------------------------------------
const HOURS = [
  { day: "Sunday", label: "Emergency service only", closed: true },
  { day: "Monday", label: "7:00 AM – 6:00 PM" },
  { day: "Tuesday", label: "7:00 AM – 6:00 PM" },
  { day: "Wednesday", label: "7:00 AM – 6:00 PM" },
  { day: "Thursday", label: "7:00 AM – 6:00 PM" },
  { day: "Friday", label: "7:00 AM – 6:00 PM" },
  { day: "Saturday", label: "8:00 AM – 2:00 PM" },
];
