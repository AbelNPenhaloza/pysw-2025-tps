document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const confirmationModal = document.getElementById('confirmationModal');
    const closeModal = document.getElementById('closeModal');
    const submitBtn = contactForm.querySelector('.submit-btn');

    // Manejar el envío del formulario
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validar todos los campos requeridos
        if (!contactForm.checkValidity()) {
            // Mostrar errores si el formulario no es válido
            const invalidFields = contactForm.querySelectorAll(':invalid');
            invalidFields.forEach(field => {
                field.style.borderColor = '#f44336';
                
                // Desplazarse al primer campo inválido
                if (field === invalidFields[0]) {
                    field.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            });
            return;
        }

        // Mostrar spinner de carga
        submitBtn.classList.add('loading');
        
        // Simular envío del formulario (en producción, usar fetch o AJAX)
        setTimeout(() => {
            // Ocultar spinner
            submitBtn.classList.remove('loading');
            
            // Mostrar modal de confirmación
            confirmationModal.classList.add('active');
            
            // Aquí iría el código real para enviar el formulario
            // Ejemplo con fetch:
            /*
            fetch('tu-endpoint.php', {
                method: 'POST',
                body: new FormData(contactForm)
            })
            .then(response => response.json())
            .then(data => {
                submitBtn.classList.remove('loading');
                if (data.success) {
                    confirmationModal.classList.add('active');
                    contactForm.reset();
                } else {
                    alert('Error al enviar el formulario');
                }
            })
            .catch(error => {
                submitBtn.classList.remove('loading');
                alert('Error de conexión');
            });
            */
            
            // Limpiar formulario después del envío
            contactForm.reset();
        }, 1500);
    });

    // Cerrar modal al hacer clic en el botón
    closeModal.addEventListener('click', function() {
        confirmationModal.classList.remove('active');
    });

    // Cerrar modal al hacer clic fuera del contenido
    confirmationModal.addEventListener('click', function(e) {
        if (e.target === confirmationModal) {
            confirmationModal.classList.remove('active');
        }
    });

    // Validación en tiempo real para campos de formulario
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            // Resetear estilo del campo
            this.style.borderColor = '#ddd';
            
            // Validar campo y aplicar estilos
            if (this.checkValidity()) {
                if (this.value !== '') {
                    this.style.borderColor = '#4CAF50';
                }
            } else if (this.value !== '') {
                this.style.borderColor = '#f44336';
            }
        });
        
        // Validar al perder el foco
        input.addEventListener('blur', function() {
            if (!this.checkValidity() && this.value !== '') {
                this.style.borderColor = '#f44336';
            }
        });
    });

    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && confirmationModal.classList.contains('active')) {
            confirmationModal.classList.remove('active');
        }
    });
});