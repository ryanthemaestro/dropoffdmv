// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get form element
    const form = document.getElementById('delivery-form');
    
    // Get navbar, menu toggle, and sticky CTA button
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const stickyCta = document.querySelector('.sticky-cta');
    
    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            // Toggle between hamburger and X icon
            const icon = menuToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
                
                // Reset icon to hamburger
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
    
    // Initialize AOS animation library if it exists
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    }
    
    // Form validation function
    function validateForm(e) {
        e.preventDefault();
        
        let isValid = true;
        const errorMessages = document.querySelectorAll('.error-message');
        
        // Remove any existing error messages
        errorMessages.forEach(message => message.remove());
        
        // Reset all fields
        form.querySelectorAll('input, select, textarea').forEach(field => {
            field.classList.remove('error');
        });
        
        // Validate Name
        const name = document.getElementById('name');
        if (name.value.trim() === '') {
            showError(name, 'Name is required');
            isValid = false;
        }
        
        // Validate Phone
        const phone = document.getElementById('phone');
        if (phone.value.trim() === '') {
            showError(phone, 'Phone number is required');
            isValid = false;
        } else if (!isValidPhone(phone.value)) {
            showError(phone, 'Please enter a valid phone number');
            isValid = false;
        }
        
        // Validate Pickup Address
        const pickupAddress = document.getElementById('pickup-address');
        if (pickupAddress.value.trim() === '') {
            showError(pickupAddress, 'Pickup address is required');
            isValid = false;
        }
        
        // Validate Dropoff Address
        const dropoffAddress = document.getElementById('dropoff-address');
        if (dropoffAddress.value.trim() === '') {
            showError(dropoffAddress, 'Drop-off address is required');
            isValid = false;
        }
        
        // Validate Item Description
        const itemDescription = document.getElementById('item-description');
        if (itemDescription.value.trim() === '') {
            showError(itemDescription, 'Item description is required');
            isValid = false;
        }
        
        // Validate Size
        const size = document.getElementById('size');
        if (size.value === '') {
            showError(size, 'Please select a size');
            isValid = false;
        }
        
        // Validate Delivery Time
        const deliveryTime = document.getElementById('delivery-time');
        if (deliveryTime.value === '') {
            showError(deliveryTime, 'Please select a delivery time window');
            isValid = false;
        }
        
        // Validate Payment Status
        const paymentStatus = document.querySelector('input[name="payment_status"]:checked');
        if (!paymentStatus) {
            // Find the radio group container and show error there
            const radioGroup = document.querySelector('.radio-group');
            if (radioGroup) {
                const errorDiv = document.createElement('div');
                errorDiv.className = 'error-message';
                errorDiv.textContent = 'Please select a payment status';
                radioGroup.appendChild(errorDiv);
            }
            isValid = false;
        }
        
        // If form is valid, submit it to Netlify
        if (isValid) {
            const formData = new FormData(form);
            
            fetch('/', {
                method: 'POST',
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString()
            })
            .then(() => {
                // Redirect to thanks page after successful submission
                window.location.href = '/thanks.html';
            })
            .catch((error) => {
                console.error('Form submission error:', error);
                alert('There was an error submitting your form. Please try again.');
            });
            
            // Prevent the default form submission
            return false;
        }
    }
    
    // Helper function to show error messages
    function showError(field, message) {
        field.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }
    
    // Helper function to validate phone number
    function isValidPhone(phone) {
        // Basic US phone validation (accepts formats like: 123-456-7890, (123) 456-7890, 1234567890)
        const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
        return phoneRegex.test(phone);
    }
    
    // Add form submit event listener
    if (form) {
        form.addEventListener('submit', validateForm);
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Handle scroll events for sticky navbar and CTA
    window.addEventListener('scroll', function() {
        // Show/hide sticky CTA based on scroll position
        if (window.scrollY > 300) {
            stickyCta.style.display = 'block';
        } else {
            stickyCta.style.display = 'none';
        }
        
        // Add shadow to navbar when scrolled
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Add animation to form fields when they come into focus
    const formFields = document.querySelectorAll('input, select, textarea');
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        field.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Check if field already has value on page load
        if (field.value !== '') {
            field.parentElement.classList.add('focused');
        }
    });
    
    // Price estimate calculation
    const sizeInput = document.getElementById('size');
    const distanceInput = document.getElementById('distance');
    const rushCheckbox = document.getElementById('rush');
    const stairsCheckbox = document.getElementById('stairs');
    const assemblyCheckbox = document.getElementById('assembly');
    const priceEstimateEl = document.getElementById('price-estimate');

    function updateEstimate() {
        let basePrice = 0;
        switch (sizeInput.value) {
            case 'small': basePrice = 25; break;
            case 'medium': basePrice = 40; break;
            case 'large': basePrice = 60; break;
            default: basePrice = 0;
        }
        let distance = parseFloat(distanceInput.value) || 0;
        let extraMiles = Math.max(0, distance - 10);
        let price = basePrice + extraMiles * 1;
        if (rushCheckbox && rushCheckbox.checked) price += 15;
        if (stairsCheckbox && stairsCheckbox.checked) price += 10;
        if (assemblyCheckbox && assemblyCheckbox.checked) price += 25;
        if (priceEstimateEl) priceEstimateEl.textContent = 'Estimated Price: $' + price.toFixed(2);
    }

    [sizeInput, distanceInput, rushCheckbox, stairsCheckbox, assemblyCheckbox].forEach(el => {
        if (el) el.addEventListener('change', updateEstimate);
    });

    updateEstimate();
});
