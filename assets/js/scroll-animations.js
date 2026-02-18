/**
 * Scroll Animations
 * Add fade-in animations when elements come into view
 */

(function() {
  'use strict';

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  // Add animation classes to elements
  function initScrollAnimations() {
    // Select elements to animate
    const selectors = [
      '.archive__item',
      '.page__content h1, .page__content h2, .page__content h3',
      '.page__content p',
      '.page__content ul, .page__content ol',
      '.author__avatar',
      '.author__content'
    ];

    selectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((el, index) => {
        el.classList.add('fade-in-up');
        el.style.transitionDelay = `${index * 0.05}s`;
      });
    });
  }

  // Intersection Observer for scroll animations
  function observeElements() {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Optionally unobserve after animation
          // observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-up');
    animatedElements.forEach(el => observer.observe(el));
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initScrollAnimations();
      // Small delay to ensure elements are properly styled
      setTimeout(observeElements, 100);
    });
  } else {
    initScrollAnimations();
    setTimeout(observeElements, 100);
  }

  // Re-initialize on dynamic content changes
  let debounceTimer;
  const observer = new MutationObserver(() => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const newElements = document.querySelectorAll('.fade-in-up:not(.visible)');
      if (newElements.length > 0) {
        observeElements();
      }
    }, 250);
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

})();
