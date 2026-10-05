const navLinks = document.querySelectorAll(".nav-links a");
const navSections = [...navLinks].map((link) =>
document.querySelector(link.getAttribute("href"))
);
function setActiveLink() {
const offset = 120; 
let currentIndex = 0;

navSections.forEach((section, index) => {
    if (window.scrollY >= section.offsetTop - offset) {
    currentIndex = index;
    }
});

navLinks.forEach((link, index) => {
    const isActive = index === currentIndex;
    link.classList.toggle("text-primary", isActive);
    link.classList.toggle("font-bold", isActive);
    link.classList.toggle("text-slate-600", !isActive);
    link.classList.toggle("dark:text-slate-300", !isActive);
});
}

window.addEventListener("scroll", setActiveLink);
setActiveLink(); 


const htmlElement = document.documentElement;
const themeToggleBtn = document.getElementById("theme-toggle-button");

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
htmlElement.classList.remove("dark");
}
updateThemeButton();


themeToggleBtn.addEventListener("click", () => {
htmlElement.classList.toggle("dark");

const isDark = htmlElement.classList.contains("dark");
localStorage.setItem("theme", isDark ? "dark" : "light");
updateThemeButton();
});

function updateThemeButton() {
const isDark = htmlElement.classList.contains("dark");
themeToggleBtn.setAttribute("aria-pressed", isDark);
}

const filterButtons = document.querySelectorAll(".portfolio-filter");
const portfolioItems = document.querySelectorAll(".portfolio-item");

const activeClasses = [
  "bg-linear-to-r", "from-primary", "to-secondary", "text-white",
];
const inactiveClasses = [
  "bg-white", "dark:bg-slate-800", "text-slate-600", "dark:text-slate-300",
  "border", "border-slate-300", "dark:border-slate-700",
];

filterButtons.forEach((button) => {
button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    
    filterButtons.forEach((btn) => {
    const isActive = btn === button;
    btn.classList.toggle("active", isActive);
    btn.setAttribute("aria-pressed", isActive);
    activeClasses.forEach((c) => btn.classList.toggle(c, isActive));
    inactiveClasses.forEach((c) => btn.classList.toggle(c, !isActive));
    });


    portfolioItems.forEach((item) => {
    const matches = filter === "all" || item.dataset.category === filter;
    item.classList.toggle("hidden", !matches);
    });
});
});


// ===== 4) Testimonials Carousel =====
const carousel = document.getElementById("testimonials-carousel");
const testimonialCards = document.querySelectorAll(".testimonial-card");
const nextBtn = document.getElementById("next-testimonial");
const prevBtn = document.getElementById("prev-testimonial");
const indicators = document.querySelectorAll(".carousel-indicator");

let currentIndex = 0;

function getVisibleCards() {
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 640) return 2;
  return 1;
}

function updateCarousel() {
  const maxIndex = testimonialCards.length - getVisibleCards();

 
  if (currentIndex > maxIndex) currentIndex = maxIndex;
  if (currentIndex < 0) currentIndex = 0;

  const cardWidth = testimonialCards[0].offsetWidth;
  carousel.style.transform = `translateX(${currentIndex * cardWidth}px)`;

  indicators.forEach((dot, index) => {
    const isActive = index === currentIndex;
    dot.classList.toggle("bg-accent", isActive);
    dot.classList.toggle("bg-slate-400", !isActive);
    dot.classList.toggle("dark:bg-slate-600", !isActive);
    dot.setAttribute("aria-selected", isActive);
  });
}

nextBtn.addEventListener("click", () => {
  const maxIndex = testimonialCards.length - getVisibleCards();
  currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1; // لو وصلنا للآخر نرجع للأول
  updateCarousel();
});

prevBtn.addEventListener("click", () => {
  const maxIndex = testimonialCards.length - getVisibleCards();
  currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1; 
  updateCarousel();
});

indicators.forEach((dot) => {
  dot.addEventListener("click", () => {
    currentIndex = Number(dot.dataset.index);
    updateCarousel();
  });
});


window.addEventListener("resize", updateCarousel);
updateCarousel();


const settingsToggle = document.getElementById("settings-toggle");
const settingsSidebar = document.getElementById("settings-sidebar");
const closeSettings = document.getElementById("close-settings");

