document.addEventListener('DOMContentLoaded', function() {
    // Toggle de tema oscuro/claro
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Aplicar tema guardado
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Actualizar icono según tema
    updateThemeIcon(currentTheme);
    
    themeToggle.addEventListener('click', function() {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
        updateThemeIcon(theme === 'light' ? 'dark' : 'light');
    });
    
    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
    
    // Efecto hover en tarjetas de precios
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px var(--hover-shadow)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '0 5px 15px var(--shadow-color)';
        });
    });
    
    // Tooltips para móviles (touch)
    if ('ontouchstart' in window) {
        const featureItems = document.querySelectorAll('.features li');
        featureItems.forEach(item => {
            item.addEventListener('click', function(e) {
                // Evitar que se active si se hace clic en un enlace
                if (e.target.tagName === 'A') return;
                
                const tooltip = this.querySelector('.tooltip');
                if (tooltip) {
                    // Cerrar otros tooltips abiertos
                    document.querySelectorAll('.tooltip').forEach(t => {
                        if (t !== tooltip) t.style.visibility = 'hidden';
                    });
                    
                    // Alternar visibilidad del tooltip actual
                    if (tooltip.style.visibility === 'visible') {
                        tooltip.style.visibility = 'hidden';
                    } else {
                        tooltip.style.visibility = 'visible';
                    }
                }
            });
        });
        
        // Cerrar tooltips al hacer clic en cualquier parte
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.features li')) {
                document.querySelectorAll('.tooltip').forEach(tooltip => {
                    tooltip.style.visibility = 'hidden';
                });
            }
        });
    }
});