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
    
    megaMenuButton.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
    });
    
    // Filtrado de clases por categoría
    const filterOptions = document.querySelectorAll('.filter-option input');
    const classCards = document.querySelectorAll('.class-card');
    
    filterOptions.forEach(option => {
        option.addEventListener('change', function() {
            const filterValue = this.value;
            
            if (filterValue === 'all') {
                classCards.forEach(card => {
                    card.style.display = 'block';
                });
            } else {
                classCards.forEach(card => {
                    if (card.dataset.category === filterValue) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            }
        });
    });
    
    // Filtrado de horario por día
    const scheduleNavButtons = document.querySelectorAll('.schedule-nav-button');
    const scheduleCells = document.querySelectorAll('.schedule-table td[data-class]');
    
    scheduleNavButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover clase active de todos los botones
            scheduleNavButtons.forEach(btn => btn.classList.remove('active'));
            
            // Agregar clase active al botón clickeado
            this.classList.add('active');
            
            const day = this.dataset.day;
            
            if (day === 'all') {
                scheduleCells.forEach(cell => {
                    cell.style.display = 'table-cell';
                });
            } else {
                scheduleCells.forEach(cell => {
                    const cellDay = cell.parentElement.querySelector('th').textContent.toLowerCase();
                    if (cellDay.includes(day)) {
                        cell.style.display = 'table-cell';
                    } else {
                        cell.style.display = 'none';
                    }
                });
            }
        });
    });
    
    // Cerrar mega menú al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.mega-menu')) {
            megaMenuButton.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Scroll suave para enlaces del mega menú
    document.querySelectorAll('.mega-menu-column a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Filtrar las clases primero
                const filterValue = this.getAttribute('data-filter');
                const filterInput = document.querySelector(`#filter-${filterValue}`);
                
                if (filterInput) {
                    filterInput.checked = true;
                    filterInput.dispatchEvent(new Event('change'));
                }
                
                // Desplazarse al elemento
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
});