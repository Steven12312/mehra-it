(() => {
  /* =========================
     HERO VIDEO SAFETY
  ========================= */
  const video = document.querySelector(".hero__video");

  if (video) {
    // iOS / Safari fallback
    video.setAttribute("playsinline", "");
    video.muted = true;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay blockiert → Video pausiert lassen (Overlay bleibt)
        console.warn("Autoplay blocked – video paused.");
      });
    }
  }

  /* =========================
     REDUCED MOTION SUPPORT
  ========================= */
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reduceMotion.matches && video) {
    video.pause();
    video.style.display = "none";
    document.querySelector(".hero--video").classList.add("no-video");
  }

  /* =========================
     SMOOTH SCROLL (SAFETY)
  ========================= */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    });
  });

})();

// Footer Year
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

