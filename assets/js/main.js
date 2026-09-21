/* ==========================================================================
   AEROVA - HOT AIR BALLOON RIDE & AERIAL TOUR COMPANY
   Main Script: Theme, RTL, Navbar, Interactions & Utilities
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initDirection();
  initNavbar();
  initBackToTop();
  initFilters();
  initFaqAccordion();
});

/* --------------------------------------------------------------------------
   1. Theme Management (Light / Dark Mode)
   -------------------------------------------------------------------------- */
function initTheme() {
  const savedTheme = localStorage.getItem('aerova_theme') || 'light';
  setTheme(savedTheme);

  const themeToggles = document.querySelectorAll('.js-theme-toggle');
  themeToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
    });
  });
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('aerova_theme', theme);
  
  const themeIcons = document.querySelectorAll('.js-theme-icon');
  themeIcons.forEach(icon => {
    if (theme === 'dark') {
      icon.classList.remove('bi-moon-stars-fill');
      icon.classList.add('bi-sun-fill');
    } else {
      icon.classList.remove('bi-sun-fill');
      icon.classList.add('bi-moon-stars-fill');
    }
  });
}

/* --------------------------------------------------------------------------
   2. Direction Management (LTR / RTL)
   -------------------------------------------------------------------------- */
function initDirection() {
  const savedDir = localStorage.getItem('aerova_dir') || 'ltr';
  setDirection(savedDir);

  const rtlToggles = document.querySelectorAll('.js-rtl-toggle');
  rtlToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
      const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
      setDirection(newDir);
    });
  });
}

function setDirection(dir) {
  document.documentElement.setAttribute('dir', dir);
  localStorage.setItem('aerova_dir', dir);
  
  const dirLabels = document.querySelectorAll('.js-rtl-label');
  dirLabels.forEach(label => {
    label.textContent = dir.toUpperCase();
  });
}

/* --------------------------------------------------------------------------
   3. Navbar & Sticky Scroll Behavior
   -------------------------------------------------------------------------- */
function initNavbar() {
  const header = document.querySelector('.aerova-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('shadow-sm');
    } else {
      header.classList.remove('shadow-sm');
    }
  });

  // Active page indicator setup
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.aerova-nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Highlight 'Home' dropdown when on Home 1 (index.html), Home 2 (home-2.html), or root
  const homeDropdown = document.getElementById('homeDropdown');
  if (homeDropdown) {
    if (currentPath === 'index.html' || currentPath === 'home-2.html' || currentPath === '') {
      homeDropdown.classList.add('active');
    } else {
      homeDropdown.classList.remove('active');
    }
  }

  // Highlight active item inside Home dropdown menu
  const homeDropdownItems = document.querySelectorAll('#homeDropdown + .dropdown-menu .dropdown-item');
  homeDropdownItems.forEach(item => {
    const href = item.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Mobile menu toggle, complete background scroll lock, close icon toggle, and auto-close
  const navbarCollapse = document.getElementById('aerovaNavbar');
  const navbarToggler = document.querySelector('.navbar-toggler');

  if (navbarCollapse && navbarToggler) {
    const handleTouchMove = (e) => {
      if (!navbarCollapse.contains(e.target)) {
        e.preventDefault();
      }
    };

    const openMenu = () => {
      navbarCollapse.classList.add('show');
      navbarToggler.classList.remove('collapsed');
      navbarToggler.setAttribute('aria-expanded', 'true');
      navbarToggler.classList.add('is-active');
      document.documentElement.classList.add('mobile-menu-open');
      document.body.classList.add('mobile-menu-open');
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
    };

    const closeMenu = () => {
      navbarCollapse.classList.remove('show');
      navbarToggler.classList.add('collapsed');
      navbarToggler.setAttribute('aria-expanded', 'false');
      navbarToggler.classList.remove('is-active');
      document.documentElement.classList.remove('mobile-menu-open');
      document.body.classList.remove('mobile-menu-open');
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      document.removeEventListener('touchmove', handleTouchMove);
    };

    navbarToggler.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (navbarCollapse.classList.contains('show')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close mobile menu on clicking any in-page link
    const inPageLinks = navbarCollapse.querySelectorAll('a[href^="#"]:not([href="#"])');
    inPageLinks.forEach(item => {
      item.addEventListener('click', () => {
        closeMenu();
      });
    });

    // Close on click outside header
    document.addEventListener('click', (e) => {
      if (navbarCollapse.classList.contains('show') && !header.contains(e.target)) {
        closeMenu();
      }
    });

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navbarCollapse.classList.contains('show')) {
        closeMenu();
      }
    });
  }
}

/* --------------------------------------------------------------------------
   4. Back-To-Top Button
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.querySelector('.js-back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* --------------------------------------------------------------------------
   5. Interactive Category Filters (Packages & Experiences)
   -------------------------------------------------------------------------- */
function initFilters() {
  const filterBtns = document.querySelectorAll('.js-filter-btn');
  const filterItems = document.querySelectorAll('.js-filter-item');

  if (!filterBtns.length || !filterItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active class on clicked button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      filterItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.style.display = 'block';
          item.style.opacity = '0';
          setTimeout(() => {
            item.style.opacity = '1';
          }, 50);
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   6. Fail-Safe FAQ Accordion Toggle & Single-Open Auto-Close
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const accordionButtons = document.querySelectorAll('.accordion-button');
  if (!accordionButtons.length) return;

  accordionButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const targetSelector = button.getAttribute('data-bs-target');
      if (!targetSelector) return;
      const targetCollapse = document.querySelector(targetSelector);
      if (!targetCollapse) return;

      const parentSelector = targetCollapse.getAttribute('data-bs-parent');
      const isCurrentlyOpen = targetCollapse.classList.contains('show');

      if (parentSelector) {
        const parentElement = document.querySelector(parentSelector);
        if (parentElement) {
          const openCollapses = parentElement.querySelectorAll('.accordion-collapse.show');
          openCollapses.forEach(coll => {
            coll.classList.remove('show');
            const btn = parentElement.querySelector(`[data-bs-target="#${coll.id}"]`);
            if (btn) {
              btn.classList.add('collapsed');
              btn.setAttribute('aria-expanded', 'false');
            }
          });
        }
      }

      if (!isCurrentlyOpen) {
        targetCollapse.classList.add('show');
        button.classList.remove('collapsed');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   7. Page Preloader Fade-Out Controller
   -------------------------------------------------------------------------- */
function initPreloader() {
  const preloader = document.getElementById('page-preloader');
  if (!preloader) return;

  const hidePreloader = () => {
    preloader.classList.add('fade-out');
    setTimeout(() => {
      preloader.remove();
    }, 600);
  };

  if (document.readyState === 'complete') {
    hidePreloader();
  } else {
    window.addEventListener('load', hidePreloader);
    setTimeout(hidePreloader, 2500);
  }
}

// Execute preloader immediately
initPreloader();
