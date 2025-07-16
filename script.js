// Smooth scrolling with improved easing
document.addEventListener('DOMContentLoaded', () => {
  // Move smooth scrolling setup here to ensure it runs once when DOM is ready
  const setupSmoothScrolling = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Update URL hash without triggering scroll
          window.history.pushState(null, '', targetId);
        }
      });
    });
  };

  // Initial setup
  setupSmoothScrolling();

  // For mobile menu functionality - re-apply event listeners after menu items are clicked
  const hamburger = document.querySelector('.hamburger-menu');
  const navMenu = document.querySelector('.nav-menu');
  const navItems = navMenu.querySelectorAll('li');
  const body = document.body;
  
  // Add index for staggered animations
  navItems.forEach((item, index) => {
      item.style.setProperty('--i', index);
  });
  
  // Toggle menu
  const toggleMenu = () => {
      const isOpen = hamburger.classList.contains('active');
      
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      
      // Toggle body scroll
      body.style.overflow = isOpen ? '' : 'hidden';
      
      // Animate menu items
      if (!isOpen) {
          navItems.forEach((item, index) => {
              setTimeout(() => {
                  item.style.opacity = '1';
                  item.style.transform = 'translateY(0)';
              }, 100 + index * 50);
          });
      } else {
          navItems.forEach(item => {
              item.style.opacity = '0';
              item.style.transform = 'translateY(20px)';
          });
      }
  };
  
  // Toggle menu when hamburger is clicked
  hamburger.addEventListener('click', toggleMenu);
  
  // Close menu when nav links are clicked
  navItems.forEach(item => {
      const link = item.querySelector('a');
      link.addEventListener('click', () => {
          if (navMenu.classList.contains('active')) {
              toggleMenu();
          }
      });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
      const isClickInside = navMenu.contains(e.target) || hamburger.contains(e.target);
      
      if (!isClickInside && navMenu.classList.contains('active')) {
          toggleMenu();
      }
  });
  
  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
          toggleMenu();
      }
  });
  
  // Prevent menu from staying open on window resize
  let resizeTimer;
  window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
          if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
              toggleMenu();
          }
      }, 250);
  });

  // Enhanced hover effect for skills with spring animation
  document.querySelectorAll('.skill').forEach(skill => {
    skill.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.03)';
      this.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
      this.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
      this.style.cursor = 'pointer';
    });
    skill.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
      this.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
      this.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
    });
  });

  // Fade in content on scroll using Intersection Observer
  const faders = document.querySelectorAll('.fade-in');
  const appearOptions = { threshold: 0.1 };
  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, appearOptions);
  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });

  // Back to top button
  const backToTop = document.createElement('button');
  backToTop.classList.add('back-to-top');
  backToTop.setAttribute('aria-label', 'Scroll to top');
  backToTop.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M18 15l-6-6-6 6"/>
    </svg>
  `;
  document.body.appendChild(backToTop);

  // Show/hide back to top button
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  // Smooth scroll to top
  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Project expandable details
  document.querySelectorAll('.project').forEach(project => {
    const content = project.querySelector('.project-content');
    const description = project.querySelector('.project-description');
    
    // Remove the expandable details functionality
    // No need to add toggle buttons or detail containers
    // The "View Details" links are already in the HTML
  });

  // Timeline animation
  const animateTimeline = () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Unobserve after animation
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    });

    timelineItems.forEach(item => {
      observer.observe(item);
    });
  };

  // Initialize timeline animation
  animateTimeline();
   
  // Enhanced project card interactions
  // Project card interactions
  document.querySelectorAll('.project').forEach(project => {
      const content = project.querySelector('.project-content');
      const skills = project.querySelectorAll('.project-skills span');
      
      // Staggered animation for skill tags
      project.addEventListener('mouseenter', () => {
          skills.forEach((skill, index) => {
              skill.style.transitionDelay = `${index * 50}ms`;
              skill.classList.add('hover');
          });
          content.classList.add('hover');
      });

      project.addEventListener('mouseleave', () => {
          skills.forEach(skill => {
              skill.style.transitionDelay = '0ms';
              skill.classList.remove('hover');
          });
          content.classList.remove('hover');
      });

      // Keyboard navigation
      project.addEventListener('focusin', () => {
          content.classList.add('hover');
          skills.forEach((skill, index) => {
              skill.style.transitionDelay = `${index * 50}ms`;
              skill.classList.add('hover');
          });
      });

      project.addEventListener('focusout', () => {
          content.classList.remove('hover');
          skills.forEach(skill => {
              skill.style.transitionDelay = '0ms';
              skill.classList.remove('hover');
          });
      });
  });

  // Smooth reveal animation for sections
  const revealSection = (entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              observer.unobserve(entry.target);
          }
      });
  };

  const sectionObserver = new IntersectionObserver(revealSection, {
      root: null,
      threshold: 0.15
  });

  document.querySelectorAll('section').forEach(section => {
      section.classList.add('reveal-section');
      sectionObserver.observe(section);
  });

  // Scroll progress indicator
  const progressBar = document.createElement('div');
  progressBar.classList.add('scroll-progress');
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (window.scrollY / windowHeight) * 100;
      progressBar.style.width = `${scrolled}%`;
  });
   
  // Contact form handling
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
      // Add input animation
      const formInputs = contactForm.querySelectorAll('input, textarea');
      formInputs.forEach(input => {
          // Add focus effect
          input.addEventListener('focus', () => {
              input.parentElement.classList.add('focused');
          });
          
          input.addEventListener('blur', () => {
              if (!input.value) {
                  input.parentElement.classList.remove('focused');
              }
          });
          
          // Add filled class if input has value
          if (input.value) {
              input.parentElement.classList.add('filled');
          }
          
          input.addEventListener('input', () => {
              if (input.value) {
                  input.parentElement.classList.add('filled');
              } else {
                  input.parentElement.classList.remove('filled');
              }
          });
      });
      
      // Form submission handling
      contactForm.addEventListener('submit', async (e) => {
          e.preventDefault();
          
          const submitBtn = contactForm.querySelector('.submit-btn');
          const originalBtnText = submitBtn.innerHTML;
          
          // Disable all form inputs
          formInputs.forEach(input => input.disabled = true);
          
          // Show loading state
          submitBtn.innerHTML = `
              <span>Sending...</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="loading-icon">
                  <line x1="12" y1="2" x2="12" y2="6"></line>
                  <line x1="12" y1="18" x2="12" y2="22"></line>
                  <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                  <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                  <line x1="2" y1="12" x2="6" y2="12"></line>
                  <line x1="18" y1="12" x2="22" y2="12"></line>
                  <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                  <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
              </svg>
          `;
          submitBtn.disabled = true;
          
          try {
              const response = await fetch(contactForm.action, {
                  method: 'POST',
                  body: new FormData(contactForm),
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                      name: contactForm.querySelector('#name').value,
                      email: contactForm.querySelector('#email').value,
                      message: contactForm.querySelector('#message').value
                  })
              });
              
              const responseData = await response.json();
              
              if (response.ok) {
                  // Show success message
                  const successMsg = document.createElement('div');
                  successMsg.className = 'form-success';
                  successMsg.innerHTML = `
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                      <span>Message sent successfully!</span>
                  `;
                  
                  contactForm.insertAdjacentElement('afterend', successMsg);
                  successMsg.style.display = 'flex';
                  
                  // Reset form and classes
                  contactForm.reset();
                  formInputs.forEach(input => {
                      input.parentElement.classList.remove('filled', 'focused');
                  });
                  
                  // Remove success message after 5 seconds
                  setTimeout(() => {
                      successMsg.style.opacity = '0';
                      setTimeout(() => successMsg.remove(), 300);
                  }, 5000);
              } else {
                  throw new Error(responseData.error || 'Failed to send message');
              }
          } catch (error) {
              console.error('Error:', error);
              // Show detailed error message
              const errorMsg = document.createElement('div');
              errorMsg.className = 'form-error';
              errorMsg.innerHTML = `
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  <span>${error.message || 'Failed to send message. Please try again later.'}</span>
              `;
              
              contactForm.insertAdjacentElement('afterend', errorMsg);
              errorMsg.style.display = 'flex';
              
              // Remove error message after 5 seconds
              setTimeout(() => {
                  errorMsg.style.opacity = '0';
                  setTimeout(() => errorMsg.remove(), 300);
              }, 5000);
          } finally {
              // Re-enable form inputs
              formInputs.forEach(input => input.disabled = false);
              
              // Restore button state
              submitBtn.innerHTML = originalBtnText;
              submitBtn.disabled = false;
          }
      });
  }
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Add loading and message animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
    .loading-icon {
        animation: spin 1s linear infinite;
    }
    .form-success,
    .form-error {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        transition: opacity 0.3s ease;
    }
    .form-success svg {
        stroke: white;
    }
    .form-error {
        background: #EF4444;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        margin-top: 1rem;
        text-align: center;
        animation: slideIn 0.3s ease forwards;
    }
    .form-error svg {
        stroke: white;
    }
    .focused label {
        color: var(--accent-color);
    }
`;
document.head.appendChild(style);
