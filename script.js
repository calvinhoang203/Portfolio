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

  // Draw a sample bar chart on the Amazon Sales Analysis project canvas
  const amazonChart = document.getElementById('amazonChart');
  if (amazonChart) {
    const ctx = amazonChart.getContext('2d');
    const data = [40, 60, 80, 50, 70]; // sample data values
    const barWidth = 40;
    const gap = 20;
    data.forEach((value, index) => {
      const x = index * (barWidth + gap);
      const barHeight = value;
      ctx.fillStyle = '#2563eb';
      ctx.fillRect(x, amazonChart.height - barHeight, barWidth, barHeight);
    });
  }

  // Additional code for enhanced skill visualization (if needed)
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

    setTimeout(() => {
      skill.innerHTML = `
        <div class="skill-name">${skillName}</div>
        <div class="skill-level">${level}</div>
        <div class="skill-bar">
            <div class="skill-progress" style="width: 0%"></div>
        </div>
      `;
      // Animate progress bar
      requestAnimationFrame(() => {
        skill.querySelector('.skill-progress').style.width = levelPercentage;
      });
    }, index * 100);
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
