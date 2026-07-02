/**
 * DOM Utility Functions
 * Reusable helper functions for DOM manipulation
 */

const DOM = {
    /**
     * Select a single element
     */
    select: (selector) => {
        return document.querySelector(selector);
    },
    
    /**
     * Select multiple elements
     */
    selectAll: (selector) => {
        return document.querySelectorAll(selector);
    },
    
    /**
     * Create an element
     */
    createElement: (tag, options = {}) => {
        const element = document.createElement(tag);
        if (options.class) element.className = options.class;
        if (options.id) element.id = options.id;
        if (options.text) element.textContent = options.text;
        if (options.html) element.innerHTML = options.html;
        return element;
    },
    
    /**
     * Add class to element
     */
    addClass: (element, className) => {
        element && element.classList.add(className);
    },
    
    /**
     * Remove class from element
     */
    removeClass: (element, className) => {
        element && element.classList.remove(className);
    },
    
    /**
     * Toggle class on element
     */
    toggleClass: (element, className) => {
        element && element.classList.toggle(className);
    },
    
    /**
     * Check if element has class
     */
    hasClass: (element, className) => {
        return element ? element.classList.contains(className) : false;
    },
    
    /**
     * Add event listener
     */
    on: (element, event, handler) => {
        element && element.addEventListener(event, handler);
    },
    
    /**
     * Remove event listener
     */
    off: (element, event, handler) => {
        element && element.removeEventListener(event, handler);
    },
    
    /**
     * Add event listener to multiple elements
     */
    onAll: (selector, event, handler) => {
        DOM.selectAll(selector).forEach(element => {
            DOM.on(element, event, handler);
        });
    },
    
    /**
     * Get element attribute
     */
    attr: (element, attribute) => {
        return element ? element.getAttribute(attribute) : null;
    },
    
    /**
     * Set element attribute
     */
    setAttr: (element, attribute, value) => {
        element && element.setAttribute(attribute, value);
    },
    
    /**
     * Get element data attribute
     */
    data: (element, key) => {
        return element ? element.dataset[key] : null;
    },
    
    /**
     * Set element data attribute
     */
    setData: (element, key, value) => {
        if (element) element.dataset[key] = value;
    },
    
    /**
     * Get element text content
     */
    text: (element) => {
        return element ? element.textContent : '';
    },
    
    /**
     * Set element text content
     */
    setText: (element, text) => {
        if (element) element.textContent = text;
    },
    
    /**
     * Get element HTML content
     */
    html: (element) => {
        return element ? element.innerHTML : '';
    },
    
    /**
     * Set element HTML content
     */
    setHtml: (element, html) => {
        if (element) element.innerHTML = html;
    },
    
    /**
     * Append child to element
     */
    append: (parent, child) => {
        parent && parent.appendChild(child);
    },
    
    /**
     * Prepend child to element
     */
    prepend: (parent, child) => {
        parent && parent.insertBefore(child, parent.firstChild);
    },
    
    /**
     * Remove element
     */
    remove: (element) => {
        element && element.remove();
    },
    
    /**
     * Get computed style
     */
    getStyle: (element, property) => {
        return element ? window.getComputedStyle(element).getPropertyValue(property) : null;
    },
    
    /**
     * Set CSS property
     */
    setStyle: (element, property, value) => {
        if (element) element.style[property] = value;
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DOM;
}