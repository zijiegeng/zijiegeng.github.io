// Modern interactive effects for the website

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', function() {
  // Create scroll progress indicator
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);

  // Update scroll progress
  window.addEventListener('scroll', function() {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
  });

  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href !== '') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // Fade-in animation on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observe all sections and content blocks
  document.querySelectorAll('.page__content > *').forEach(el => {
    el.classList.add('fade-in-up');
    observer.observe(el);
  });

  // Add parallax effect to hero section
  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
    window.addEventListener('scroll', function() {
      const scrolled = window.pageYOffset;
      const rate = scrolled * 0.5;
      heroSection.style.transform = 'translate3d(0, ' + rate + 'px, 0)';
    });
  }

  // Add hover effect to cards
  const cards = document.querySelectorAll('.archive__item, .sidebar');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function(e) {
      this.style.transform = 'translateY(-8px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function(e) {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Typing effect for hero title (optional)
  const heroTitle = document.querySelector('.hero-content h1');
  if (heroTitle && heroTitle.textContent.includes('Hello')) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.opacity = '1';

    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    };

    setTimeout(typeWriter, 500);
  }

  // Add ripple effect to buttons
  document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');

      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Navbar background on scroll
  const masthead = document.querySelector('.masthead');
  if (masthead) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 100) {
        masthead.style.background = 'rgba(255, 255, 255, 0.98)';
        masthead.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
      } else {
        masthead.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(249,250,251,0.95) 100%)';
        masthead.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
      }
    });
  }

  // Add loading animation
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
});

