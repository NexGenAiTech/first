// animations.js - Simplified Version for NexGenAiTech
// Optimized for performance and compatibility

document.addEventListener('DOMContentLoaded', function() {
    console.log('%c🎬 Animations Initialized', 'color: #0066cc; font-weight: bold;');
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        document.body.classList.add('reduced-motion');
        console.log('🚫 Reduced motion mode enabled');
        return; // Stop animations if user prefers reduced motion
    }
    
    // Initialize all animations
    initPreloader();
    initScrollAnimations();
    initCounterAnimations();
    initHoverEffects();
    initFAQAccordion();
    initServiceTabs();
    initBackToTop();
    initQuickContact();
});

// ===== PRELOADER =====
function initPreloader() {
    const preloader = document.getElementById('preloader');
    
    if (!preloader) return;
    
    // Remove preloader after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 500);
        }, 1500);
    });
    
    // Fallback: Remove preloader after 3 seconds
    setTimeout(() => {
        if (preloader.style.display !== 'none') {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 500);
        }
    }, 3000);
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if (!animatedElements.length) return;
    
    // Create Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const delay = element.dataset.delay || 0;
                
                // Add animation with delay
                setTimeout(() => {
                    element.classList.add('animated');
                    triggerElementAnimation(element);
                }, delay * 1000);
                
                // Stop observing after animation
                observer.unobserve(element);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all elements
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Animate elements on page load (for above-the-fold content)
    animatedElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
            const delay = element.dataset.delay || 0;
            setTimeout(() => {
                element.classList.add('animated');
                triggerElementAnimation(element);
                observer.unobserve(element);
            }, delay * 1000);
        }
    });
}

function triggerElementAnimation(element) {
    // Get animation type from data attribute
    const animationType = element.dataset.animation;
    
    switch(animationType) {
        case 'fade-up':
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            break;
            
        case 'fade-left':
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
            break;
            
        case 'fade-right':
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
            break;
            
        case 'scale':
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';
            break;
            
        default:
            // Default fade-up animation
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
    }
}

// ===== COUNTER ANIMATIONS =====
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number, .count-animate');
    
    if (!counters.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count') || element.textContent);
    const duration = 2000; // 2 seconds
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;
    
    const updateCounter = () => {
        current += increment;
        
        if (current < target) {
            element.textContent = Math.ceil(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
            // Add completion animation
            element.classList.add('count-complete');
        }
    };
    
    updateCounter();
}

// ===== HOVER EFFECTS =====
function initHoverEffects() {
    // Card hover effects
    const cards = document.querySelectorAll('.service-card, .value-card, .industry-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('hover-active');
            
            // Add subtle lift effect
            card.style.transform = 'translateY(-10px)';
            
            // Add shine effect
            createShineEffect(card);
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('hover-active');
            card.style.transform = 'translateY(0)';
        });
    });
    
    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
        
        // Add ripple effect on click
        button.addEventListener('click', (e) => {
            createRippleEffect(e, button);
        });
    });
}

