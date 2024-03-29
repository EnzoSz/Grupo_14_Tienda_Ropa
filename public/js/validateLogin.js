window.addEventListener('load', () => {
    //Capturamos el formulario mediante el id.
    let formulario = document.getElementById('form-login');
    
    //Capturamos los inputs mediante el id.
    let emailError = document.getElementById('errorEmail');
    let passwordError = document.getElementById('errorPassword');

    function checkErrorEmail(error) {
        emailError.innerHTML = `<p class='errorEmail'>${error.toUpperCase()}</p>`;
        emailError.style.color = 'red';
    }

    function checkErrorPassword(error) {
        passwordError.innerHTML = `<p class='errorPassword'>${error.toUpperCase()}</p>`;
        passwordError.style.color = 'red';
    }

    formulario.addEventListener('submit', (event) => {
        if(!formulario.email.value.trim()) {
            checkErrorEmail('Ingrese un email valido.');
            event.preventDefault();
        }

        if(formulario.password.value.trim().length <= 8) {
            checkErrorPassword('La contraseña debe tener al menos 8 caracteres.');
            event.preventDefault();
        }
    })

})
   