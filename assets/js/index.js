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