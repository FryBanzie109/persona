// Journey page interactions
document.addEventListener('DOMContentLoaded', function() {
    // Navigation links - allow normal navigation for page links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Allow normal navigation for page links (not just anchors)
            if (!href.startsWith('#')) {
                return; // Let browser handle normal page navigation
            }
            
            // Only prevent default for internal anchor links
            e.preventDefault();
            const targetSection = document.querySelector(href);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    // Observe journey cards
    const journeyCards = document.querySelectorAll('.journey-card');
    journeyCards.forEach(card => {
        card.style.animationPlayState = 'paused';
        observer.observe(card);
    });

    // Timeline events animation
    const timelineEvents = document.querySelectorAll('.timeline-event');
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    timelineEvents.forEach(event => {
        timelineObserver.observe(event);
    });

    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Parallax effect for hero section
    const hero = document.querySelector('.journey-hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }
});

// Utility function for smooth scroll to top
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Add scroll to top button
window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollButton = document.querySelector('.scroll-to-top');
    
    if (!scrollButton) {
        const button = document.createElement('button');
        button.className = 'scroll-to-top';
        button.innerHTML = '<i class="fas fa-arrow-up"></i>';
        button.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #e74c3c;
            color: white;
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: 1000;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        `;
        
        button.addEventListener('click', scrollToTop);
        document.body.appendChild(button);
    }
    
    const existingButton = document.querySelector('.scroll-to-top');
    if (existingButton) {
        if (scrollTop > 300) {
            existingButton.style.opacity = '1';
        } else {
            existingButton.style.opacity = '0';
        }
    }
});
