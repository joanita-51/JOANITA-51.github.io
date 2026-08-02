/**
 * main.js — Joanita Nakityo Portfolio
 *
 * Responsibilities:
 *  1. Dynamic copyright year
 *  2. Navbar scroll state
 *  3. Mobile nav toggle (hamburger)
 *  4. Smooth active-link highlighting
 *  5. Entrance animations (respects prefers-reduced-motion)
 *
 * No jQuery. No Owl Carousel. No external dependencies.
 */

(function () {
  'use strict';

  /* ──────────────────────────────────────────────────────────
     1. Copyright year
  ────────────────────────────────────────────────────────── */
  const yearEl = document.getElementById('copyright-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }


  /* ──────────────────────────────────────────────────────────
     2. Navbar scroll state
  ────────────────────────────────────────────────────────── */
  const navBar = document.querySelector('.nav-bar');

  function updateNavScroll() {
    if (!navBar) return;
    if (window.scrollY > 60) {
      navBar.classList.add('scrolled');
    } else {
      navBar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateNavScroll, { passive: true });
  updateNavScroll(); // run once on load


  /* ──────────────────────────────────────────────────────────
     3. Mobile nav toggle
  ────────────────────────────────────────────────────────── */
  const navToggle = document.getElementById('nav-toggle');
  const navMenu   = document.getElementById('nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute(
        'aria-label',
        isOpen ? 'Close navigation menu' : 'Open navigation menu'
      );
    });

    // Close menu when a nav link is clicked (single-page scroll)
    navMenu.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open navigation menu');
      });
    });

    // Close on click outside
    document.addEventListener('click', function (e) {
      if (!navBar.contains(e.target)) {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open navigation menu');
      }
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open navigation menu');
        navToggle.focus();
      }
    });
  }


  /* ──────────────────────────────────────────────────────────
     4. Active nav link via IntersectionObserver
  ────────────────────────────────────────────────────────── */
  const sections = document.querySelectorAll('main [id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if ('IntersectionObserver' in window && sections.length && navLinks.length) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            navLinks.forEach(function (link) {
              link.classList.remove('active');
              link.removeAttribute('aria-current');
            });
            const activeLink = document.querySelector(
              '.nav-link[href="#' + entry.target.id + '"]'
            );
            if (activeLink) {
              activeLink.classList.add('active');
              activeLink.setAttribute('aria-current', 'page');
            }
          }
        });
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
      }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }


  /* ──────────────────────────────────────────────────────────
     5. Entrance animations
     Cards and timeline items fade + slide in when scrolled
     into view. Skipped entirely if the user prefers reduced
     motion.
  ────────────────────────────────────────────────────────── */
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const animTargets = document.querySelectorAll(
      '.project-card, .timeline-item, .credential-item, .contact-link, .education-item'
    );

    // Set initial state via inline style (avoids flash if CSS loads late)
    animTargets.forEach(function (el, i) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(18px)';
      el.style.transition =
        'opacity 0.45s ease ' + (i % 4) * 60 + 'ms, ' +
        'transform 0.45s ease ' + (i % 4) * 60 + 'ms';
    });

    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    animTargets.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

})();
