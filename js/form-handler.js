// Google Sheets Form Handler for NexGenAiTech Website
const scriptURL = 'https://script.google.com/macros/s/AKfycbxb1RwbEM6Z46wm4LypQd1btaQDoxi35DYb9AOHsV_6f3hWRBHIqi7ybEPffRkvshva3w/exec';

// Form submission handler for zanew.html
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('#submitBtn');
            const submitText = document.getElementById('submitText');
            const submitLoader = document.getElementById('submitLoader');
            const successMessage = document.getElementById('successMessage');
            
            // Show loading state
            submitText.style.display = 'none';
            submitLoader.style.display = 'block';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.8';
            
            // Collect form data according to zanew.html structure
            const formData = {
                name: document.getElementById('name')?.value || '',
                email: document.getElementById('email')?.value || '',
                phone: document.getElementById('phone')?.value || '',
                company: document.getElementById('company')?.value || '',
                service: document.getElementById('service')?.value || '',
                budget: document.getElementById('budget')?.value || '',
                timeline: document.getElementById('timeline')?.value || '',
                message: document.getElementById('message')?.value || '',
                timestamp: new Date().toISOString(),
                source: 'NexGenAiTech Website (zanew.html)',
                pageURL: window.location.href
            };
            
            try {
                // Send to Google Sheets
                await fetch(scriptURL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });
                
                // Show success message
                successMessage.style.display = 'block';
                contactForm.reset();
                
                setTimeout(() => {
                    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
                
                // Auto hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
                
            } catch (error) {
                console.error('Error:', error);
                alert('There was an error sending your message. Please try again or email us directly at nexgenaitech7@gmail.com');
            } finally {
                // Reset button state
                submitText.style.display = 'block';
                submitLoader.style.display = 'none';
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
            }
        });
    }
});

// Form validation functions
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validatePhone(phone) {
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return re.test(String(phone));
}

// Real-time form validation for zanew.html
function setupFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            // Real-time validation on blur
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            // Clear error on focus
            input.addEventListener('focus', function() {
                clearError(this);
            });
            
            // Real-time validation for email and phone
            if (input.type === 'email') {
                input.addEventListener('input', function() {
                    if (this.value.trim()) {
                        validateField(this);
                    }
                });
            }
            
            if (input.name === 'phone') {
                input.addEventListener('input', function() {
                    if (this.value.trim()) {
                        validateField(this);
                    }
                });
            }
        });
    }
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Required field validation
    if (field.required && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    } 
    // Email validation
    else if (field.type === 'email' && value && !validateEmail(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
    } 
    // Phone validation
    else if (field.name === 'phone' && value && !validatePhone(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid phone number';
    }
    // Textarea minimum length validation
    else if (field.type === 'textarea' && value.length < 10) {
        isValid = false;
        errorMessage = 'Please provide more details (minimum 10 characters)';
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    } else {
        clearError(field);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    // Remove existing error
    clearError(field);
    
    // Add error class
    field.classList.add('error');
    field.style.borderColor = '#f44336';
    
    // Create error message element
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.cssText = `
        color: #f44336;
        font-size: 0.85rem;
        margin-top: 5px;
        margin-bottom: 10px;
        font-weight: 500;
    `;
    
    // Insert after the field
    field.parentNode.appendChild(errorElement);
}

function clearError(field) {
    field.classList.remove('error');
    field.style.borderColor = '';
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

// Initialize form validation when page loads
window.addEventListener('load', function() {
    setupFormValidation();
    
    // Add some CSS for form validation
    const style = document.createElement('style');
    style.textContent = `
        .error {
            border-color: #f44336 !important;
            background-color: rgba(244, 67, 54, 0.05) !important;
        }
        
        .field-error {
            color: #f44336;
            font-size: 0.85rem;
            margin-top: 5px;
            margin-bottom: 10px;
            font-weight: 500;
        }
        
        input:focus.error,
        textarea:focus.error,
        select:focus.error {
            box-shadow: 0 0 0 3px rgba(244, 67, 54, 0.2) !important;
        }
    `;
    document.head.appendChild(style);
});

// Pre-submission validation for zanew.html form
function validateFormBeforeSubmit(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    // Clear all errors first
    const allInputs = form.querySelectorAll('input, textarea, select');
    allInputs.forEach(input => clearError(input));
    
    // Validate each required field
    for (let field of requiredFields) {
        if (!validateField(field)) {
            isValid = false;
        }
    }
    
    // Validate email if provided
    const emailField = form.querySelector('input[type="email"]');
    if (emailField && emailField.value.trim() && !validateEmail(emailField.value)) {
        validateField(emailField);
        isValid = false;
    }
    
    // Validate phone if provided
    const phoneField = form.querySelector('input[name="phone"]');
    if (phoneField && phoneField.value.trim() && !validatePhone(phoneField.value)) {
        validateField(phoneField);
        isValid = false;
    }
    
    // Validate message length
    const messageField = form.querySelector('textarea[name="message"]');
    if (messageField && messageField.value.trim().length < 10) {
        validateField(messageField);
        isValid = false;
    }
    
    return isValid;
}

// Update the existing submit event listener to include validation
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Replace the existing submit listener with validated one
        const originalSubmit = contactForm.onsubmit;
        
        contactForm.onsubmit = async function(e) {
            e.preventDefault();
            
            // Run validation
            if (!validateFormBeforeSubmit(contactForm)) {
                // Scroll to first error
                const firstError = contactForm.querySelector('.error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    firstError.focus();
                }
                return false;
            }
            
            // Proceed with original submission logic
            const submitBtn = this.querySelector('#submitBtn');
            const submitText = document.getElementById('submitText');
            const submitLoader = document.getElementById('submitLoader');
            const successMessage = document.getElementById('successMessage');
            
            // Show loading state
            submitText.style.display = 'none';
            submitLoader.style.display = 'block';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.8';
            
            // Collect form data
            const formData = {
                name: document.getElementById('name')?.value || '',
                email: document.getElementById('email')?.value || '',
                phone: document.getElementById('phone')?.value || '',
                company: document.getElementById('company')?.value || '',
                service: document.getElementById('service')?.value || '',
                budget: document.getElementById('budget')?.value || '',
                timeline: document.getElementById('timeline')?.value || '',
                message: document.getElementById('message')?.value || '',
                timestamp: new Date().toISOString(),
                source: 'NexGenAiTech Website (zanew.html)',
                pageURL: window.location.href
            };
            
            try {
                await fetch(scriptURL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });
                
                successMessage.style.display = 'block';
                contactForm.reset();
                
                setTimeout(() => {
                    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
                
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
                
            } catch (error) {
                console.error('Error:', error);
                alert('There was an error sending your message. Please try again or email us directly at nexgenaitech7@gmail.com');
            } finally {
                submitText.style.display = 'block';
                submitLoader.style.display = 'none';
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
            }
        };
    }
});
