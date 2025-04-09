/**
 * EliteFit - Advanced Training
 * Modern, accessible, and performant implementation
 */

document.addEventListener('DOMContentLoaded', function() {
    // System preference for color scheme
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Initialize theme
    initTheme();
    
    // Initialize lazy loading
    initLazyLoading();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize counters
    initCounters();
    
    // Initialize tabs
    initTabs();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize form validation
    initFormValidation();
    
    // Initialize charts
    initCharts();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize loading overlay
    initLoadingOverlay();
    
    // Performance monitoring
    monitorPerformance();
});

/**
 * Initialize theme based on user preference
 */
function initTheme() {
    const themeToggle = document.querySelectorAll('.theme-toggle');
    const html = document.documentElement;
    
    // Check for saved preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
        html.setAttribute('data-color-scheme', savedTheme);
    } else {
        const theme = prefersDark ? 'dark' : 'light';
        html.setAttribute('data-theme', theme);
        html.setAttribute('data-color-scheme', theme);
    }
    
    // Update toggle button state
    updateThemeToggle();
    
    // Add event listeners to all theme toggles
    themeToggle.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // Set new theme
            html.setAttribute('data-theme', newTheme);
            html.setAttribute('data-color-scheme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Update toggle buttons
            updateThemeToggle();
            
            // Dispatch custom event
            document.dispatchEvent(new CustomEvent('themeChange', { detail: newTheme }));
        });
    });
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            html.setAttribute('data-theme', newTheme);
            html.setAttribute('data-color-scheme', newTheme);
            updateThemeToggle();
        }
    });
}

/**
 * Update theme toggle button state
 */
function updateThemeToggle() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const toggles = document.querySelectorAll('.theme-toggle');
    
    toggles.forEach(toggle => {
        const pressed = currentTheme === 'dark';
        toggle.setAttribute('aria-pressed', pressed);
        toggle.setAttribute('aria-label', pressed ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
    });
}

/**
 * Initialize lazy loading for images
 */
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('.lazy-image');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '200px 0px',
            threshold: 0.01
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.classList.add('loaded');
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
                document.querySelector('.nav-list').classList.remove('active');
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
 * Initialize counter animations
 */
function initCounters() {
    const counters = document.querySelectorAll('.stat-value[data-count]');
    
    if ('IntersectionObserver' in window) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });
        
        counters.forEach(counter => counterObserver.observe(counter));
    }
}

/**
 * Animate counter element
 */
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        element.textContent = Math.floor(current);
        
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

/**
 * Initialize tab functionality
 */
function initTabs() {
    const tabContainers = document.querySelectorAll('.tab-content');
    const tabButtons = document.querySelectorAll('.tab-button');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('aria-controls');
            
            // Update button states
            tabButtons.forEach(btn => {
                btn.setAttribute('aria-selected', 'false');
                btn.setAttribute('tabindex', '-1');
                btn.classList.remove('active');
            });
            
            this.setAttribute('aria-selected', 'true');
            this.setAttribute('tabindex', '0');
            this.classList.add('active');
            
            // Update tab visibility
            tabContainers.forEach(tab => {
                if (tab.id === tabId) {
                    tab.hidden = false;
                    tab.classList.add('active');
                } else {
                    tab.hidden = true;
                    tab.classList.remove('active');
                }
            });
            
            // Dispatch custom event
            document.dispatchEvent(new CustomEvent('tabChange', { 
                detail: { 
                    tabId: tabId,
                    button: this 
                } 
            }));
        });
    });
}

/**
 * Initialize mobile menu functionality
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', function() {
            const expanded = this.getAttribute('aria-expanded') === 'true';
            
            this.setAttribute('aria-expanded', !expanded);
            this.classList.toggle('active');
            navList.classList.toggle('active');
            
            // Toggle body scroll
            document.body.style.overflow = expanded ? '' : 'hidden';
        });
    }
}

/**
 * Initialize form validation
 */
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const requiredFields = this.querySelectorAll('[required]');
            
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
            
            if (isValid) {
                // Show loading overlay
                document.querySelector('.loading-overlay').classList.add('active');
                
                // Simulate form submission
                setTimeout(() => {
                    document.querySelector('.loading-overlay').classList.remove('active');
                    
                    // Show success message
                    alert('Formulario enviado con éxito');
                    form.reset();
                }, 1500);
            }
        });
    });
}

/**
 * Initialize charts
 */
function initCharts() {
    if (typeof Chart === 'undefined') return;
    
    // Strength chart
    const strengthCtx = document.getElementById('strength-chart');
    if (strengthCtx) {
        new Chart(strengthCtx, {
            type: 'line',
            data: {
                labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Semana 5', 'Semana 6', 'Semana 7', 'Semana 8'],
                datasets: [{
                    label: '1RM (kg)',
                    data: [120, 125, 127, 130, 132, 135, 137, 140],
                    borderColor: '#4f46e5',
                    backgroundColor: 'rgba(79, 70, 229, 0.1)',
                    borderWidth: 3,
                    tension: 0.3,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 110
                    }
                }
            }
        });
    }
    
    // Hypertrophy chart
    const hypertrophyCtx = document.getElementById('hypertrophy-chart');
    if (hypertrophyCtx) {
        new Chart(hypertrophyCtx, {
            type: 'bar',
            data: {
                labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Semana 5', 'Semana 6'],
                datasets: [{
                    label: 'Volumen Semanal',
                    data: [12000, 14000, 16000, 18000, 20000, 18000],
                    backgroundColor: 'rgba(245, 158, 11, 0.7)',
                    borderColor: '#f59e0b',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
    
    // Power chart
    const powerCtx = document.getElementById('power-chart');
    if (powerCtx) {
        new Chart(powerCtx, {
            type: 'radar',
            data: {
                labels: ['Potencia', 'Velocidad', 'Fuerza', 'Técnica', 'Resistencia'],
                datasets: [{
                    label: 'Inicio',
                    data: [65, 59, 70, 60, 55],
                    backgroundColor: 'rgba(79, 70, 229, 0.2)',
                    borderColor: '#4f46e5',
                    borderWidth: 2
                }, {
                    label: 'Final',
                    data: [85, 80, 90, 85, 75],
                    backgroundColor: 'rgba(16, 185, 129, 0.2)',
                    borderColor: '#10b981',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                scales: {
                    r: {
                        angleLines: {
                            display: true
                        },
                        suggestedMin: 0,
                        suggestedMax: 100
                    }
                }
            }
        });
    }
}

/**
 * Initialize scroll animations
 */
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.method-card, .analysis-card, .research-card, .tier-card');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        animateElements.forEach(el => observer.observe(el));
    } else {
        // Fallback for browsers without IntersectionObserver
        animateElements.forEach(el => el.classList.add('animate'));
    }
}

/**
 * Initialize loading overlay
 */
function initLoadingOverlay() {
    // This would be triggered by actual loading events
    // For demo purposes, we're handling it in form validation
}

/**
 * Monitor performance
 */
function monitorPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                const timing = performance.timing;
                const loadTime = timing.loadEventEnd - timing.navigationStart;
                
                console.log(`Tiempo de carga: ${loadTime}ms`);
                
                if (loadTime > 3000) {
                    console.warn('El tiempo de carga es mayor a 3 segundos. Considere optimizar.');
                }
            }, 0);
        });
    }
}

// Service Worker registration for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, err => {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}