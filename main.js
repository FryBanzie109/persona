// Main JavaScript for all pages
document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-container')) {
            navMenu?.classList.remove('active');
        }
    });

    // Smooth scroll for navigation links
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
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe elements for fade-in animation
    const fadeElements = document.querySelectorAll('.gallery-item, .timeline-item, .contact-card, .highlight-item');
    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // Scroll to top functionality
    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Create scroll to top button
    function createScrollButton() {
        const button = document.createElement('button');
        button.className = 'scroll-to-top';
        button.innerHTML = '<i class="fas fa-arrow-up"></i>';
        button.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(135deg, #6366f1, #ec4899);
            color: white;
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            cursor: pointer;
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
        `;
        
        button.addEventListener('click', scrollToTop);
        
        // Add hover effect
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
        });
        
        document.body.appendChild(button);
        return button;
    }

    // Show/hide scroll button based on scroll position
    let scrollButton = null;
    
    function updateScrollButton() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (!scrollButton) {
            scrollButton = createScrollButton();
        }
        
        if (scrollTop > 300) {
            scrollButton.style.opacity = '1';
            scrollButton.style.pointerEvents = 'auto';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.pointerEvents = 'none';
        }
    }

    // Add scroll event listener
    window.addEventListener('scroll', updateScrollButton);

    // Initialize scroll button on load
    updateScrollButton();

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            const heroBg = document.querySelector('.hero-bg-image');
            if (heroBg) {
                heroBg.style.transform = `translateY(${rate}px)`;
            }
        });
    }

    // Form handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add form submission logic here
            alert('Thank you for your message! I\'ll get back to you soon.');
            this.reset();
        });
    }
});

// Utility functions
function scrollToSection(sectionId) {
    const section = document.querySelector(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Export for use in other files
window.scrollToTop = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};
