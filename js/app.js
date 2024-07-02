/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */

const sections = document.querySelectorAll("section");
const navList = document.getElementById("navbar__list");
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

// Helper function to check if a section is in the viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// Build the nav
function buildNav() {
  sections.forEach((section) => {
    const navItem = document.createElement("li");
    const navLink = document.createElement("a");
    navLink.href = `#${section.id}`;
    navLink.className = "menu__link";
    navLink.textContent = section.getAttribute("data-nav");
    navItem.appendChild(navLink);
    navList.appendChild(navItem);
  });
}

// Add class 'active' to section when near top of viewport
function setActiveSection() {
  sections.forEach((section) => {
    const navLinks = document.querySelectorAll(".menu__link");
    if (isInViewport(section)) {
      section.classList.add("your-active-class");
      navLinks.forEach((navLink) => {
        if (navLink.textContent === section.getAttribute("data-nav")) {
          navLink.classList.add("active");
        } else {
          navLink.classList.remove("active");
        }
      });
    } else {
      section.classList.remove("your-active-class");
    }
  });
}

// Scroll to anchor ID using scrollTO event
function scrollToSection(event) {
  event.preventDefault();
  if (event.target.nodeName === "A") {
    const sectionId = event.target.getAttribute("href").substring(1);
    document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
  }
}

// Show or hide the scroll to top button
function toggleScrollToTopBtn() {
  if (window.scrollY > 100) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
}

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
buildNav();

// Scroll to section on link click
navList.addEventListener("click", scrollToSection);

// Set sections as active
window.addEventListener("scroll", () => {
  setActiveSection();
  toggleScrollToTopBtn();
});

// Scroll to top on button click
scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});