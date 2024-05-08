window.addEventListener('load', () => {
	//Capturamos el formulario mediante el id.
	let formulario = document.getElementById('form-register');
	
	//Capturamos los inputs mediante el id.
	let name = document.getElementById('nameError');
	let lastname = document.getElementById('lastnameError');
	let email = document.getElementById('emailError');
	let image = document.getElementById('imageError');
	let password = document.getElementById('errorPassword');

	function checkErrorEmail(error) {
        email.innerHTML = `<p class='emailError'>${error.toUpperCase()}</p>`;
        email.style.color = 'red';
    }

    function checkErrorPassword(error) {
        password.innerHTML = `<p class='errorPassword'>${error.toUpperCase()}</p>`;
        password.style.color = 'red';
    }

	function checkErrorName(error) {
        name.innerHTML = `<p class='nameError'>${error.toUpperCase()}</p>`;
        name.style.color = 'red';
    }

    function checkErrorLastname(error) {
        lastname.innerHTML = `<p class='lastnameError'>${error.toUpperCase()}</p>`;
        lastname.style.color = 'red';
    }

	function validarCorreo(email) {
		const expresionCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return expresionCorreo.test(email);
	}

	formulario.addEventListener('submit', (event) => {

		//Validar nombre y apellido.
		if(formulario.name.value.trim().length < 2 || formulario.lastname.value.trim().length < 2){
			checkErrorName('El nombre debe contener al menos dos caracteres.');
			checkErrorLastname('El apellido debe contener al menos dos caracteres.');
			event.preventDefault();
		}

		//Validar correo electronico.
		if(!validarCorreo(email)){
			checkErrorEmail('El correo es invalido.');
			event.preventDefault();
		}

		//Validar contraseña.
		if(formulario.password.value.trim().length <= 8){
			checkErrorPassword('Por favor ingrese una contraseña que tenga al menos 8 caracteres.');
			event.preventDefault();
		}
	})
})