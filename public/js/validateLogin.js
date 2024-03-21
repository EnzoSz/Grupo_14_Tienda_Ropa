window.addEventListener('load', function(){
    
    //Capturar el formulario.
    let formulario = document.querySelector('.form-login');

    formulario.addEventListener('submit', function(evento){
        if(!validaciones(evento)){
            evento.preventDefault();
        }else{
            formulario.submit();
        }

        function validaciones(evento) {
            //Destructuring.
            let {email, password} = formulario.elements;
            let errores = [];

            //Validacion del email haciendo uso de expresiones regulares.
            let reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

            if(!reEmail.test(email.value)) {
                errores.push('El email es invalido...');
                email.classList.add('is-invalid');
            }else{
                email.classList.add('is-valid');
                email.classList.remove('is-invalid');
            }

            //Validacion de la contraseña haciendo uso de expresiones regulares.
            //Esta expresion regular valida como Minimo seis caracteres, al menos una letra y un numero:
            let rePassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
            if(!rePassword.test(password.value)){
                errores.push('La contraseña como minimos debe tener seis caracteres, al menos una letra y un numero.');
                password.classList.add('is-invalid');
            }else{
                password.classList.add('is-valid');
                password.classList.remove('is-invalid');
            }

            //Aqui enviamos todos los errores al usuario.
            let divErrores = document.getElementById('errores');
            divErrores.classList.add('alert-danger')
            if(errores.length > 0){
                evento.preventDefault();
                divErrores.innerHTML = '';
                for(let i = 0; i < errores.length; i++){
                    divErrores.innerHTML += `<li> ${errores[i]} </li>`
                }
                errores = [];
            }else{
                return true;
            }
        }
    })
})

