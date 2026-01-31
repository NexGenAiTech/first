// Google Sheets Form Handler

const scriptURL = 'https://script.google.com/macros/s/AKfycbxb1RwbEM6Z46wm4LypQd1btaQDoxi35DYb9AOHsV_6f3hWRBHIqi7ybEPffRkvshva3w/exec';

async function submitToGoogleSheets(formData) {
    try {
        const response = await fetch(scriptURL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        return { success: true };
    } catch (error) {
        console.error('Error:', error);
        return { success: false, error };
    }
}

// Form submission handler
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form[data-google-sheets]');
    
    forms.forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Collect form data
            const formData = {};
            const formElements = this.elements;
            
            for (let element of formElements) {
                if (element.name && element.type !== 'submit') {
                    formData[element.name] = element.value;
                }
            }
            
            // Add timestamp
            formData.timestamp = new Date().toISOString();
            formData.page = window.location.pathname;
            
            // Submit to Google Sheets
            const result = await submitToGoogleSheets(formData);
            
            if (result.success) {
                // Show success message
                this.innerHTML = `
                    <div class="success-message">
                        <i class="fas fa-check-circle"></i>
                        <h3>Thank You!</h3>
                        <p>Your message has been sent successfully. We'll contact you within 24 hours.</p>
                        <button type="button" class="btn btn-primary" onclick="location.reload()">
                            Send Another Message
                        </button>
                    </div>
                `;
            } else {
                // Show error message
                alert('Failed to send message. Please email us directly at nexgenaitech7@gmail.com');
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    });
});

// Email validation
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Phone validation
function validatePhone(phone) {
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return re.test(String(phone));
}

// Form field validation
function setupFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            // Real-time validation
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            // Clear error on focus
            input.addEventListener('focus', function() {
                clearError(this);
            });
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    if (field.required && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    } else if (field.type === 'email' && value && !validateEmail(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
    } else if (field.type === 'tel' && value && !validatePhone(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid phone number';
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
    
    // Create error message
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.cssText = `
        color: #f44336;
        font-size: 0.85rem;
        margin-top: 5px;
    `;
    
    field.parentNode.appendChild(errorElement);
}

function clearError(field) {
    field.classList.remove('error');
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

// Initialize form validation
setupFormValidation();
