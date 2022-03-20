// Función para decirle a bootstrap que aplique los estilos de validación
// a los forms que tengan la clase .form-validation

(function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.form-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(function (form) {
        form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }
  
            form.classList.add('was-validated')
        }, false)
    })
})()