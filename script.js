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
        
        // If form is valid, submit it
        if (isValid) {
            // Here you would typically send the form data to a server
            // For now, we'll just show a success message
            alert('Thank you! Your quote request has been submitted. We will contact you shortly.');
            form.reset();
            
            // In a real application, you would use something like:
            /*
            fetch('your-api-endpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name.value,
                    phone: phone.value,
                    pickupAddress: pickupAddress.value,
                    dropoffAddress: dropoffAddress.value,
                    itemDescription: itemDescription.value,
                    size: size.value,
                    stairs: document.getElementById('stairs').checked,
                    rush: document.getElementById('rush').checked
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                alert('Thank you! Your quote request has been submitted. We will contact you shortly.');
                form.reset();
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('There was an error submitting your request. Please try again later.');
            });
            */
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
});
