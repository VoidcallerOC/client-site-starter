// ============================================================
// FORGE-CT TRADE MASTER — RENDERER
//
// Reads the config in config.js and populates index.html. Section
// headings and eyebrows stay static in the HTML (crawlable, no-JS
// legible); the repeating item lists, contact links and CTAs are
// rendered from config here so a new client edits one file.
//
// Every render step is defensive: if a container or config value
// is missing, that step is skipped and the rest still runs.
// ============================================================

// Small HTML-escaping helper so config text is never injected raw.
const esc = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// Config values that intentionally contain a little inline markup
// (e.g. HERO.title uses <em> and <br>). Allow only those tags.
const richText = (value) =>
  esc(value)
    .replace(/&lt;(\/?)(em|br)\s*\/?&gt;/g, "<$1$2>");

const byId = (id) => document.getElementById(id);
const setText = (id, text) => { const el = byId(id); if (el) el.textContent = text; };

// ---------- Contact links (data-business sync) ----------
if (typeof BUSINESS !== "undefined") {
  document.querySelectorAll('[data-business="phone-link"]').forEach((el) => {
    el.href = `tel:${BUSINESS.phoneHref}`;
    if (el.dataset.fill === "text") el.textContent = BUSINESS.phone;
  });
  document.querySelectorAll('[data-business="email-link"]').forEach((el) => {
    el.href = `mailto:${BUSINESS.email}`;
    if (el.dataset.fill === "text") el.textContent = BUSINESS.email;
  });
  document.querySelectorAll('[data-business="address-link"]').forEach((el) => {
    el.href = `https://maps.google.com/?q=${encodeURIComponent(BUSINESS.mapsQuery)}`;
  });
  document.querySelectorAll('[data-business="name"]').forEach((el) => {
    el.textContent = BUSINESS.name;
  });
  document.querySelectorAll('[data-business="address-text"]').forEach((el) => {
    el.innerHTML = esc(BUSINESS.address).replace(/,\s*/g, ",<br />");
  });
}

// ---------- CTAs (primary estimate + secondary call) ----------
if (typeof CTA !== "undefined") {
  document.querySelectorAll('[data-cta="primary"]').forEach((el) => {
    el.href = CTA.primary.href;
    const label = el.querySelector(".cta-label") || el;
    label.textContent = CTA.primary.label;
  });
  document.querySelectorAll('[data-cta="secondary"]').forEach((el) => {
    el.href = CTA.secondary.href || `tel:${BUSINESS.phoneHref}`;
    const label = el.querySelector(".cta-label") || el;
    label.textContent = BUSINESS.phone
      ? `${CTA.secondary.label} · ${BUSINESS.phone}`
      : CTA.secondary.label;
  });
}

// ---------- Demo banner ----------
if (typeof BUSINESS !== "undefined" && BUSINESS.demo) {
  const banner = byId("demoBanner");
  if (banner) {
    banner.hidden = false;
    banner.innerHTML =
      `<span class="demo-dot" aria-hidden="true"></span>` +
      `<strong>Demo template</strong> — “${esc(BUSINESS.name)}” is a fictional business. ` +
      `All content, reviews and claims are sample placeholders for demonstration only.`;
  }
}

// ---------- Hero ----------
if (typeof HERO !== "undefined") {
  const eyebrow = byId("heroEyebrow");
  if (eyebrow) eyebrow.insertAdjacentText("beforeend", ` ${HERO.eyebrow}`);
  const title = byId("heroTitle");
  if (title) title.innerHTML = richText(HERO.title);
  setText("heroLede", HERO.lede);

  const emergency = byId("heroEmergency");
  if (emergency) {
    if (HERO.emergency) emergency.textContent = HERO.emergency;
    else emergency.hidden = true;
  }

  const badges = byId("heroBadges");
  if (badges && Array.isArray(HERO.badges)) {
    badges.innerHTML = HERO.badges
      .map((b) => `<li>${esc(b)}</li>`)
      .join("");
  }
}

// ---------- Trust strip ----------
if (typeof TRUST_ITEMS !== "undefined") {
  const grid = byId("trustGrid");
  if (grid) {
    grid.innerHTML = TRUST_ITEMS.map((item) => `
      <div class="trust-item">
        <span class="trust-icon" aria-hidden="true"><span></span></span>
        <span class="trust-copy"><strong>${esc(item.strong)}</strong><span>${esc(item.label)}</span></span>
      </div>`).join("");
  }
}

// ---------- Services ----------
if (typeof SERVICES !== "undefined") {
  const list = byId("serviceList");
  if (list) {
    const iconMarkup = {
      offerings: `<div class="service-icon icon-offerings" aria-hidden="true"><span></span><span></span><span></span></div>`,
      service: `<div class="service-icon icon-service" aria-hidden="true"><span></span><span></span></div>`,
      community: `<div class="service-icon icon-community" aria-hidden="true"><span></span><span></span></div>`,
    };
    list.innerHTML = SERVICES.map((svc, i) => {
      const num = String(i + 1).padStart(2, "0");
      const icon = iconMarkup[svc.icon] || iconMarkup.service;
      const href = svc.cta || (typeof CTA !== "undefined" ? CTA.primary.href : "#estimate");
      const anchor = svc.anchor ? ` id="${esc(svc.anchor)}"` : "";
      return `
        <article class="service-row"${anchor}>
          <span class="service-index">${num}</span>
          ${icon}
          <div class="service-copy"><h3>${esc(svc.name)}</h3><p>${esc(svc.description)}</p></div>
          <a class="circle-arrow" href="${esc(href)}" aria-label="Request an estimate for ${esc(svc.name)}">↗</a>
        </article>`;
    }).join("");
  }
}

