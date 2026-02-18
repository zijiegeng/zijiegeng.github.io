/**
 * Scroll Animations — lightweight fade-in for below-the-fold content.
 * Elements already in the viewport on load are shown immediately.
 */
(function() {
  'use strict';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  function init() {
    var selectors = '.archive__item, .section-card, .timeline-card, .award-item';
    var elements = document.querySelectorAll(selectors);

    if (!elements.length) return;

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -30px 0px' });

    elements.forEach(function(el) {
      if (el.getBoundingClientRect().top < window.innerHeight) {
        el.classList.add('visible');
      } else {
        el.classList.add('fade-in-up');
        observer.observe(el);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
