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
    
    // Filtrado de categorías
    const filterButtons = document.querySelectorAll('.filter-button');
    const postCards = document.querySelectorAll('.post-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Quitar active de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Añadir active al botón clickeado
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            postCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Menú móvil
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navLinks = document.querySelector('.nav-links');
    const searchContainer = document.querySelector('.search-container');
    
    mobileMenuButton.addEventListener('click', function() {
        const isOpen = navLinks.style.display === 'flex';
        
        if (isOpen) {
            navLinks.style.display = 'none';
            searchContainer.style.display = 'none';
            this.innerHTML = '<i class="fas fa-bars"></i>';
        } else {
            navLinks.style.display = 'flex';
            searchContainer.style.display = 'flex';
            this.innerHTML = '<i class="fas fa-times"></i>';
            
            // Ajustar estilos para móvil
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.backgroundColor = 'var(--header-bg)';
            navLinks.style.padding = '1rem';
            navLinks.style.gap = '1rem';
            navLinks.style.zIndex = '99';
            
            searchContainer.style.position = 'absolute';
            searchContainer.style.top = `calc(100% + ${navLinks.offsetHeight + 10}px)`;
            searchContainer.style.left = '0';
            searchContainer.style.width = '100%';
            searchContainer.style.padding = '0 1rem 1rem';
            searchContainer.style.backgroundColor = 'var(--header-bg)';
            searchContainer.style.zIndex = '99';
        }
    });
    
    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
                searchContainer.style.display = 'none';
                mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
    
    // Efecto hover en tarjetas de artículo
    postCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 15px 30px var(--hover-shadow)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '0 5px 15px var(--shadow-color)';
        });
    });
    
    // Smooth scroll para enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
