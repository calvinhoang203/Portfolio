// Smooth scrolling with improved easing
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
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

// Fade in content on load
document.addEventListener('DOMContentLoaded', () => {
    const content = document.querySelectorAll('.fade-in');
    content.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100 * index);
    });
});

// Improved theme switcher with smooth transitions
const themeSwitch = document.querySelector('.theme-switch');
const themeIcon = document.getElementById('theme-icon');
const root = document.documentElement;

// Theme text content with fade transitions
const themeContent = {
    light: {
        aboutTitle: 'About Me',
        skillsTitle: 'Skills & Expertise',
        greeting: '👋 Hi! I\'m Hieu, but you can call me Calvin.',
        description: '🏫 Throughout my studies at UC Davis, I\'ve developed a strong foundation in data science and machine learning.',
        passion: '🚩 I\'m passionate about leveraging data to drive real-world solutions.'
    },
    dark: {
        aboutTitle: 'About Me',
        skillsTitle: 'Skills & Expertise',
        greeting: '🌙 Hi! I\'m Hieu (Calvin)',
        description: '💻 Data Science enthusiast with a strong foundation in machine learning.',
        passion: '📊 Passionate about data-driven solutions and innovation.'
    }
};

// Initialize theme with fade effect
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyThemeWithTransition(savedTheme);
});

// Smooth theme toggle
themeSwitch.addEventListener('click', () => {
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyThemeWithTransition(newTheme);
});

// Apply theme with smooth transitions
function applyThemeWithTransition(theme) {
    // Fade out
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        applyTheme(theme);
        // Fade in
        document.body.style.opacity = '1';
    }, 300);
}

// Update theme icon with spring animation
function updateThemeIcon(theme) {
    themeIcon.style.transform = 'rotate(180deg)';
    themeIcon.style.opacity = '0';
    
    setTimeout(() => {
        themeIcon.src = `assets/icons/${theme === 'light' ? 'moon' : 'sun'}.svg`;
        themeIcon.style.transform = 'rotate(0deg)';
        themeIcon.style.opacity = '1';
    }, 150);
}

// Update content with staggered fade
function updateContent(theme) {
    const content = themeContent[theme];
    const elements = [
        { el: document.querySelector('#about h2'), text: content.aboutTitle },
        { el: document.querySelector('#skills h2'), text: content.skillsTitle },
        ...document.querySelectorAll('#about p').entries()
    ];

    elements.forEach((item, index) => {
        setTimeout(() => {
            item.el.style.opacity = '0';
            setTimeout(() => {
                item.el.textContent = content[Object.keys(content)[index]];
                item.el.style.opacity = '1';
            }, 200);
        }, index * 100);
    });
}

// Enhanced skill visualization with animations
const skillLevels = {
    'Data Science': 'Advanced',
    'Machine Learning': 'Intermediate',
    'Python': 'Advanced',
    // ... rest of the skills
};

// Apply animated skill visualization
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
