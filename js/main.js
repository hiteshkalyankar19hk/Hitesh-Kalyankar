/**
 * Main Application Script
 * Initialize all components and global functionality
 */

(function() {
    'use strict';
    
    // Application initialization
    class App {
        constructor() {
            this.init();
        }
        
        init() {
            this.setupScrollAnimations();
            this.setupIntersectionObserver();
        }
        
        /**
         * Setup scroll animations for elements
         */
        setupScrollAnimations() {
            // Animate cards when they come into view
            const animateOnScroll = Animations.throttle(() => {
                const cards = DOM.selectAll('.card, .service-card, .portfolio-card, .testimonial-card');
                cards.forEach(card => {
                    if (Animations.isInViewport(card) && !DOM.hasClass(card, 'animated')) {
                        DOM.addClass(card, 'fade-in');
                        DOM.addClass(card, 'animated');
                    }
                });
            }, 100);
            
            window.addEventListener('scroll', animateOnScroll);
        }
        
        /**
         * Setup intersection observer for lazy animations
         */
        setupIntersectionObserver() {
            const elements = DOM.selectAll('.service-card, .portfolio-card');
            
            elements.forEach((element, index) => {
                Animations.observeElement(element, () => {
                    setTimeout(() => {
                        DOM.addClass(element, 'fade-in');
                    }, index * 50);
                }, { threshold: 0.1 });
            });
        }
    }
    
    // Initialize app when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            new App();
        });
    } else {
        new App();
    }
})();

// Add CSS class for animations
const style = DOM.createElement('style');
style.textContent = `
    .card.animated {
        animation: fadeIn 0.6s ease-out;
    }
`;
if (document.head) {
    document.head.appendChild(style);
}