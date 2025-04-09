document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registerForm');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const modal = document.getElementById('confirmationModal');
    const closeButton = modal.querySelector('.close-button');
    const submitButton = form.querySelector('button[type="submit"]');
    const spinnerContainer = submitButton.querySelector('.spinner-container');

    form.addEventListener('input', function(event) {
        const target = event.target;
        const validationMessage = target.nextElementSibling;

        if (target.checkValidity()) {
            target.classList.add('valid');
            target.classList.remove('invalid');
            if (validationMessage) {
                validationMessage.textContent = '';
            }
        } else {
            target.classList.remove('valid');
            target.classList.add('invalid');
            if (validationMessage) {
                validationMessage.textContent = target.title;
            }
        }

        // Validación adicional para la confirmación de contraseña en tiempo real
        if (target === confirmPasswordInput) {
            if (confirmPasswordInput.value !== passwordInput.value) {
                confirmPasswordInput.setCustomValidity('Las contraseñas no coinciden');
                confirmPasswordInput.classList.remove('valid');
                confirmPasswordInput.classList.add('invalid');
                confirmPasswordInput.nextElementSibling.textContent = confirmPasswordInput.validationMessage;
            } else {
                confirmPasswordInput.setCustomValidity('');
                confirmPasswordInput.classList.add('valid');
                confirmPasswordInput.classList.remove('invalid');
                confirmPasswordInput.nextElementSibling.textContent = '';
            }
        }
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        submitButton.disabled = true;
        spinnerContainer.classList.add('show');

        // Simulación de envío (reemplazar con tu lógica real)
        setTimeout(function() {
            spinnerContainer.classList.remove('show');
            modal.style.display = 'block';
            submitButton.disabled = false;
            form.reset();
            // Limpiar clases de validación
            form.querySelectorAll('.valid').forEach(input => input.classList.remove('valid'));
            form.querySelectorAll('.invalid').forEach(input => input.classList.remove('invalid'));
            form.querySelectorAll('.validation-message').forEach(msg => msg.textContent = '');
        }, 2000); // Simula un tiempo de carga de 2 segundos
    });

    closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});