(() => {
  // year
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  // mobile nav
  const navBtn = document.querySelector("[data-navbtn]");
  const nav = document.querySelector("[data-nav]");
  if (navBtn && nav) {
    navBtn.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      navBtn.setAttribute("aria-expanded", String(open));
    });

    nav.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (!a) return;
      nav.classList.remove("is-open");
      navBtn.setAttribute("aria-expanded", "false");
    });
  }

  // contact -> mailto
  const form = document.querySelector("[data-form]");
  const hint = document.querySelector("[data-formhint]");
  const privacy = document.getElementById("privacy");

  const setHint = (msg) => { if (hint) hint.textContent = msg || ""; };

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const fd = new FormData(form);
      const name = String(fd.get("name") || "").trim();
      const email = String(fd.get("email") || "").trim();
      const subject = String(fd.get("subject") || "").trim();
      const message = String(fd.get("message") || "").trim();

      if (!name || !email || !subject || !message) {
        setHint("Bitte alle Felder ausfüllen.");
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setHint("Bitte eine gültige E-Mail-Adresse eingeben.");
        return;
      }
      if (privacy && !privacy.checked) {
        setHint("Bitte bestätige die Datenschutzerklärung.");
        return;
      }

      setHint("Öffne dein Mailprogramm…");

      const to = "kontakt@mehra-it.de"; // <- ändern falls nötig
      const body =
        `Name: ${name}\n` +
        `E-Mail: ${email}\n\n` +
        `${message}\n`;

      const mailto =
        `mailto:${encodeURIComponent(to)}` +
        `?subject=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(body)}`;

      window.location.href = mailto;

      setTimeout(() => setHint("Wenn sich kein Mailprogramm öffnet: Bitte E-Mail direkt senden."), 900);
    });
  }
})();
