(() => {
  document.documentElement.classList.add("js");

  const nav = document.getElementById("nav");
  const toggle = document.getElementById("nav-toggle");
  const links = document.getElementById("nav-links");

  // Nav: fundo ao rolar
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 24);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Nav: menu mobile
  const setMenu = (open) => {
    links.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  };
  toggle.addEventListener("click", () => setMenu(!links.classList.contains("is-open")));
  links.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

  // Filtro de projetos
  const chips = document.querySelectorAll(".chip");
  const cards = document.querySelectorAll("#projects .card");
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const filter = chip.dataset.filter;
      chips.forEach((c) => c.classList.toggle("is-active", c === chip));
      cards.forEach((card) => {
        card.classList.toggle("is-hidden", filter !== "all" && card.dataset.cat !== filter);
      });
    });
  });

  // Animação de entrada
  const items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    items.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 4) * 70}ms`;
      io.observe(el);
    });
  } else {
    items.forEach((el) => el.classList.add("is-visible"));
  }

  // Qualificações animadas no hero (digita, pausa, apaga, próxima)
  const typed = document.getElementById("typed");
  const roles = ["UX/UI Designer", "Web Designer", "Figma", "Prototipação de Interfaces", "Bacharelando em Sistemas de Informação"];
  if (typed && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    let role = 0, chars = 0, deleting = false;
    const tick = () => {
      const text = roles[role];
      chars += deleting ? -1 : 1;
      typed.textContent = text.slice(0, chars);
      let delay = deleting ? 35 : 70;
      if (!deleting && chars === text.length) { deleting = true; delay = 1600; }
      else if (deleting && chars === 0) { deleting = false; role = (role + 1) % roles.length; delay = 350; }
      setTimeout(tick, delay);
    };
    typed.textContent = "";
    setTimeout(tick, 600);
  }

  document.getElementById("year").textContent = new Date().getFullYear();
})();
