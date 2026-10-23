const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

if (window.lucide) lucide.createIcons();

// Mobile navigation
const menuToggle = $("#menuToggle");
const navLinks = $("#navLinks");

function closeMobileMenu() {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.innerHTML = '<i data-lucide="menu"></i>';
  if (window.lucide) lucide.createIcons();
}

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.innerHTML = isOpen
    ? '<i data-lucide="x"></i>'
    : '<i data-lucide="menu"></i>';
  if (window.lucide) lucide.createIcons();
});

$$('.nav-links a').forEach((link) => link.addEventListener("click", closeMobileMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMobileMenu();
});

// Toast is used only for the plan-selection demo below.
const toast = $("#toast");
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
}

// Primary CTA scrolls to the static workspace illustration.
$("#ctaButton").addEventListener("click", () => {
  $("#dashboard").scrollIntoView({ behavior: "smooth", block: "start" });
});

// Pricing links remain demo interactions; dashboard preview controls are decorative.
$$('.plan-button').forEach((button) => {
  button.addEventListener("click", () => {
    const plan = button.closest(".price-card").querySelector("h3").textContent;
    showToast(`${plan} plan selected — demo only.`);
  });
});
