document.addEventListener('DOMContentLoaded', function() {
    // Menu toggle para móviles
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
        navLinks.classList.toggle('active');
    });
    
    // Mega menu
    const megaMenuButton = document.querySelector('.mega-menu-button');
    const megaMenuContent = document.querySelector('.mega-menu-content');
    
    megaMenuButton.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
    });
    
    // Animación de las barras de habilidades
    const trainerCards = document.querySelectorAll('.trainer-card');
    
    trainerCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const skillBars = this.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const level = bar.getAttribute('data-level');
                bar.style.width = `${level}%`;
            });
        });
        
        // Para dispositivos táctiles
        card.addEventListener('focus', function() {
            const skillBars = this.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const level = bar.getAttribute('data-level');
                bar.style.width = `${level}%`;
            });
        });
    });
    
    // Animación del contador
    const animateCounters = () => {
        const yearsExp = document.getElementById('years-exp');
        const clientsTrained = document.getElementById('clients-trained');
        const certifications = document.getElementById('certifications');
        
        const animate = (element, target) => {
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    clearInterval(timer);
                    current = target;
                }
                element.textContent = Math.floor(current);
            }, 20);
        };
        
        animate(yearsExp, 10);
        animate(clientsTrained, 1050);
        animate(certifications, 20);
    };
    
    // Activar animación cuando la sección es visible
    const statsSection = document.querySelector('.stats-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(statsSection);
    
    // Cerrar mega menú al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.mega-menu')) {
            megaMenuButton.setAttribute('aria-expanded', 'false');
        }
    });
});