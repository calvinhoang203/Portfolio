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
document.addEventListener('DOMContentLoaded', () => {
    // Apply saved theme immediately on page load
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
});

// Simplified theme switch without transitions
const themeSwitch = document.querySelector('.theme-switch');
themeSwitch.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update icon without transition
    const themeIcon = document.getElementById('theme-icon');
    themeIcon.src = `assets/icons/${newTheme === 'light' ? 'moon' : 'sun'}.svg`;
});

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
