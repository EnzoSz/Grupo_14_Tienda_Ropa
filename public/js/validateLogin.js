window.addEventListener('load', () => {
    //Capturamos el formulario mediante el id.
    let formulario = document.querySelector('.form-login');
    
    //Capturamos los inputs mediante el id.
    let emailError = document.getElementById('errorEmail');
    let passwordError = document.getElementById('errorPassword');

    function checkErrorEmail(error) {
        //damos estilos al input
        let email = document.getElementById('email');
        email.classList.add('is-invalid');
        // añadimos una clase para darle estilos
        emailError.classList.add('text-danger');
        emailError.innerHTML = `${error}`;
        emailError.style.color = 'crimson';
    }

    function checkErrorPassword(error) {
        //damos estilos al input
        let password = document.getElementById('password');
        password.classList.add('is-invalid');
        // añadimos una clase para darle estilos
        passwordError.classList.add('text-danger');
        passwordError.innerHTML = `${error}`;
        passwordError.style.color = 'crimson';
    }

    formulario.addEventListener('submit', (event) => {
        if(!formulario.email.value.trim()) {
            checkErrorEmail('El email es obligatorio.');
            event.preventDefault();
        }

        if(formulario.password.value.trim().length < 8 && formulario.email.value.trim() != '') {
            checkErrorPassword('La contraseña debe tener al menos 8 caracteres.');
            event.preventDefault();
        }
    })

})
   