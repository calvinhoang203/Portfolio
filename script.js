// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Hover effect for skills
document.querySelectorAll('.skill').forEach(skill => {
    skill.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    skill.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Theme switcher
const themeSwitch = document.querySelector('.theme-switch');
const themeIcon = document.getElementById('theme-icon');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeSwitch.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeIcon.src = `assets/icons/${theme === 'light' ? 'moon' : 'sun'}.svg`;
}

// Add skill levels
const skillLevels = {
    'Data Science': 'Advanced',
    'Machine Learning': 'Intermediate',
    'Python': 'Advanced',
    'SQL': 'Advanced',
    'Pandas': 'Advanced',
    'NumPy': 'Advanced',
    'Scikit-Learn': 'Intermediate',
    'Streamlit': 'Intermediate',
    'Tableau': 'Advanced',
    'Power BI': 'Intermediate',
    'Excel/Sheets': 'Advanced',
    'REST APIs': 'Intermediate',
    'Swift': 'Beginner',
    'Firebase': 'Intermediate',
    'Back-End Development': 'Intermediate',
    'IT Support': 'Advanced',
    'Application Troubleshooting': 'Advanced'
};

document.querySelectorAll('.skill').forEach(skill => {
    const skillName = skill.textContent;
    const level = skillLevels[skillName];
    const levelPercentage = {
        'Beginner': '33%',
        'Intermediate': '66%',
        'Advanced': '100%'
    }[level];
    
    skill.innerHTML += `
        <div class="skill-level">${level}</div>
        <div class="skill-bar" style="width: ${levelPercentage}"></div>
    `;
});
