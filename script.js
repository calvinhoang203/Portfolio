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
});

// Enhanced skill visualization with animations
const skillLevels = {
    'Data Science': 'Advanced',
    'Machine Learning': 'Intermediate',
    'Python': 'Advanced',
    // ... rest of the skills if needed
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