function createShineEffect(element) {
    // Remove existing shine
    const existingShine = element.querySelector('.card-shine');
    if (existingShine) existingShine.remove();
    
    // Create new shine element
    const shine = document.createElement('div');
    shine.className = 'card-shine';
    shine.style.cssText = `
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
        pointer-events: none;
        z-index: 1;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(shine);
    
    // Animate shine
    setTimeout(() => {
        shine.style.transition = 'left 0.6s ease';
        shine.style.left = '100%';
    }, 10);
    
    // Remove shine after animation
    setTimeout(() => {
        if (shine.parentNode === element) {
            element.removeChild(shine);
        }
    }, 600);
}

function createRippleEffect(event, element) {
    // Create ripple element
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
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
        pointer-events: none;
        z-index: 0;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    // Add ripple animation CSS if not exists
    if (!document.querySelector('#ripple-animation')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Remove ripple after animation
    setTimeout(() => {
        if (ripple.parentNode === element) {
            element.removeChild(ripple);
        }
    }, 600);
}

// ===== FAQ ACCORDION =====
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (!faqItems.length) return;
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });
}

// ===== SERVICE TABS =====
function initServiceTabs() {
    const serviceTabs = document.querySelector('.detail-tabs');
    
    if (!serviceTabs) return;
    
    const tabs = serviceTabs.querySelectorAll('.detail-tab');
    const contents = document.querySelectorAll('.detail-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-target');
            
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Show corresponding content
            contents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `${target}-detail`) {
                    content.classList.add('active');
                    
                    // Animate content appearance
                    const animatedElements = content.querySelectorAll('.animate-on-scroll');
                    animatedElements.forEach(el => {
                        el.classList.remove('animated');
                        el.style.opacity = '0';
                        
                        // Trigger animation after a delay
                        setTimeout(() => {
                            el.classList.add('animated');
                            triggerElementAnimation(el);
                        }, 300);
                    });
                }
            });
        });
    });
}

// ===== BACK TO TOP =====
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (!backToTopBtn) return;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== QUICK CONTACT =====
function initQuickContact() {
    const quickContact = document.querySelector('.quick-contact');
    
    if (!quickContact) return;
    
    const whatsappBtn = quickContact.querySelector('.whatsapp-btn');
    const callBtn = quickContact.querySelector('.call-btn');
    
    // Add click animations
    [whatsappBtn, callBtn].forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Prevent default for internal clicks
            if (!btn.getAttribute('href').startsWith('http') && 
                !btn.getAttribute('href').startsWith('tel') &&
                !btn.getAttribute('href').startsWith('mailto')) {
                e.preventDefault();
            }
            
            // Add click animation
            btn.style.transform = 'scale(0.9)';
            setTimeout(() => {
                btn.style.transform = 'scale(1)';
            }, 200);
        });
    });
}

// ===== PAGE TRANSITIONS =====
function initPageTransitions() {
    // Handle internal page links
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        
        if (link && link.href && 
            link.href.includes(window.location.origin) &&
            !link.href.includes('#') &&
            !link.target &&
            link.getAttribute('href') !== window.location.pathname) {
            
            e.preventDefault();
            
            // Add page transition
            document.body.style.opacity = '0.7';
            document.body.style.transition = 'opacity 0.3s ease';
            
            // Navigate after transition
            setTimeout(() => {
                window.location.href = link.href;
            }, 300);
        }
    });
    
    // Reset opacity on page load
    window.addEventListener('pageshow', () => {
        document.body.style.opacity = '1';
    });
}

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// ===== MOBILE MENU =====
document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
});

// ===== FORM VALIDATION =====
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    
                    // Add error message if not exists
                    if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('error-message')) {
                        const errorMsg = document.createElement('div');
                        errorMsg.className = 'error-message';
                        errorMsg.textContent = 'This field is required';
                        errorMsg.style.cssText = `
                            color: #f44336;
                            font-size: 0.85rem;
                            margin-top: 5px;
                        `;
                        field.parentNode.appendChild(errorMsg);
                    }
                } else {
                    field.classList.remove('error');
                    const errorMsg = field.parentNode.querySelector('.error-message');
                    if (errorMsg) errorMsg.remove();
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                
                // Shake form animation
                form.style.animation = 'shake 0.5s ease';
                setTimeout(() => {
                    form.style.animation = '';
                }, 500);
            }
        });
        
        // Clear error on focus
        form.querySelectorAll('[required]').forEach(field => {
            field.addEventListener('focus', function() {
                this.classList.remove('error');
                const errorMsg = this.parentNode.querySelector('.error-message');
                if (errorMsg) errorMsg.remove();
            });
        });
    });
}

// Initialize form validation
initFormValidation();

// ===== LAZY LOADING =====
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

// Initialize lazy loading
initLazyLoading();

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// ===== ADDITIONAL ANIMATIONS =====
function initAdditionalAnimations() {
    // Floating elements animation
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.5}s`;
        el.classList.add('animate-float');
    });
    
    // Text typing animation
    const typingElements = document.querySelectorAll('.typing-animation');
    typingElements.forEach(el => {
        const text = el.textContent;
        el.textContent = '';
        el.style.width = '0';
        
        let i = 0;
        const typing = () => {
            if (i < text.length) {
                el.textContent += text.charAt(i);
                el.style.width = ((i + 1) / text.length * 100) + '%';
                i++;
                setTimeout(typing, 100);
            }
        };
        
        // Start typing when element is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typing();
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(el);
    });
}

// Initialize additional animations
initAdditionalAnimations();

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        // Perform scroll-based operations here
    }, 100);
});

// ===== EXPORT FUNCTIONS FOR GLOBAL USE =====
window.NexGenAnimations = {
    animateCounter: animateCounter,
    createRippleEffect: createRippleEffect,
    triggerElementAnimation: triggerElementAnimation,
    initScrollAnimations: initScrollAnimations
};

console.log('✅ All animations loaded successfully');
