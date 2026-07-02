/**
 * Header Component
 * Handles navigation, sticky header, and mobile menu
 */

class Header {
    constructor() {
        this.header = DOM.select('.header');
        this.hamburger = DOM.select('.hamburger');
        this.navMenu = DOM.select('.nav-menu');
        this.navLinks = DOM.selectAll('.nav-link');
        this.navContainer = DOM.select('.nav-container');
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.setupScrollListener();
        this.setupMobileMenu();
    }
    
    /**
     * Bind event listeners
     */
    bindEvents() {
        // Hamburger menu toggle
        DOM.on(this.hamburger, 'click', () => this.toggleMobileMenu());
        
        // Navigation links
        this.navLinks.forEach(link => {
            DOM.on(link, 'click', (e) => this.handleNavClick(e));
        });
    }
    
    /**
     * Setup scroll listener for sticky header
     */
    setupScrollListener() {
        const scrollListener = Animations.throttle(() => {
            const scrollPosition = Animations.getScrollPosition();
            if (scrollPosition > 50) {
                DOM.addClass(this.header, 'scrolled');
            } else {
                DOM.removeClass(this.header, 'scrolled');
            }
        }, 100);
        
        window.addEventListener('scroll', scrollListener);
    }
    
    /**
     * Toggle mobile menu
     */
    toggleMobileMenu() {
        DOM.toggleClass(this.hamburger, 'active');
        DOM.toggleClass(this.navMenu, 'active');
    }
    
    /**
     * Close mobile menu
     */
    closeMobileMenu() {
        DOM.removeClass(this.hamburger, 'active');
        DOM.removeClass(this.navMenu, 'active');
    }
    
    /**
     * Setup mobile menu
     */
    setupMobileMenu() {
        // Close menu on nav link click
        this.navLinks.forEach(link => {
            DOM.on(link, 'click', () => {
                if (window.innerWidth <= 768) {
                    this.closeMobileMenu();
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            const isClickInsideNav = this.navContainer.contains(e.target);
            if (!isClickInsideNav && DOM.hasClass(this.navMenu, 'active')) {
                this.closeMobileMenu();
            }
        });
    }
    
    /**
     * Handle navigation link click
     */
    handleNavClick(e) {
        e.preventDefault();
        const targetId = DOM.attr(e.target, 'href');
        const targetElement = DOM.select(targetId);
        
        if (targetElement) {
            Animations.scrollTo(targetElement, 70);
            
            // Update active state
            this.navLinks.forEach(link => {
                DOM.removeClass(link.parentElement, 'active');
            });
            DOM.addClass(e.target.parentElement, 'active');
        }
    }
}

// Initialize header when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new Header();
    });
} else {
    new Header();
}