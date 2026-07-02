/**
 * Contact Component
 * Handles contact form submission and validation
 */

class Contact {
    constructor() {
        this.form = DOM.select('#contactForm');
        this.successMessage = null;
        
        if (this.form) {
            this.init();
        }
    }
    
    init() {
        this.bindEvents();
    }
    
    /**
     * Bind event listeners
     */
    bindEvents() {
        DOM.on(this.form, 'submit', (e) => this.handleSubmit(e));
    }
    
    /**
     * Handle form submission
     */
    handleSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        // Validate form
        if (!this.validateForm(data)) {
            this.showError('Please fill in all fields correctly.');
            return;
        }
        
        // Simulate form submission
        this.submitForm(data);
    }
    
    /**
     * Validate form data
     */
    validateForm(data) {
        const { name, email, subject, message } = data;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        return (
            name.trim() !== '' &&
            emailRegex.test(email) &&
            subject.trim() !== '' &&
            message.trim() !== ''
        );
    }
    
    /**
     * Submit form (in production, this would send to a backend)
     */
    submitForm(data) {
        // Show loading state
        const submitButton = this.form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate network request
        setTimeout(() => {
            // Show success message
            this.showSuccess('Message sent successfully! I\'ll get back to you soon.');
            
            // Reset form
            this.form.reset();
            
            // Restore button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            
            // Remove success message after 5 seconds
            setTimeout(() => this.removeSuccessMessage(), 5000);
        }, 1000);
    }
    
    /**
     * Show success message
     */
    showSuccess(message) {
        this.removeSuccessMessage();
        
        const successDiv = DOM.createElement('div', {
            class: 'form-message success',
            text: message
        });
        
        successDiv.style.cssText = `
            background-color: var(--success-color);
            color: white;
            padding: var(--spacing-md) var(--spacing-lg);
            border-radius: var(--radius-md);
            margin-bottom: var(--spacing-lg);
            animation: slideInLeft 300ms ease-out;
        `;
        
        this.successMessage = successDiv;
        this.form.insertBefore(successDiv, this.form.firstChild);
    }
    
    /**
     * Show error message
     */
    showError(message) {
        const errorDiv = DOM.createElement('div', {
            class: 'form-message error',
            text: message
        });
        
        errorDiv.style.cssText = `
            background-color: var(--danger-color);
            color: white;
            padding: var(--spacing-md) var(--spacing-lg);
            border-radius: var(--radius-md);
            margin-bottom: var(--spacing-lg);
            animation: slideInLeft 300ms ease-out;
        `;
        
        this.form.insertBefore(errorDiv, this.form.firstChild);
    }
    
    /**
     * Remove success message
     */
    removeSuccessMessage() {
        if (this.successMessage) {
            this.successMessage.remove();
            this.successMessage = null;
        }
    }
}

// Initialize contact form when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new Contact();
    });
} else {
    new Contact();
}