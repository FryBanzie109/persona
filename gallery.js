// Gallery functionality
document.addEventListener('DOMContentLoaded', function() {
    // Navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Filter functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                    item.classList.add('fade-in');
                } else {
                    item.classList.add('hidden');
                    item.classList.remove('fade-in');
                }
            });
        });
    });

    // Smooth scroll for navigation links - only for internal anchors
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

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-container')) {
            navMenu?.classList.remove('active');
        }
    });

    // Add loading animation to images
    const images = document.querySelectorAll('.gallery-item img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.parentElement.classList.add('loaded');
        });
    });

    // Intersection Observer for fade-in animation
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

    galleryItems.forEach(item => {
        observer.observe(item);
    });

    // Scroll to top functionality - same as journey pages
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
});

// Lightbox functionality (optional enhancement)
function openLightbox(imgSrc, title, description) {
    // Create lightbox overlay
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close">&times;</button>
            <img src="${imgSrc}" alt="${title}">
            <div class="lightbox-info">
                <h3>${title}</h3>
                <p>${description}</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    
    // Close lightbox
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
            document.body.removeChild(lightbox);
        }
    });
}

// Add click handlers for gallery items
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const overlay = this.querySelector('.item-overlay');
            const title = overlay.querySelector('h3').textContent;
            const description = overlay.querySelector('p').textContent;
            
            // Uncomment the line below to enable lightbox
            // openLightbox(img.src, title, description);
            
        });
    });
});