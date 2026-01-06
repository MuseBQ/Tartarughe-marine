// Advanced Animations and Effects
class Animations {
    constructor() {
        this.observers = [];
        this.isReducedMotion = this.checkReducedMotion();
        this.init();
    }
    
    init() {
        this.initScrollAnimations();
        this.initParallax();
        this.initFloatingElements();
        this.initTextEffects();
        this.initProgressBars();
        this.initCounters();
        this.initHoverEffects();
        this.initPageTransitions();
        this.initCursorEffects();
    }
    
    // Check for reduced motion preference
    checkReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    
    // Initialize scroll animations
    initScrollAnimations() {
        if (this.isReducedMotion) return;
        
        const animationOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, animationOptions);
        
        // Observe elements with animation attributes
        document.querySelectorAll('[data-aos]').forEach(el => {
            observer.observe(el);
            this.setupElementAnimation(el);
        });
    }
    
    // Setup individual element animation
    setupElementAnimation(element) {
        const animationType = element.getAttribute('data-aos');
        const delay = element.getAttribute('data-aos-delay') || 0;
        const duration = element.getAttribute('data-aos-duration') || 800;
        
        element.style.transition = `all ${duration}ms ease ${delay}ms`;
        element.style.opacity = '0';
        
        switch(animationType) {
            case 'fade-up':
                element.style.transform = 'translateY(30px)';
                break;
            case 'fade-down':
                element.style.transform = 'translateY(-30px)';
                break;
            case 'fade-left':
                element.style.transform = 'translateX(30px)';
                break;
            case 'fade-right':
                element.style.transform = 'translateX(-30px)';
                break;
            case 'zoom-in':
                element.style.transform = 'scale(0.9)';
                break;
            case 'zoom-out':
                element.style.transform = 'scale(1.1)';
                break;
            case 'flip':
                element.style.transform = 'perspective(1000px) rotateY(90deg)';
                break;
        }
    }
    
    // Animate element when in view
    animateElement(element) {
        if (this.isReducedMotion) {
            element.style.opacity = '1';
            element.style.transform = 'none';
            return;
        }
        
        element.style.opacity = '1';
        element.style.transform = 'none';
        element.setAttribute('data-aos-animated', 'true');
        
        // Add class for CSS animations
        element.classList.add('aos-animate');
    }
    
    // Parallax effect
    initParallax() {
        if (this.isReducedMotion) return;
        
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(el => {
                const speed = parseFloat(el.getAttribute('data-parallax-speed')) || 0.5;
                const yPos = -(scrolled * speed);
                
                el.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
    
    // Floating elements animation
    initFloatingElements() {
        if (this.isReducedMotion) return;
        
        const floatElements = document.querySelectorAll('.float-element');
        
        floatElements.forEach((el, index) => {
            const duration = 3 + (index % 3); // 3-6 seconds
            const delay = index * 0.5;
            
            el.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
        });
    }
    
    // Text typing and revealing effects
    initTextEffects() {
        const textRevealElements = document.querySelectorAll('.text-reveal');
        
        textRevealElements.forEach(el => {
            const text = el.textContent;
            el.innerHTML = '';
            
            text.split('').forEach((char, i) => {
                const span = document.createElement('span');
                span.textContent = char === ' ' ? '\u00A0' : char;
                span.style.animationDelay = `${i * 0.05}s`;
                span.classList.add('char');
                el.appendChild(span);
            });
        });
    }
    
    // Progress bars animation
    initProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar');
        
        if (!progressBars.length) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.getAttribute('data-progress');
                    
                    setTimeout(() => {
                        bar.style.width = width + '%';
                    }, 300);
                    
                    observer.unobserve(bar);
                }
            });
        }, { threshold: 0.5 });
        
        progressBars.forEach(bar => observer.observe(bar));
    }
    
    // Animated counters
    initCounters() {
        const counters = document.querySelectorAll('.counter');
        
        if (!counters.length) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => observer.observe(counter));
    }
    
    animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = parseInt(counter.getAttribute('data-duration')) || 2000;
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };
        
        requestAnimationFrame(updateCounter);
    }
    
    // Hover effects
    initHoverEffects() {
        // Card hover effects
        const cards = document.querySelectorAll('.card, .article-card, .stat-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                if (this.isReducedMotion) return;
                
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        });
        
        // Button ripple effect
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                if (this.isReducedMotion) return;
                
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.7);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                `;
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }
    
    // Page transition effects
    initPageTransitions() {
        // Add transition class to all links
        document.querySelectorAll('a').forEach(link => {
            if (link.href && link.href.includes(window.location.origin)) {
                link.addEventListener('click', (e) => {
                    if (link.target === '_blank' || link.hasAttribute('download')) return;
                    
                    e.preventDefault();
                    const href = link.href;
                    
                    // Add fade out effect
                    document.body.classList.add('page-transition-out');
                    
                    setTimeout(() => {
                        window.location.href = href;
                    }, 300);
                });
            }
        });
    }
    
    // Custom cursor effects (optional)
    initCursorEffects() {
        if (this.isReducedMotion || window.innerWidth < 768) return;
        
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);
        
        const cursorDot = document.createElement('div');
        cursorDot.className = 'cursor-dot';
        document.body.appendChild(cursorDot);
        
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;
        let dotX = 0;
        let dotY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        const animate = () => {
            // Smooth cursor movement
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            
            // Smooth dot movement
            dotX += (mouseX - dotX) * 0.2;
            dotY += (mouseY - dotY) * 0.2;
            
            cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
            cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`;
            
            requestAnimationFrame(animate);
        };
        
        animate();
        
        // Interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .btn, [role="button"]');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
                cursorDot.classList.add('hover');
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
                cursorDot.classList.remove('hover');
            });
        });
    }
}

