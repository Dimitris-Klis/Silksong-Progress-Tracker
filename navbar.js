const navLinks = document.querySelectorAll(".nav-right a");
  const sections = [...navLinks]
    .map(link => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  function updateActiveLink() {
    const offset = 80; // navbar height buffer
    const scrollPos = window.scrollY + offset;

    let current = null;

    for (const section of sections) {
      if (section.offsetTop <= scrollPos) {
        current = section;
      }
    }

    navLinks.forEach(link => link.classList.remove("active"));

    if (current) {
      const activeLink = document.querySelector(
        `.nav-right a[href="#${current.id}"]`
      );
      if (activeLink) activeLink.classList.add("active");
    }
  }

  window.addEventListener("scroll", updateActiveLink);
  window.addEventListener("load", updateActiveLink);