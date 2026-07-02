/**
 * Hero Component
 * Handles hero section animations and interactions
 */

class Hero {
    constructor() {
        this.hero = DOM.select('.hero');
        this.floatingCards = DOM.selectAll('.floating-card');
        
        this.init();
    }
    
    init() {
        this.setupAnimations();
    }
    
    /**
     * Setup hero animations
     */
    setupAnimations() {
        // Animate floating cards on load
        window.addEventListener('load', () => {
            this.floatingCards.forEach((card, index) => {
                setTimeout(() => {
                    Animations.fadeIn(card, 500);
                }, index * 100);
            });
        });
        
        // Add fade animation to hero content
        const heroContent = DOM.select('.hero-content');
        if (heroContent) {
            Animations.fadeIn(heroContent, 800);
        }
    }
}

// Initialize hero when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new Hero();
    });
} else {
    new Hero();
}