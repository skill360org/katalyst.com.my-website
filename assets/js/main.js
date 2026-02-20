document.addEventListener("DOMContentLoaded", () => {
  const hasGsap = typeof gsap !== "undefined";
  if (hasGsap && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  const normalizePath = (path) => {
    if (!path) return "/";
    const cleanPath = path.split("?")[0].split("#")[0];
    const withoutHtml = cleanPath.replace(/\.html$/, "");
    return withoutHtml.replace(/\/$/, "") || "/";
  };

  const pathName = normalizePath(window.location.pathname);
  const isActivePath = (href) => normalizePath(href) === pathName;

  document
    .querySelectorAll(".nav-link[href], .mobile-nav-link[href], .menu-link[href]")
    .forEach((link) => {
      link.classList.toggle("active", isActivePath(link.getAttribute("href")));
    });

  document
    .querySelectorAll(".nav-link:not([href]), .mobile-nav-link:not([href])")
    .forEach((toggle) => {
      toggle.classList.remove("active");
    });

  document.querySelectorAll("[id$='Dropdown']").forEach((dropdown) => {
    if (!dropdown.querySelector(".menu-link.active")) return;

    const toggleId = dropdown.id.replace(/Dropdown$/, "Toggle");
    const toggle = document.getElementById(toggleId);
    toggle?.classList.add("active");
  });

  const currentYear = new Date().getFullYear();
  document.querySelectorAll("[data-current-year]").forEach((yearNode) => {
    yearNode.textContent = currentYear;
  });

  // Mobile Menu Functionality ============================
  const nav = document.getElementById("mainNav");
  const menuToggle = document.getElementById("menuToggle");
  const closeBtn = document.getElementById("menuClose");
  const overlay = document.getElementById("menuOverlay");

  const mqLg = window.matchMedia("(min-width: 1024px)");

  if (nav && menuToggle && overlay) {
    const openMenu = () => {
      nav.classList.remove("translate-x-full");
      overlay.classList.remove("opacity-0", "invisible");
      document.body.classList.add("overflow-hidden");
    };

    const closeMenu = () => {
      nav.classList.add("translate-x-full");
      overlay.classList.add("opacity-0", "invisible");
      document.body.classList.remove("overflow-hidden");
    };

    menuToggle.addEventListener("click", openMenu);
    closeBtn?.addEventListener("click", closeMenu);
    overlay.addEventListener("click", closeMenu);

    const handleBreakpoint = (e) => {
      if (e.matches) {
        overlay.classList.add("opacity-0", "invisible");
        nav.classList.remove("translate-x-full");
        document.body.classList.remove("overflow-hidden");
      } else {
        nav.classList.add("translate-x-full");
      }
    };

    handleBreakpoint(mqLg);
    mqLg.addEventListener("change", handleBreakpoint);
  }

  document.querySelectorAll(".site-header").forEach((header) => {
    /* =========================
           DESKTOP DROPDOWN
        ========================= */
    const desktopToggle = header.querySelector("#productsToggle");
    const desktopDropdown = header.querySelector("#productsDropdown");
    const desktopArrow = header.querySelector("#productsArrow");

    function openDesktop() {
      desktopDropdown.classList.remove(
        "opacity-0",
        "invisible",
        "translate-y-2",
      );
      desktopDropdown.classList.add("opacity-100", "visible", "translate-y-0");
      desktopArrow.classList.add("rotate-180");
    }

    function closeDesktop() {
      desktopDropdown.classList.add("opacity-0", "invisible", "translate-y-2");
      desktopDropdown.classList.remove(
        "opacity-100",
        "visible",
        "translate-y-0",
      );
      desktopArrow.classList.remove("rotate-180");
    }

    if (desktopToggle && desktopDropdown && desktopArrow) {
      desktopToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        desktopDropdown.classList.contains("invisible")
          ? openDesktop()
          : closeDesktop();
      });

      document.addEventListener("click", (e) => {
        if (
          !desktopDropdown.contains(e.target) &&
          !desktopToggle.contains(e.target)
        ) {
          closeDesktop();
        }
      });
    }
  });

  document.querySelectorAll(".site-header").forEach((header) => {
    const toggle = header.querySelector("#mobileProductsToggle");
    const dropdown = header.querySelector("#mobileProductsDropdown");
    const arrow = header.querySelector("#mobileProductsArrow");

    if (!toggle || !dropdown || !arrow) return;

    toggle.addEventListener("click", () => {
      const isOpen = dropdown.classList.contains("max-h-[500px]");

      if (isOpen) {
        dropdown.classList.remove("max-h-[500px]");
        dropdown.classList.add("max-h-0");
        arrow.classList.remove("rotate-180");
      } else {
        dropdown.classList.remove("max-h-0");
        dropdown.classList.add("max-h-[500px]");
        arrow.classList.add("rotate-180");
      }
    });
  });

  function smoothScroll() {
    if (!hasGsap || typeof Lenis === "undefined") return;
    const lenis = new Lenis({
      smooth: true,
      lerp: 0.08,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }
  smoothScroll();
  if (
    hasGsap &&
    (document.querySelector("#heroHeading") ||
      document.querySelector("#heroDec") ||
      document.querySelector("#heroBtn"))
  ) {
    const heroTl = gsap.timeline();
    heroTl
      .from(
        "#heroHeading, #heroDec",
        {
          y: 50,
          opacity: 0,
          duration: 0.5,
          ease: "linear",
          stagger: 0.3,
        },
        "hero",
      )
      .from(
        "#heroBtn",
        {
          y: 50,
          scale: 0,
          opacity: 0,
          duration: 0.5,
        },
        "hero+=0.3",
      );
  }

  // element enter animation effect ========================
  if (hasGsap) {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      gsap.utils.toArray(".fade-in").forEach((el) => {
        gsap.from(el, {
          y: 50,
          opacity: 0,
          duration: 0.5,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    });
    mm.add("(max-width: 767px)", () => {
      gsap.utils.toArray(".fade-in").forEach((el) => {
        gsap.from(el, {
          y: 30,
          opacity: 0,
          duration: 0.4,
          scrollTrigger: {
            trigger: el,
            start: "top 95%",
            end: "top 90%",
            toggleActions: "play none none none",
          },
        });
      });
    });

    mm.add("(min-width: 768px)", () => {
      gsap.utils.toArray(".fade-li").forEach((el, index) => {
        gsap.from(el, {
          x: index % 2 === 0 ? -80 : 80, // LEFT / RIGHT
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        });
      });
    });

    mm.add("(max-width: 767px)", () => {
      gsap.utils.toArray(".fade-li").forEach((el) => {
        gsap.from(el, {
          y: 30,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 95%",
            toggleActions: "play none none none",
            once: true,
          },
        });
      });
    });
  }

  const cursor = document.getElementById("cursor");

  function attachCursorEffect(el, bg, scale = 1) {
    if (!hasGsap || !el || !cursor) return;

    el.addEventListener("mousemove", (e) => {
      gsap.to(cursor, {
        x: e.x,
        y: e.y,
        xPercent: -50,
        yPercent: -50,
        duration: 0.3,
        background: bg,
      });
    });

    el.addEventListener("mouseenter", () => {
      gsap.to(cursor, {
        scale,
        opacity: 1,
        duration: 0.3,
      });
    });

    el.addEventListener("mouseleave", () => {
      gsap.to(cursor, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
      });
    });
  }
  // Get the CSS variable value
  const color = getComputedStyle(document.documentElement)
    .getPropertyValue("--color-purple")
    .trim(); // trim to remove extra spaces
  // Sections ==================================
  attachCursorEffect(document.querySelector(".build"), color, 1);

  // Talent Cards Carousel Scroll Functionality ========================
  function setupTalentCarousel(leftId, rightId, containerId) {
    const leftBtn = document.getElementById(leftId);
    const rightBtn = document.getElementById(rightId);
    const container = document.getElementById(containerId);
    if (leftBtn && rightBtn && container) {
      function getScrollAmount() {
        // Find the first card in the container
        const card = container.querySelector('div[class*="bg-white"]');
        if (card) {
          // Use card's width + gap (if any)
          const style = window.getComputedStyle(card);
          const cardWidth = card.offsetWidth;
          // Try to get gap from parent flex
          let gap = 0;
          if (container.className.includes("gap-")) {
            // Try to extract gap from Tailwind class (e.g., gap-7.5)
            const match = container.className.match(/gap-\[?([\d.]+)(px)?\]?/);
            if (match) {
              gap = parseFloat(match[1]);
            } else {
              // fallback: try to get gap from computed style
              gap = parseFloat(style.marginRight) || 0;
            }
          }
          return cardWidth + gap;
        }
        // fallback to default
        return 437;
      }
      leftBtn.addEventListener("click", () => {
        leftBtn.classList.add("border", "border-purple");
        rightBtn.classList.remove("border", "border-purple");
        container.scrollBy({
          left: -getScrollAmount(),
          behavior: "smooth",
        });
      });
      rightBtn.addEventListener("click", () => {
        rightBtn.classList.add("border", "border-purple");
        leftBtn.classList.remove("border", "border-purple");
        container.scrollBy({
          left: getScrollAmount(),
          behavior: "smooth",
        });
      });
    }
  }

  // Setup for Talent Acquisition
  setupTalentCarousel(
    "talentScrollLeft",
    "talentScrollRight",
    "talentCardsContainer",
  );
  // Setup for Talent Development
  setupTalentCarousel(
    "talentDevScrollLeft",
    "talentDevScrollRight",
    "talentDevCardsContainer",
  );

  // Setup for Second Talent Cards Carousel (lower section)
  setupTalentCarousel(
    "talentScrollLeft2",
    "talentScrollRight2",
    "talentCardsContainer2",
  );

  // --------------- custome Selecter----------

  document.querySelectorAll(".custom-select").forEach((wrapper) => {
    const select = wrapper.querySelector("select");

    // Create trigger
    const trigger = document.createElement("div");
    trigger.className = "select-trigger";
    trigger.innerHTML = `
    <span class="select-text">
      ${select.options[select.selectedIndex]?.text || "Select"}
    </span>
    <span class="select-arrow">
      <svg width="8" height="5" viewBox="0 0 8 5" fill="none" class="text-purple"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M3.43942 4.14645L0.146522 0.853553C-0.16846 0.538571 
        0.0546231 0 0.500075 0H7.08586C7.53131 0 
        7.7544 0.53857 7.43942 0.853552L4.14652 4.14645
        C3.95126 4.34171 3.63468 4.34171 3.43942 4.14645Z"
        fill="currentColor"/>
      </svg>
    </span>
  `;

    // Create dropdown
    const dropdown = document.createElement("ul");
    dropdown.className = "select-dropdown";

    [...select.options].forEach((option) => {
      if (!option.value) return;

      const li = document.createElement("li");
      li.textContent = option.text;
      li.dataset.value = option.value;

      // mark active on load
      if (option.value === select.value) {
        li.classList.add("active");
      }

      li.addEventListener("click", () => {
        select.value = option.value;
        trigger.querySelector(".select-text").textContent = option.text;

        // update active item
        dropdown
          .querySelectorAll("li")
          .forEach((i) => i.classList.remove("active"));
        li.classList.add("active");

        wrapper.classList.remove("open");
        document.body.classList.remove("dropdown-open");
      });

      dropdown.appendChild(li);
    });

    wrapper.appendChild(trigger);
    wrapper.appendChild(dropdown);

    // Toggle dropdown
    trigger.addEventListener("click", (e) => {
      e.stopPropagation();

      const isOpen = wrapper.classList.toggle("open");
      document.body.classList.toggle("dropdown-open", isOpen);
    });

    dropdown.addEventListener("click", (e) => e.stopPropagation());
    dropdown.addEventListener("wheel", (e) => e.stopPropagation());

    // Close on outside click
    document.addEventListener("click", (e) => {
      if (!wrapper.contains(e.target)) {
        wrapper.classList.remove("open");
        document.body.classList.remove("dropdown-open");
      }
    });
  });

  // ---------------- initStepScroll-----------------

  const steps = document.querySelectorAll(".step");
  const sections = document.querySelectorAll(".section-card");
  const headerOffset = 150;

  // CLICK → SCROLL ONLY
  steps.forEach((step) => {
    step.addEventListener("click", () => {
      const targetId = step.getAttribute("data-target");
      const targetEl = document.getElementById(targetId);

      const y =
        targetEl.getBoundingClientRect().top +
        window.pageYOffset -
        headerOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    });
  });

  // SCROLL → ACTIVE STEP (single authority)
  function updateActiveStep() {
    let current = sections[0].id; // default first

    sections.forEach((section) => {
      const sectionTop =
        section.getBoundingClientRect().top +
        window.pageYOffset -
        headerOffset -
        5;

      if (window.pageYOffset >= sectionTop) {
        current = section.id;
      }
    });

    steps.forEach((step) => {
      step.classList.toggle(
        "active",
        step.getAttribute("data-target") === current,
      );
    });
  }

  window.addEventListener("scroll", updateActiveStep, { passive: true });

  // ✅ set correct active on page load
  window.addEventListener("load", updateActiveStep);
});
