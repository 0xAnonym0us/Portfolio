// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations and interactions
    initNavigation();
    initScrollAnimations();
    initSkillBars();
    initCounters();
    initContactForm();
    initPageLoadAnimations();
    initParallaxEffects();
    
    // Initialize additional effects
    setTimeout(() => {
        initProjectCardEffects();
        initSkillBarColors();
        initMouseFollowEffect();
        initRippleEffect();
    }, 100);
});

// Navigation functionality - FIXED
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    // Ensure elements exist before adding event listeners
    if (!hamburger || !mobileMenu) {
        console.error('Navigation elements not found');
        return;
    }

    // Toggle mobile menu - FIXED
    hamburger.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('Hamburger clicked'); // Debug log
        
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        
        // Toggle body scroll
        if (mobileMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });

    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            
            console.log('Nav link clicked:', targetId); // Debug log
            
            // Close mobile menu
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            // Scroll to section
            scrollToSection(targetId);
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(e.target) && 
            !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(15, 15, 35, 0.98)';
            navbar.style.backdropFilter = 'blur(30px)';
        } else {
            navbar.style.background = 'rgba(15, 15, 35, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
        }
    });
}

// Smooth scroll to sections
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Scroll-triggered animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Trigger specific animations based on section
                if (entry.target.classList.contains('skills')) {
                    setTimeout(() => animateSkillBars(), 300);
                }
                if (entry.target.classList.contains('about')) {
                    setTimeout(() => animateCounters(), 300);
                }
                if (entry.target.classList.contains('projects')) {
                    setTimeout(() => animateProjectCards(), 300);
                }
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Add CSS for animation classes
    const style = document.createElement('style');
    style.textContent = `
        section {
            opacity: 0;
            transform: translateY(50px);
            transition: all 0.8s ease-out;
        }
        
        section.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .skill-item {
            transform: translateY(50px);
            opacity: 0;
            transition: all 0.6s ease-out;
        }
        
        .skills.animate-in .skill-item {
            transform: translateY(0);
            opacity: 1;
        }
        
        .skills.animate-in .skill-item:nth-child(1) { transition-delay: 0.1s; }
        .skills.animate-in .skill-item:nth-child(2) { transition-delay: 0.2s; }
        .skills.animate-in .skill-item:nth-child(3) { transition-delay: 0.3s; }
        .skills.animate-in .skill-item:nth-child(4) { transition-delay: 0.4s; }
        .skills.animate-in .skill-item:nth-child(5) { transition-delay: 0.5s; }
        .skills.animate-in .skill-item:nth-child(6) { transition-delay: 0.6s; }
        .skills.animate-in .skill-item:nth-child(7) { transition-delay: 0.7s; }
        
        .project-card {
            transform: translateY(50px) rotateX(-10deg);
            opacity: 0;
            transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .projects.animate-in .project-card {
            transform: translateY(0) rotateX(0deg);
            opacity: 1;
        }
        
        .projects.animate-in .project-card:nth-child(1) { transition-delay: 0.1s; }
        .projects.animate-in .project-card:nth-child(2) { transition-delay: 0.3s; }
        .projects.animate-in .project-card:nth-child(3) { transition-delay: 0.5s; }
    `;
    document.head.appendChild(style);
}

// Skill bars animation
function initSkillBars() {
    // This will be triggered by scroll animation
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.getAttribute('data-width');
            if (width) {
                bar.style.width = width;
            }
        }, index * 200);
    });
}

// Counter animation
function initCounters() {
    // This will be triggered by scroll animation
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        if (target) {
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target + '+';
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current);
                }
            }, 16);
        }
    });
}

// Project cards animation
function animateProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.transform = 'translateY(0) rotateX(0deg)';
            card.style.opacity = '1';
        }, index * 200);
    });
}

// Contact form handling - FIXED
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) {
        console.error('Contact form not found');
        return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    
    if (!submitBtn || !btnText || !btnLoader) {
        console.error('Contact form elements not found');
        return;
    }
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        console.log('Form submitted'); // Debug log
        
        // Show loading state
        btnText.style.opacity = '0';
        btnLoader.classList.remove('hidden');
        submitBtn.disabled = true;
        
        // Simulate form submission with proper async handling
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success state
            btnLoader.classList.add('hidden');
            btnText.textContent = 'Message Sent!';
            btnText.style.opacity = '1';
            submitBtn.style.background = 'linear-gradient(45deg, #10b981, #06b6d4)';
            
            // Reset form and button after delay
            setTimeout(() => {
                form.reset();
                btnText.textContent = 'Send Message';
                submitBtn.style.background = 'linear-gradient(45deg, #8b5cf6, #ec4899)';
                submitBtn.disabled = false;
                
                // Reset floating labels
                const labels = form.querySelectorAll('.floating-label');
                labels.forEach(label => {
                    label.style.top = '1rem';
                    label.style.fontSize = '1rem';
                    label.style.color = '#a1a1aa';
                    label.style.background = 'transparent';
                    label.style.padding = '0';
                });
            }, 3000);
            
        } catch (error) {
            console.error('Form submission error:', error);
            // Reset button on error
            btnLoader.classList.add('hidden');
            btnText.style.opacity = '1';
            submitBtn.disabled = false;
        }
    });
    
    // Enhanced floating label animation
    const formControls = document.querySelectorAll('.form-control');
    formControls.forEach(control => {
        control.addEventListener('focus', function() {
            const label = this.nextElementSibling;
            if (label && label.classList.contains('floating-label')) {
                label.style.top = '-0.5rem';
                label.style.left = '0.5rem';
                label.style.fontSize = '0.8rem';
                label.style.color = '#8b5cf6';
                label.style.background = '#0f0f23';
                label.style.padding = '0 0.5rem';
            }
        });
        
        control.addEventListener('blur', function() {
            if (this.value === '') {
                const label = this.nextElementSibling;
                if (label && label.classList.contains('floating-label')) {
                    label.style.top = '1rem';
                    label.style.left = '1rem';
                    label.style.fontSize = '1rem';
                    label.style.color = '#a1a1aa';
                    label.style.background = 'transparent';
                    label.style.padding = '0';
                }
            }
        });
        
        // Check if field has value on page load
        if (control.value !== '') {
            const label = control.nextElementSibling;
            if (label && label.classList.contains('floating-label')) {
                label.style.top = '-0.5rem';
                label.style.left = '0.5rem';
                label.style.fontSize = '0.8rem';
                label.style.color = '#8b5cf6';
                label.style.background = '#0f0f23';
                label.style.padding = '0 0.5rem';
            }
        }
    });
}

