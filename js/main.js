/* =========================================================
   PEDACINHO DO CÉU — main.js
   Código organizado em pequenos módulos independentes.
   Sem dependências externas — JavaScript puro (ES6+).
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Utilidades ---------- */
  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* =========================================================
     1. HEADER — fundo ao rolar + menu hambúrguer
     ========================================================= */
  function initHeader() {
    const header = $("#siteHeader");
    const hamburger = $("#hamburger");
    const navLinks = $("#navLinks");
    if (!header) return;

    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    if (hamburger && navLinks) {
      hamburger.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("is-open");
        hamburger.classList.toggle("is-open", isOpen);
        hamburger.setAttribute("aria-expanded", String(isOpen));
        document.body.style.overflow = isOpen ? "hidden" : "";
      });

      $$("#navLinks a").forEach((link) => {
        link.addEventListener("click", () => {
          navLinks.classList.remove("is-open");
          hamburger.classList.remove("is-open");
          hamburger.setAttribute("aria-expanded", "false");
          document.body.style.overflow = "";
        });
      });
    }
  }

  /* =========================================================
     2. HERO — expansão da imagem + título em duas linhas ao rolar
     ========================================================= */
  function initHeroScroll() {
    const hero = $(".hero");
    const media = $("#heroMedia");
    const line1 = $("#heroLine1");
    const line2 = $("#heroLine2");
    if (!hero || !media) return;

    let ticking = false;

    const update = () => {
      const heroHeight = hero.offsetHeight;
      const progress = Math.min(Math.max(window.scrollY / heroHeight, 0), 1);

      // Imagem: começa levemente ampliada (1.12) e some para 1.0 conforme rola
      const scale = 1.12 - progress * 0.12;
      media.style.setProperty("--hero-scale", scale.toFixed(3));

      // Título: as duas linhas se separam suavemente
      if (line1 && line2) {
        line1.style.setProperty("--line-shift", `${-progress * 18}px`);
        line2.style.setProperty("--line-shift", `${progress * 18}px`);
        line1.style.setProperty("--line-op", `${1 - progress * 0.6}`);
        line2.style.setProperty("--line-op", `${1 - progress * 0.6}`);
      }
      ticking = false;
    };

    update();
    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          requestAnimationFrame(update);
          ticking = true;
        }
      },
      { passive: true }
    );
  }

  /* =========================================================
     3. REVEAL ON SCROLL — IntersectionObserver
     ========================================================= */
  function initReveal() {
    const items = $$(".reveal");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    items.forEach((el) => io.observe(el));
  }

  /* =========================================================
     4. TABELAS DE PREÇO — expandir/recolher
     ========================================================= */
  function initStationToggles() {
    $$("[data-toggle]").forEach((btn) => {
      const card = btn.closest(".station-card");
      const hiddenRows = $$(".is-hidden", card);
      const label = $("[data-label]", btn);
      if (!hiddenRows.length) {
        btn.style.display = "none";
        return;
      }

      btn.addEventListener("click", () => {
        const willOpen = !btn.classList.contains("is-open");
        btn.classList.toggle("is-open", willOpen);
        hiddenRows.forEach((row) => row.classList.toggle("is-hidden", !willOpen));
        label.textContent = willOpen ? "Ver menos" : "Ver tabela completa";
      });
    });
  }

  /* =========================================================
     5. GALERIA — lightbox
     ========================================================= */
  function initLightbox() {
    const lightbox = $("#lightbox");
    const lightboxImg = $("#lightboxImg");
    const closeBtn = $("#lightboxClose");
    if (!lightbox || !lightboxImg) return;

    const open = (src, alt) => {
      lightboxImg.src = src;
      lightboxImg.alt = alt || "";
      lightbox.classList.add("is-open");
      document.body.style.overflow = "hidden";
    };
    const close = () => {
      lightbox.classList.remove("is-open");
      document.body.style.overflow = "";
      lightboxImg.src = "";
    };

    $$(".gallery-item").forEach((item) => {
      item.addEventListener("click", () => {
        const full = item.getAttribute("data-full");
        const img = $("img", item);
        open(full, img ? img.alt : "");
      });
    });

    closeBtn.addEventListener("click", close);
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) close();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
  }

  /* =========================================================
     6. DEPOIMENTOS — navegação do carrossel
     ========================================================= */
  function initTestimonials() {
    const track = $("#testiTrack");
    const prev = $("#testiPrev");
    const next = $("#testiNext");
    if (!track || !prev || !next) return;

    const scrollByCard = (dir) => {
      const card = $(".testi-card", track);
      const gap = 26;
      const amount = card ? card.offsetWidth + gap : 300;
      track.scrollBy({ left: dir * amount, behavior: "smooth" });
    };

    prev.addEventListener("click", () => scrollByCard(-1));
    next.addEventListener("click", () => scrollByCard(1));
  }

  /* =========================================================
     7. BOTÃO VOLTAR AO TOPO
     ========================================================= */
  function initBackToTop() {
    const btn = $("#backToTop");
    if (!btn) return;

    window.addEventListener(
      "scroll",
      () => btn.classList.toggle("is-visible", window.scrollY > 600),
      { passive: true }
    );
    btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  /* =========================================================
     8. Ano automático no rodapé
     ========================================================= */
  function initYear() {
    const el = $("#year");
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ---------- Inicialização ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    initHeader();
    initHeroScroll();
    initReveal();
    initStationToggles();
    initLightbox();
    initTestimonials();
    initBackToTop();
    initYear();
  });
})();
