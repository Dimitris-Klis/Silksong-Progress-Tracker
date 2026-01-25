// Select all nav links
const navLinks = document.querySelectorAll(".nav-right a");

// Separate in-page section links (#id) from page links (maps.html, etc.)
const sectionLinks = [...navLinks].filter(link =>
  link.getAttribute("href").startsWith("#")
);

// Map section links to actual sections
const sections = sectionLinks
  .map(link => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function updateActiveLink() {
  const offset = 80; // navbar height buffer
  const scrollPos = window.scrollY + offset;

  let currentSection = null;

  for (const section of sections) {
    if (section.offsetTop <= scrollPos) {
      currentSection = section;
    }
  }

  // Clear active state
  navLinks.forEach(link => link.classList.remove("active"));

  // Highlight active section link
  if (currentSection) {
    const activeLink = document.querySelector(
      `.nav-right a[href="#${currentSection.id}"]`
    );
    if (activeLink) activeLink.classList.add("active");
  }

  // Highlight active page link (maps.html, etc.)
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  navLinks.forEach(link => {
    const href = link.getAttribute("href");

    if (!href.startsWith("#") && href === currentPage) {
      link.classList.add("active");
    }
  });
}

// Run on scroll + load
window.addEventListener("scroll", updateActiveLink);
window.addEventListener("load", updateActiveLink);