function openSettings() {
  settingsSidebar.classList.remove("translate-x-full");
  settingsSidebar.setAttribute("aria-hidden", "false");
  settingsToggle.setAttribute("aria-expanded", "true");
}

function closeSettingsPanel() {
  settingsSidebar.classList.add("translate-x-full");
  settingsSidebar.setAttribute("aria-hidden", "true");
  settingsToggle.setAttribute("aria-expanded", "false");
}

settingsToggle.addEventListener("click", () => {
  const isClosed = settingsSidebar.classList.contains("translate-x-full");
  if (isClosed) {
    openSettings();
  } else {
    closeSettingsPanel();
  }
});

closeSettings.addEventListener("click", closeSettingsPanel);

const fontOptions = document.querySelectorAll(".font-option");
const allFonts = ["alexandria", "tajawal", "cairo"];

function applyFont(fontName) {

allFonts.forEach((font) => document.body.classList.remove(`font-${font}`));
document.body.classList.add(`font-${fontName}`);


fontOptions.forEach((option) => {
    const isActive = option.dataset.font === fontName;
    option.classList.toggle("active", isActive);
    option.setAttribute("aria-checked", isActive);
});


localStorage.setItem("font", fontName);
}

fontOptions.forEach((option) => {
option.addEventListener("click", () => {
    applyFont(option.dataset.font);
});
});


applyFont(localStorage.getItem("font") || "tajawal");


const colorsGrid = document.getElementById("theme-colors-grid");
const resetBtn = document.getElementById("reset-settings");


const themeColors = [
  { primary: "#6366f1", secondary: "#8b5cf6" }, 
  { primary: "#ec4899", secondary: "#f43f5e" },
  { primary: "#10b981", secondary: "#14b8a6" },
  { primary: "#f59e0b", secondary: "#f97316" },
  { primary: "#3b82f6", secondary: "#06b6d4" },
  { primary: "#ef4444", secondary: "#f97316" },
  { primary: "#8b5cf6", secondary: "#d946ef" },
  { primary: "#14b8a6", secondary: "#22c55e" },
];

function applyColor(color) {
const root = document.documentElement;
root.style.setProperty("--color-primary", color.primary);
root.style.setProperty("--color-secondary", color.secondary);
localStorage.setItem("themeColor", JSON.stringify(color));
}


// themeColors.forEach(function (color) {
// const dot = document.createElement("button");
// dot.type = "button";
// dot.setAttribute("aria-label", "لون " + color.primary);
// dot.className = "w-full aspect-square rounded-full border-2 border-transparent hover:scale-110 transition-transform";
// dot.style.background = "linear-gradient(135deg, " + color.primary + ", " + color.secondary + ")";

// dot.addEventListener("click", function () {
//     applyColor(color);
// });

// colorsGrid.appendChild(dot);
// });

themeColors.forEach(function (color) {
  const dot = document.createElement("button");
  dot.type = "button";
  dot.setAttribute("aria-label", "لون " + color.primary);

  dot.style.width = "100%";
  dot.style.aspectRatio = "1 / 1";
  dot.style.borderRadius = "50%";
  dot.style.border = "2px solid transparent";
  dot.style.cursor = "pointer";
  dot.style.background = "linear-gradient(135deg, " + color.primary + ", " + color.secondary + ")";

  dot.addEventListener("click", function () {
    applyColor(color);
  });

  colorsGrid.appendChild(dot);
});
const savedColor = localStorage.getItem("themeColor");
if (savedColor) {
applyColor(JSON.parse(savedColor));
}


resetBtn.addEventListener("click", function () {
localStorage.removeItem("themeColor");
localStorage.removeItem("font");
document.documentElement.style.removeProperty("--color-primary");
document.documentElement.style.removeProperty("--color-secondary");
applyFont("tajawal");
});

const scrollTopBtn = document.getElementById("scroll-to-top");

function toggleScrollTopBtn() {
if (window.scrollY > 400) {
    scrollTopBtn.style.opacity = "1";
    scrollTopBtn.style.visibility = "visible";
} else {
    scrollTopBtn.style.opacity = "0";
    scrollTopBtn.style.visibility = "hidden";
}
}

window.addEventListener("scroll", toggleScrollTopBtn);
toggleScrollTopBtn();

scrollTopBtn.addEventListener("click", function () {
window.scrollTo({ top: 0, behavior: "smooth" });
});