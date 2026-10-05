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