// Initialize animations
const animations = new Animations();

// Export for use in other modules
window.animations = animations;

// Add CSS for animations
document.head.insertAdjacentHTML('beforeend', `
    <style>
        /* AOS Animations */
        [data-aos] {
            transition-property: opacity, transform;
            transition-timing-function: ease;
        }
        
        .aos-animate {
            opacity: 1 !important;
            transform: none !important;
        }
        
        /* Floating Animation */
        @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(1deg); }
        }
        
        .float-element {
            animation: float 6s ease-in-out infinite;
        }
        
        /* Text Reveal */
        .text-reveal .char {
            display: inline-block;
            opacity: 0;
            transform: translateY(20px);
            animation: textReveal 0.5s forwards;
        }
        
        @keyframes textReveal {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        /* Ripple Effect */
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        /* Progress Bars */
        .progress-bar {
            transition: width 1.5s ease-in-out;
            width: 0;
        }
        
        /* Page Transitions */
        .page-transition-out {
            animation: fadeOut 0.3s forwards;
        }
        
        @keyframes fadeOut {
            to { opacity: 0; }
        }
        
        /* Custom Cursor */
        .custom-cursor {
            position: fixed;
            width: 20px;
            height: 20px;
            border: 2px solid var(--accent-teal);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: width 0.3s, height 0.3s, background 0.3s;
            mix-blend-mode: difference;
        }
        
        .cursor-dot {
            position: fixed;
            width: 6px;
            height: 6px;
            background: var(--accent-teal);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: transform 0.1s;
            mix-blend-mode: difference;
        }
        
        .custom-cursor.hover {
            width: 40px;
            height: 40px;
            background: rgba(0, 180, 216, 0.1);
        }
        
        .cursor-dot.hover {
            transform: translate(-50%, -50%) scale(1.5);
        }
        
        /* Card Hover Effects */
        .card, .article-card, .stat-card {
            position: relative;
            overflow: hidden;
        }
        
        .card::before, .article-card::before, .stat-card::before {
            content: '';
            position: absolute;
            top: var(--mouse-y);
            left: var(--mouse-x);
            width: 100px;
            height: 100px;
            background: radial-gradient(circle, rgba(0, 180, 216, 0.1) 0%, transparent 70%);
            transform: translate(-50%, -50%);
            opacity: 0;
            transition: opacity 0.3s;
            pointer-events: none;
        }
        
        .card:hover::before, .article-card:hover::before, .stat-card:hover::before {
            opacity: 1;
        }
        
        /* Reduced Motion */
        @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                scroll-behavior: auto !important;
            }
        }
    </style>
`);