// Page load animations
function initPageLoadAnimations() {
    // Hero section animation sequence
    const heroElements = {
        title: document.querySelector('.hero-title'),
        description: document.querySelector('.hero-description'),
        buttons: document.querySelector('.hero-buttons'),
        shapes: document.querySelectorAll('.floating-shape')
    };
    
    // Start floating shapes animation
    heroElements.shapes.forEach((shape, index) => {
        shape.style.animationDelay = `${index * 0.5}s`;
    });
    
    // Typewriter effect for hero title
    if (heroElements.title) {
        const titleLines = heroElements.title.querySelectorAll('span');
        titleLines.forEach((line, index) => {
            if (index === 1) { // The name
                typeWriter(line, 'John Doe', 100);
            }
        });
    }
}

// Typewriter effect
function typeWriter(element, text, speed) {
    const originalText = element.textContent;
    element.textContent = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    setTimeout(type, 1000); // Start after 1 second
}

// Parallax effects
function initParallaxEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-shape');
        
        parallaxElements.forEach((element, index) => {
            const speed = (index + 1) * 0.05; // Reduced speed for better performance
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.05}deg)`;
        });
    });
}

// Add dynamic color changing for project cards
function initProjectCardEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const color = card.getAttribute('data-color');
        
        card.addEventListener('mouseenter', function() {
            if (color) {
                this.style.boxShadow = `0 30px 60px ${color}40`;
                this.style.borderColor = color;
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 30px 60px rgba(139, 92, 246, 0.3)';
            this.style.borderColor = 'rgba(139, 92, 246, 0.2)';
        });
    });
}

// Add dynamic skill bar colors
function initSkillBarColors() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        const color = item.getAttribute('data-color');
        const progressBar = item.querySelector('.skill-progress');
        
        if (color && progressBar) {
            progressBar.style.background = `linear-gradient(45deg, ${color}, #ec4899)`;
        }
    });
}

// Add mouse follow effect for hero section
function initMouseFollowEffect() {
    const hero = document.querySelector('.hero');
    const shapes = document.querySelectorAll('.floating-shape');
    
    if (hero && shapes.length > 0) {
        hero.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            shapes.forEach((shape, index) => {
                const speed = (index + 1) * 5; // Reduced speed
                const x = (mouseX - 0.5) * speed;
                const y = (mouseY - 0.5) * speed;
                
                shape.style.transform += ` translate(${x}px, ${y}px)`;
            });
        });
    }
}

// Add click ripple effects to buttons
function initRippleEffect() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Don't add ripple to form submit buttons during loading
            if (this.disabled) return;
            
            let ripple = document.createElement('span');
            let rect = this.getBoundingClientRect();
            let size = Math.max(rect.width, rect.height);
            let x = e.clientX - rect.left - size / 2;
            let y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.remove();
                }
            }, 600);
        });
    });
    
    // Add ripple CSS
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            pointer-events: none;
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
}

// Global scroll to section function (used by buttons)
window.scrollToSection = scrollToSection;

// Add performance optimization for animations
function optimizeAnimations() {
    // Reduce animations on low-end devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) {
        document.documentElement.style.setProperty('--duration-normal', '150ms');
        document.documentElement.style.setProperty('--duration-fast', '100ms');
    }
    
    // Pause animations when tab is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Pause CSS animations
            document.body.style.animationPlayState = 'paused';
        } else {
            // Resume CSS animations
            document.body.style.animationPlayState = 'running';
        }
    });
}

// Initialize performance optimizations
optimizeAnimations();

// Debug function to check if all elements are loaded
function debugCheck() {
    console.log('=== Debug Check ===');
    console.log('Hamburger:', document.getElementById('hamburger'));
    console.log('Mobile Menu:', document.getElementById('mobileMenu'));
    console.log('Contact Form:', document.getElementById('contactForm'));
    console.log('Skill Items:', document.querySelectorAll('.skill-item').length);
    console.log('Project Cards:', document.querySelectorAll('.project-card').length);
}

// Run debug check after everything loads
setTimeout(debugCheck, 1000);