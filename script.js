const $ = (sel) => document.querySelector(sel);

function setupMobileNav() {
  const toggle = $(".menu-toggle");
  const nav = $("#primary-nav");
  if (!toggle || !nav) return;

  const setExpanded = (expanded) => {
    toggle.setAttribute("aria-expanded", String(expanded));
    nav.classList.toggle("nav-open", expanded);
    toggle.setAttribute("aria-label", expanded ? "Close menu" : "Open menu");
  };

  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    setExpanded(!expanded);
  });

  // Close menu after clicking a link (mobile)
  nav.addEventListener("click", (e) => {
    const link = e.target.closest("a[href^='#']");
    if (!link) return;
    setExpanded(false);
  });

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    setExpanded(false);
  });
}

function setupContactForm() {
  const form = $("#contact-form");
  const note = $("#form-note");
  if (!form || !note) return;

  const mailTo = "hello@youragency.com"; // <-- edit this to your real inbox

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const company = String(data.get("company") || "").trim();
    const service = String(data.get("service") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !email || !service || !message) {
      note.textContent = "Please complete all required fields.";
      return;
    }

    note.textContent = "Opening your email client...";

    const subject = encodeURIComponent(`New inquiry: ${service}`);
    const body = encodeURIComponent(
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Company: ${company || "-"}\n` +
      `Service: ${service}\n\n` +
      `Message:\n${message}\n`
    );

    window.location.href = `mailto:${mailTo}?subject=${subject}&body=${body}`;
    // Let the mail client open; show final message optimistically.
    setTimeout(() => {
      note.textContent = "If your mail client didn’t open, copy the message and email us directly.";
    }, 800);
  });
}

function setupFooterYear() {
  const year = $("#year");
  if (!year) return;
  year.textContent = String(new Date().getFullYear());
}

setupMobileNav();
setupContactForm();
setupFooterYear();

