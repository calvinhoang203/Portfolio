// Smooth scrolling with improved easing
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
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
document.addEventListener('DOMContentLoaded', () => {
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

  // Enhanced skill visualization with improved animations
  const skillLevels = {
    'Data Science': 'Advanced',
    'Machine Learning': 'Intermediate',
    'Python': 'Advanced',
    'SQL': 'Beginner',
    'Pandas': 'Advanced',
    'NumPy': 'Intermediate',
    'Scikit-Learn': 'Intermediate',
    'Streamlit': 'Intermediate',
    'Tableau': 'Beginner',
    'Power BI': 'Beginner',
    'Excel': 'Advanced',
    'REST APIs': 'Intermediate',
    'Swift': 'Intermediate',
    'Firebase': 'Intermediate'
  };

  document.querySelectorAll('.skill').forEach((skill, index) => {
    const skillName = skill.textContent;
    const level = skillLevels[skillName];
    const levelPercentage = {
      'Beginner': '33%',
      'Intermediate': '66%',
      'Advanced': '100%'
    }[level];

    // Set data attribute for styling
    skill.setAttribute('data-level', level);

    // Create skill content with improved structure
    setTimeout(() => {
      skill.innerHTML = `
        <div class="skill-name">${skillName}</div>
        <div class="skill-level">${level}</div>
        <div class="skill-bar">
            <div class="skill-progress" style="width: 0%"></div>
        </div>
      `;

      // Animate progress bar with slight delay for visual appeal
      requestAnimationFrame(() => {
        setTimeout(() => {
          skill.querySelector('.skill-progress').style.width = levelPercentage;
        }, 100);
      });
    }, index * 100);

    // Add hover interaction
    skill.addEventListener('mouseenter', () => {
      skill.style.transform = 'translateY(-5px)';
      skill.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });

    skill.addEventListener('mouseleave', () => {
      skill.style.transform = 'translateY(0)';
      skill.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
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
    const expandBtn = document.createElement('button');
    expandBtn.classList.add('expand-project');
    expandBtn.innerHTML = `
      <span>View Details</span>
      <svg class="expand-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    `;
    
    // Create details container
    const detailsContainer = document.createElement('div');
    detailsContainer.classList.add('project-details');
    detailsContainer.innerHTML = `
      <div class="details-content">
        <h4>Key Features</h4>
        <ul>
          ${project.dataset.features ? 
            project.dataset.features.split('|').map(feature => `<li>${feature}</li>`).join('') :
            '<li>Feature details coming soon...</li>'}
        </ul>
        <h4>Technologies Used</h4>
        <div class="tech-stack">
          ${project.querySelector('.project-skills').innerHTML}
        </div>
        <h4>Impact</h4>
        <p>${project.dataset.impact || 'Impact details coming soon...'}</p>
        ${project.dataset.demoUrl ? `
          <div class="project-links">
            <a href="${project.dataset.demoUrl}" target="_blank" class="demo-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
              View Demo
            </a>
          </div>
        ` : ''}
      </div>
    `;

    content.appendChild(expandBtn);
    content.appendChild(detailsContainer);

    expandBtn.addEventListener('click', (e) => {
      e.preventDefault();
      content.classList.toggle('expanded');
      expandBtn.classList.toggle('expanded');
      
      if (content.classList.contains('expanded')) {
        detailsContainer.style.maxHeight = detailsContainer.scrollHeight + 'px';
        expandBtn.querySelector('span').textContent = 'Close Details';
      } else {
        detailsContainer.style.maxHeight = '0';
        expandBtn.querySelector('span').textContent = 'View Details';
      }
    });
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

  // Re-run animation when switching themes
  document.addEventListener('themeChanged', () => {
    // Small delay to ensure DOM updates are complete
    setTimeout(animateTimeline, 100);
  });
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

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    // Toggle menu when hamburger is clicked
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when nav links are clicked
    document.querySelectorAll('.nav-menu a').forEach(navLink => {
        navLink.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});

// Dark mode toggle functionality with smooth transitions
document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.classList.add('dark-mode-toggle');
    darkModeToggle.setAttribute('aria-label', 'Toggle dark mode');
    darkModeToggle.innerHTML = `
        <svg class="sun-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
        <svg class="moon-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
    `;
    document.querySelector('.navbar-container').appendChild(darkModeToggle);

    // Function to update theme with transition
    const updateTheme = (isDark) => {
        // Add transition class to body
        document.body.classList.add('theme-transition');
        
        // Update theme
        if (isDark) {
            document.body.setAttribute('data-theme', 'dark');
            darkModeToggle.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.removeAttribute('data-theme');
            darkModeToggle.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }

        // Remove transition class after animation completes
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 300);

        // Dispatch theme change event for other components
        document.dispatchEvent(new CustomEvent('themeChanged', {
            detail: { isDark }
        }));
    };

    // Initialize theme based on system preference or stored preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const storedTheme = localStorage.getItem('theme');
    const shouldUseDark = storedTheme === 'dark' || (!storedTheme && prefersDarkScheme.matches);

    // Set initial theme without transition
    if (shouldUseDark) {
        document.body.setAttribute('data-theme', 'dark');
        darkModeToggle.classList.add('dark');
    }

    // Toggle theme with transition
    darkModeToggle.addEventListener('click', () => {
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        updateTheme(!isDark);
    });

    // Listen for system theme changes
    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            updateTheme(e.matches);
        }
    });

    // Enhanced project card interactions
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
        threshold: 0.15,
    });

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('reveal-section');
        sectionObserver.observe(section);
    });

    // Enhanced mobile navigation
    const mobileNav = document.querySelector('.nav-menu');
    const navLinks = mobileNav.querySelectorAll('a');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            document.querySelector('.hamburger-menu').classList.remove('active');
        });
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
});
