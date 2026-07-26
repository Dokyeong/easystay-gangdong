(() => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", nav.classList.contains("is-open"));
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => nav.classList.remove("is-open"));
    });
  }

  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  const heroSlider = document.querySelector("[data-hero-slider]");
  if (heroSlider) {
    const slides = [...heroSlider.querySelectorAll("img")];
    if (slides.length > 1) {
      let index = slides.findIndex((img) => img.classList.contains("is-active"));
      if (index < 0) {
        index = 0;
        slides[0].classList.add("is-active");
      }
      setInterval(() => {
        slides[index].classList.remove("is-active");
        index = (index + 1) % slides.length;
        slides[index].classList.add("is-active");
      }, 4500);
    }
  }

  const filters = document.querySelectorAll("[data-filter]");
  const items = document.querySelectorAll("[data-type]");
  const empty = document.getElementById("galleryEmpty");
  const emptyTypes = empty
    ? (empty.getAttribute("data-empty-for") || "").split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  const updateEmpty = (type) => {
    if (!empty) return;
    empty.classList.toggle("is-visible", emptyTypes.includes(type));
  };

  const applyFilter = (type) => {
    items.forEach((item) => {
      item.classList.toggle("is-hidden", item.getAttribute("data-type") !== type);
    });
    updateEmpty(type);
  };

  if (filters.length && items.length) {
    filters.forEach((btn) => {
      btn.addEventListener("click", () => {
        const type = btn.getAttribute("data-filter");
        filters.forEach((b) => b.classList.toggle("is-active", b === btn));
        applyFilter(type);
      });
    });

    const active = document.querySelector("[data-filter].is-active") || filters[0];
    if (active) {
      filters.forEach((b) => b.classList.toggle("is-active", b === active));
      applyFilter(active.getAttribute("data-filter"));
    }
  }
})();
