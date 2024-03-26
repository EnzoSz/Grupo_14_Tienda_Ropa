window.addEventListener('load', () => {
	//Capturamos el formulario mediante el id.
	let formulario = document.getElementById('form-register');
	
	//Capturamos los inputs mediante el id.
	let name = document.getElementById('nameError');
	let lastname = document.getElementById('lastnameError');
	let phone = document.getElementById('phoneError');
	let email = document.getElementById('emailError');
	let birthdate = document.getElementById('birthdateError');
	let domicilio = document.getElementById('domicilioError');
	let image = document.getElementById('imageError').value;
	let password = document.getElementById('errorPassword');

	function checkErrorEmail(error) {
        email.innerHTML = `<p class='emailError'>${error.toUpperCase()}</p>`;
        email.style.color = 'red';
    }

    function checkErrorPassword(error) {
        password.innerHTML = `<p class='errorPassword'>${error.toUpperCase()}</p>`;
        password.style.color = 'red';
    }

	function checkErrorPhone(error) {
        phone.innerHTML = `<p class='phoneError'>${error.toUpperCase()}</p>`;
        phone.style.color = 'red';
    }

    function checkErrorBirthdate(error) {
        birthdate.innerHTML = `<p class='birthdateError'>${error.toUpperCase()}</p>`;
        birthdate.style.color = 'red';
    }

	function checkErrorDomicilio(error) {
        domicilio.innerHTML = `<p class='domicilioError'>${error.toUpperCase()}</p>`;
        domicilio.style.color = 'red';
    }

    function checkErrorImage(error) {
        image.innerHTML = `<p class='imageError>${error.toUpperCase()}</p>`;
        image.style.color = 'red';
    }

	function checkErrorName(error) {
        name.innerHTML = `<p class='nameError'>${error.toUpperCase()}</p>`;
        name.style.color = 'red';
    }

    function checkErrorLastname(error) {
        lastname.innerHTML = `<p class='lastnameError'>${error.toUpperCase()}</p>`;
        lastname.style.color = 'red';
    }

	formulario.addEventListener('submit', (event) => {

		//Validar nombre y apellido.
		if(name.length < 2 || lastname.length < 2){
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
		if(password.length <= 8){
			checkErrorPassword('Por favor ingrese una contraseña que tenga al menos 8 caracteres.');
			event.preventDefault();
		}

		//Validar imagen
		const extensionesPermitidas = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
		if(!extensionesPermitidas.exec(image)) {
		 	checkErrorImage('Formato de archivo de imagen inválido. Por favor, sube un archivo JPG, JPEG, PNG o GIF.');
			event.preventDefault();
		}

		function validarCorreo(email) {
			const expresionCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			return expresionCorreo.test(email);
		}
	})
})