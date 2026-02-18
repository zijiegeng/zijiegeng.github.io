/**
 * Interactive Background Animation
 * Subtle particle effect that follows mouse movement
 */

(function() {
  'use strict';

  // Check if we should enable the animation (disable on mobile)
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
  if (isTouchDevice) return;

  // Configuration
  const config = {
    particleCount: 25,
    connectionDistance: 150,
    mouseDistance: 200,
    speed: 0.5,
    particleSize: 3,
    colors: ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd'],
    opacity: 0.6
  };

  // Create canvas
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  // Set canvas styles
  canvas.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
    opacity: ${config.opacity};
  `;
  
  // Insert canvas before the main content
  document.body.insertBefore(canvas, document.body.firstChild);
  
  // Add a wrapper for content to sit above canvas
  const contentWrapper = document.createElement('div');
  contentWrapper.style.cssText = `
    position: relative;
    z-index: 1;
    background: transparent;
  `;
  
  // Move all body children into wrapper except canvas
  const children = Array.from(document.body.children);
  children.forEach(child => {
    if (child !== canvas) {
      contentWrapper.appendChild(child);
    }
  });
  document.body.appendChild(contentWrapper);

  // Set canvas size
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  // Mouse tracking
  const mouse = { x: null, y: null };
  
  document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }, { passive: true });
  
  document.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  }, { passive: true });

  // Particle class
  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * config.speed;
      this.vy = (Math.random() - 0.5) * config.speed;
      this.size = Math.random() * config.particleSize + 1;
      this.color = config.colors[Math.floor(Math.random() * config.colors.length)];
      this.originalX = this.x;
      this.originalY = this.y;
    }

    update() {
      // Mouse interaction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < config.mouseDistance) {
          const force = (config.mouseDistance - distance) / config.mouseDistance;
          const angle = Math.atan2(dy, dx);
          this.vx += Math.cos(angle) * force * 0.02;
          this.vy += Math.sin(angle) * force * 0.02;
        }
      }

      // Apply velocity with damping
      this.x += this.vx;
      this.y += this.vy;
      
      this.vx *= 0.99;
      this.vy *= 0.99;

      // Add slight random movement
      this.vx += (Math.random() - 0.5) * 0.01;
      this.vy += (Math.random() - 0.5) * 0.01;

      // Boundary check - wrap around
      if (this.x < 0) this.x = canvas.width;
      if (this.x > canvas.width) this.x = 0;
      if (this.y < 0) this.y = canvas.height;
      if (this.y > canvas.height) this.y = 0;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  // Create particles
  const particles = [];
  for (let i = 0; i < config.particleCount; i++) {
    particles.push(new Particle());
  }

  // Draw connections between particles
  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < config.connectionDistance) {
          const opacity = (1 - distance / config.connectionDistance) * 0.3;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(37, 99, 235, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
  }

  // Animation loop
  let animationId;
  let lastTime = 0;
  const targetFPS = 30;
  const frameInterval = 1000 / targetFPS;

  function animate(currentTime) {
    animationId = requestAnimationFrame(animate);

    const deltaTime = currentTime - lastTime;
    if (deltaTime < frameInterval) return;
    lastTime = currentTime - (deltaTime % frameInterval);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });

    drawConnections();
  }

  // Start animation
  animate(0);

  // Pause animation when tab is hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animationId);
    } else {
      animate(0);
    }
  });

  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    cancelAnimationFrame(animationId);
  });

})();
