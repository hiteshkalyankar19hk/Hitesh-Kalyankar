/**
 * Animation Utility Functions
 * Reusable helper functions for animations and effects
 */

const Animations = {
    /**
     * Scroll to element smoothly
     */
    scrollTo: (element, offset = 0) => {
        if (!element) return;
        const targetPosition = element.offsetTop - offset;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    },
    
    /**
     * Scroll to position
     */
    scrollToPosition: (position, behavior = 'smooth') => {
        window.scrollTo({
            top: position,
            behavior: behavior
        });
    },
    
    /**
     * Get scroll position
     */
    getScrollPosition: () => {
        return window.scrollY || document.documentElement.scrollTop;
    },
    
    /**
     * Check if element is in viewport
     */
    isInViewport: (element) => {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    },
    
    /**
     * Observe element intersection (triggers callback when element enters viewport)
     */
    observeElement: (element, callback, options = {}) => {
        const defaultOptions = {
            threshold: 0.1,
            rootMargin: '0px',
            ...options
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    callback(entry);
                    observer.unobserve(entry.target);
                }
            });
        }, defaultOptions);
        
        observer.observe(element);
        return observer;
    },
    
    /**
     * Fade in element
     */
    fadeIn: (element, duration = 300) => {
        if (!element) return;
        element.style.opacity = '0';
        element.style.transition = `opacity ${duration}ms ease-in-out`;
        setTimeout(() => {
            element.style.opacity = '1';
        }, 10);
    },
    
    /**
     * Fade out element
     */
    fadeOut: (element, duration = 300) => {
        if (!element) return;
        element.style.transition = `opacity ${duration}ms ease-in-out`;
        element.style.opacity = '0';
    },
    
    /**
     * Slide in element
     */
    slideIn: (element, direction = 'left', duration = 300) => {
        if (!element) return;
        const offset = direction === 'left' ? '-100px' : '100px';
        element.style.transform = `translateX(${offset})`;
        element.style.opacity = '0';
        element.style.transition = `all ${duration}ms ease-in-out`;
        setTimeout(() => {
            element.style.transform = 'translateX(0)';
            element.style.opacity = '1';
        }, 10);
    },
    
    /**
     * Debounce function
     */
    debounce: (func, delay = 300) => {
        let timeoutId;
        return function(...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    },
    
    /**
     * Throttle function
     */
    throttle: (func, delay = 300) => {
        let lastCall = 0;
        return function(...args) {
            const now = Date.now();
            if (now - lastCall >= delay) {
                lastCall = now;
                func.apply(this, args);
            }
        };
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Animations;
}