/* ===================================
   MODERN JAVASCRIPT FOR MOMENTS APP
   =================================== */

(function () {
  'use strict';

  // ============================================
  // FORM VALIDATION
  // ============================================
  const forms = document.querySelectorAll('.needs-validation');

  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });

  // ============================================
  // LIGHTBOX FUNCTIONALITY
  // ============================================
  function initLightbox() {
    // Create lightbox element if it doesn't exist
    let lightbox = document.getElementById('lightbox');

    if (!lightbox) {
      lightbox = document.createElement('div');
      lightbox.id = 'lightbox';
      lightbox.className = 'lightbox';
      lightbox.innerHTML = `
        <div class="lightbox-content">
          <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
          <img class="lightbox-image" src="" alt="Lightbox image">
        </div>
      `;
      document.body.appendChild(lightbox);
    }

    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const closeBtn = lightbox.querySelector('.lightbox-close');

    // Open lightbox on detail page image click
    const detailImages = document.querySelectorAll('.detail-image');
    detailImages.forEach(img => {
      img.addEventListener('click', () => {
        lightboxImage.src = img.src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    // Close lightbox
    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = 'auto';
    };

    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

  // ============================================
  // LAZY LOADING IMAGES
  // ============================================
  function initLazyLoading() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.getAttribute('data-src');

          if (src) {
            img.src = src;
            img.removeAttribute('data-src');
            img.classList.add('loaded');
          }

          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px'
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
  }

  // ============================================
  // SCROLL ANIMATIONS
  // ============================================
  function initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-on-scroll');
    animatedElements.forEach(el => scrollObserver.observe(el));
  }

  // ============================================
  // SMOOTH SCROLL TO TOP
  // ============================================
  function initScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '↑';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    scrollBtn.style.cssText = `
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: linear-gradient(135deg, #6366f1, #ec4899);
      color: white;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
      z-index: 999;
    `;

    document.body.appendChild(scrollBtn);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollBtn.style.opacity = '1';
        scrollBtn.style.visibility = 'visible';
      } else {
        scrollBtn.style.opacity = '0';
        scrollBtn.style.visibility = 'hidden';
      }
    });

    scrollBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    scrollBtn.addEventListener('mouseenter', () => {
      scrollBtn.style.transform = 'translateY(-5px)';
    });

    scrollBtn.addEventListener('mouseleave', () => {
      scrollBtn.style.transform = 'translateY(0)';
    });
  }

  // ============================================
  // IMAGE LOADING ANIMATION
  // ============================================
  function initImageLoadAnimation() {
    const images = document.querySelectorAll('.gallery-image, .detail-image');

    images.forEach(img => {
      if (!img.complete) {
        img.style.opacity = '0';

        img.addEventListener('load', () => {
          img.style.transition = 'opacity 0.5s ease';
          img.style.opacity = '1';
        });
      }
    });
  }

  // ============================================
  // NAVBAR SCROLL EFFECT
  // ============================================
  function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;

      if (currentScroll > 100) {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
      } else {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
      }

      lastScroll = currentScroll;
    });
  }

  // ============================================
  // GALLERY CARD TILT EFFECT (Optional)
  // ============================================
  function initCardTilt() {
    const cards = document.querySelectorAll('.gallery-card');

    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
      });
    });
  }

  // ============================================
  // INITIALIZE ALL FEATURES
  // ============================================
  function init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        initLightbox();
        initLazyLoading();
        initScrollAnimations();
        initScrollToTop();
        initImageLoadAnimation();
        initNavbarScroll();
        // Uncomment for subtle tilt effect (optional, might be too much)
        // initCardTilt();
      });
    } else {
      initLightbox();
      initLazyLoading();
      initScrollAnimations();
      initScrollToTop();
      initImageLoadAnimation();
      initNavbarScroll();
      // initCardTilt();
    }
  }

  // Start the application
  init();

})();