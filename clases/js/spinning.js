/**
 * Spinning Page for Tribu de Hierro Gym
 * Modern, accessible implementation
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    initTheme();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize schedule tabs
    initScheduleTabs();
    
    // Initialize form validation
    initTrialForm();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize lazy loading
    initLazyLoading();
    
    // Initialize theme toggle
    initThemeToggle();
});

/**
 * Initialize theme based on user preference
 */
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (prefersDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
}

/**
 * Initialize mobile menu functionality
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav ul');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            this.setAttribute('aria-expanded', !isExpanded);
            this.classList.toggle('active');
            nav.classList.toggle('active');
            
            // Toggle body scroll
            document.body.style.overflow = isExpanded ? '' : 'hidden';
        });
    }
}

/**
 * Initialize schedule tabs
 */
function initScheduleTabs() {
    const tabButtons = document.querySelectorAll('.schedule-tabs .tab-button');
    const tabContents = document.querySelectorAll('.schedule-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const day = this.getAttribute('data-day');
            
            // Update active button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update active content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.getAttribute('data-day') === day) {
                    content.classList.add('active');
                }
            });
        });
    });
}

/**
 * Initialize trial class form validation
 */
function initTrialForm() {
    const form = document.getElementById('trial-class-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const requiredFields = this.querySelectorAll('[required]');
            
            // Validate required fields
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    
                    // Add error message if not exists
                    if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('error-message')) {
                        const error = document.createElement('span');
                        error.className = 'error-message';
                        error.textContent = 'Este campo es requerido';
                        error.setAttribute('aria-live', 'polite');
                        field.parentNode.insertBefore(error, field.nextSibling);
                    }
                } else {
                    field.classList.remove('error');
                    
                    // Remove error message if exists
                    if (field.nextElementSibling && field.nextElementSibling.classList.contains('error-message')) {
                        field.nextElementSibling.remove();
                    }
                }
            });
            
            // Validate email format
            const emailField = this.querySelector('input[type="email"]');
            if (emailField && emailField.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
                isValid = false;
                emailField.classList.add('error');
                
                if (!emailField.nextElementSibling || !emailField.nextElementSibling.classList.contains('error-message')) {
                    const error = document.createElement('span');
                    error.className = 'error-message';
                    error.textContent = 'Ingresa un email válido';
                    emailField.parentNode.insertBefore(error, emailField.nextSibling);
                }
            }
            
            // Validate date is in the future
            const dateField = this.querySelector('input[type="date"]');
            if (dateField && dateField.value) {
                const selectedDate = new Date(dateField.value);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                
                if (selectedDate < today) {
                    isValid = false;
                    dateField.classList.add('error');
                    
                    if (!dateField.nextElementSibling || !dateField.nextElementSibling.classList.contains('error-message')) {
                        const error = document.createElement('span');
                        error.className = 'error-message';
                        error.textContent = 'Selecciona una fecha futura';
                        dateField.parentNode.insertBefore(error, dateField.nextSibling);
                    }
                }
            }
            
            if (isValid) {
                // Simulate form submission
                alert('¡Gracias por tu reserva! Te hemos enviado los detalles por email.');
                form.reset();
            }
        });
    }
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (!target) return;
            
            // Close mobile menu if open
            const menuToggle = document.querySelector('.menu-toggle');
            if (menuToggle && menuToggle.classList.contains('active')) {
                menuToggle.classList.remove('active');
                document.querySelector('.nav ul').classList.remove('active');
                document.body.style.overflow = '';
            }
            
            // Scroll to target
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Update URL without jumping
            if (history.pushState) {
                history.pushState(null, null, targetId);
            } else {
                location.hash = targetId;
            }
        });
    });
}

/**
 * Initialize lazy loading for images
 */
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('src');
                    img.removeAttribute('loading');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '200px 0px'
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

/**
 * Initialize theme toggle functionality
 */
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // Set new theme
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Update toggle button
            const icon = this.querySelector('i');
            if (icon) {
                icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            }
        });
    }
}