// ---------- Why choose us ----------
if (typeof WHY_US !== "undefined") {
  setText("whyLead", WHY_US.lead);
  const grid = byId("whyGrid");
  if (grid && Array.isArray(WHY_US.points)) {
    grid.innerHTML = WHY_US.points.map((p) => `
      <div class="why-card">
        <span class="why-tick" aria-hidden="true"></span>
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.body)}</p>
      </div>`).join("");
  }
}

// ---------- Service area ----------
if (typeof SERVICE_AREA !== "undefined") {
  setText("areaStatement", SERVICE_AREA.statement);
  setText("areaRegion", SERVICE_AREA.region);
  const chips = byId("areaChips");
  if (chips && Array.isArray(SERVICE_AREA.cities)) {
    chips.innerHTML = SERVICE_AREA.cities
      .map((c) => `<li>${esc(c)}</li>`)
      .join("");
  }
}

// ---------- Projects / proof ----------
if (typeof PROJECTS !== "undefined") {
  const grid = byId("projectGrid");
  if (grid) {
    grid.innerHTML = PROJECTS.map((proj, i) => {
      const artClass = `product-art-${proj.art || "amber"}`;
      const tall = i === 0 ? " product-card-tall" : "";
      const media = proj.image
        ? `<div class="product-art ${artClass}" style="background-image:url('${esc(proj.image)}')"></div>`
        : `<div class="product-art ${artClass}" aria-hidden="true"><div class="product-shape-a"></div><div class="product-shadow"></div></div>`;
      const flag = proj.placeholder
        ? `<span class="project-flag">Sample project</span>`
        : "";
      return `
        <article class="product-card${tall}">
          ${media}
          <div class="product-info">
            <div>
              <h3>${esc(proj.title)}</h3>
              <p>${esc(proj.description)}</p>
              <span class="project-meta">${esc(proj.service)}${proj.location ? ` · ${esc(proj.location)}` : ""}</span>
            </div>
            ${flag}
          </div>
        </article>`;
    }).join("");
  }
}

// ---------- Testimonials ----------
if (typeof TESTIMONIALS !== "undefined") {
  const grid = byId("testimonialGrid");
  const isDemo = typeof BUSINESS !== "undefined" && BUSINESS.demo;
  if (grid) {
    grid.innerHTML = TESTIMONIALS.map((t) => `
      <article class="testimonial-card">
        ${isDemo ? `<span class="testimonial-flag">Demo review</span>` : ""}
        <span class="testimonial-mark" aria-hidden="true">&ldquo;</span>
        <p>${esc(t.quote)}</p>
        <span class="testimonial-name">${esc(t.name)}</span>
        <span class="testimonial-meta">${esc(t.meta)}</span>
      </article>`).join("");
  }
}

// ---------- Estimate form selects ----------
if (typeof FORM !== "undefined") {
  const fill = (id, options, placeholder) => {
    const sel = byId(id);
    if (!sel || !Array.isArray(options)) return;
    sel.innerHTML =
      `<option value="" selected disabled>${esc(placeholder)}</option>` +
      options.map((o) => `<option value="${esc(o)}">${esc(o)}</option>`).join("");
  };
  fill("service", FORM.services, "Select a service…");
  fill("timing", FORM.timing, "Select timing…");
}

// ---------- Social links ----------
if (typeof BUSINESS !== "undefined" && BUSINESS.social) {
  document.querySelectorAll('[data-social]').forEach((el) => {
    const url = BUSINESS.social[el.dataset.social];
    if (url) el.href = url;
    else el.hidden = true; // hide unconfigured social links
  });
}

// ---------- Footer year ----------
const yearEl = byId("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---------- Hours + open/closed pill ----------
const hoursEl = byId("hoursList");
const openStatusEl = byId("openStatus");
if (hoursEl && typeof HOURS !== "undefined") {
  const today = new Date().getDay();
  const todayRow = HOURS[today];
  hoursEl.innerHTML = HOURS.map((row, index) => {
    const classes = [index === today ? "today" : "", row.closed ? "closed" : ""].filter(Boolean).join(" ");
    return `<li class="${classes}"><span>${esc(row.day)}</span><span>${esc(row.label)}</span></li>`;
  }).join("");
  if (openStatusEl && todayRow) {
    openStatusEl.textContent = todayRow.closed ? "Closed today" : `Open today · ${todayRow.label}`;
  }
}

// ---------- Mobile nav ----------
const menuBtn = byId("menuBtn");
const nav = byId("nav");
if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.setAttribute("aria-label", "Open navigation");
    });
  });
}

// ---------- Estimate form (front-end only: opens email client) ----------
const form = byId("contactForm");
const status = byId("formStatus");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    const lines = [
      `Name: ${data.name || ""}`,
      `Phone: ${data.phone || ""}`,
      `Email: ${data.email || ""}`,
      `Service needed: ${data.service || ""}`,
      `Property / location: ${data.location || ""}`,
      `Preferred timing: ${data.timing || ""}`,
      ``,
      `Project details:`,
      `${data.message || ""}`,
    ];
    const body = encodeURIComponent(lines.join("\n"));
    const subject = encodeURIComponent(`Estimate request — ${BUSINESS.name}`);
    window.location.href = `mailto:${BUSINESS.email}?subject=${subject}&body=${body}`;
    if (status) status.textContent = "Opening your email app to send the request…";
  });
}
