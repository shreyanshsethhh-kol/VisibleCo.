const body = document.body;
const nav = document.getElementById("topNav");
const menuToggle = document.getElementById("menuToggle");
const menuClose = document.getElementById("menuClose");
const mobileMenu = document.getElementById("mobileMenu");
const floatingWhatsapp = document.getElementById("floatingWhatsapp");
const revealItems = document.querySelectorAll(".reveal");
const faqItems = document.querySelectorAll(".faq-item");

window.addEventListener("load", () => {
  body.classList.add("loaded");
});

const onScroll = () => {
  nav.classList.toggle("scrolled", window.scrollY > 16);
  floatingWhatsapp.classList.toggle("visible", window.scrollY > 500);
};

window.addEventListener("scroll", onScroll);
onScroll();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = `${index * 0.1}s`;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${index * 0.1}s`;
  observer.observe(item);
});

const closeMenu = () => {
  mobileMenu.classList.remove("open");
  body.style.overflow = "";
};

menuToggle.addEventListener("click", () => {
  mobileMenu.classList.add("open");
  body.style.overflow = "hidden";
});

menuClose.addEventListener("click", closeMenu);

mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

mobileMenu.addEventListener("click", (event) => {
  if (event.target === mobileMenu) {
    closeMenu();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

faqItems.forEach((item) => {
  item.addEventListener("toggle", () => {
    if (item.open) {
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.open = false;
        }
      });
    }
  });
});
