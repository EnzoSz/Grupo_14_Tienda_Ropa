//requerimos el bcrypt
const bcrypt = require("bcryptjs");
//requerimos el fs
const fs = require("fs");
//requerimos path para poder enviar archivos
const path = require("path");
//obtenemos el archivo JSON
const usersFilePath = path.join(__dirname, "../database/users.json");
//requerimos express-validator
const { validationResult } = require("express-validator");
const { log } = require("console");
//creamos el objeto controller
const userController = {
  index: (req, res) => {
    console.log(req.cookies.userEmail);
    res.render("profileUser");
  },
  register: (req, res) => {
    res.render("register");
  },
  processRegister: (req, res) => {
    //creamos una varible error
    let errors = validationResult(req);
    //si no hay errores
    if (errors.isEmpty()) {
      //leemos el json
      let users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
      //verificamos que el email no exista
      let userInDB = users.find((user) => user.email == req.body.email);
      if (userInDB) {
        return res.render("register", {
          errors: {
            email: {
              msg: "Este email ya esta registrado",
            },
          },
          old: req.body,
        });
      }
      //generamos un id
      let User = users.pop();
      let idUser;
      if (User) {
        idUser = User.id + 1;
      } else {
        idUser = 1;
      }
      //creamos un objeto literal y guardamos dentro de el la info que viene del form
      const newUser = {
        id: idUser,
        nombre: req.body.name,
        apellido: req.body.lastname,
        nombreUsuario: req.body.nickname,
        email: req.body.email,
        fechaNacimiento: req.body.birthdate,
        domicilio: req.body.domicilio,
        password: bcrypt.hashSync(req.body.password, 10),
        foto: req.file.filename,
      };
      //pusheamos el objeto literal al array
      users.push(newUser);
      //sobreescribomos el archivo JSON
      fs.writeFileSync(usersFilePath, JSON.stringify(users, null, " "));
      res.redirect("/");
    } else {
      res.render("register", { errors: errors.mapped(), old: req.body });
    }
  },
  login: (req, res) => {
    res.render("login");
  },
  processLogin: (req, res) => {
    //leemos el json
    let users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
    //guardamos los datos del usuario que viene en el form en la variable user
    let userToLogin = users.find(
      (user) =>
        user.email == req.body.email &&
        bcrypt.compareSync(req.body.password, user.password)
    );
    //borramos la propiedad password
    //verificamos que el usuario exista
    if (userToLogin) {
      delete userToLogin.password;
    }
    //creamos una varible error
    let errors = validationResult(req);
    //guardamos el usuario en la sesion
    req.session.userLogged = userToLogin;
    //verificamos si vino rememberMe en el form
    if (req.body.rememberMe) {
      // Remember me logic here
      res.cookie("userEmail", req.body.email, { maxAge: 1000 * 60 * 5 }); // Cookie expira en 5 minutos
    }
    //si no hay errores
    if (errors.isEmpty()) {
      res.redirect("/");
    } else {
      //si hay errores
      res.render("login", { errors: errors.mapped(), old: req.body });
    }
  },
  logout: (req, res) => {
    res.clearCookie("userEmail");
    req.session.destroy();
    return res.redirect("/");
  },
  processEdit: (req, res) => {
    res.send(req.body);
  },
  profile: (req,res) => {

    let users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

    const singleUser = users[0]

    res.render("profileUser",{singleUser})
  },
  profileEdition:(req,res) => {
    let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));

    const idUserToEdit = users.find(users => {
      return users.id == req.params.id
    })

    res.render("profileUserEdit",{idUserToEdit})
  },
  profileEdit: (req,res) => {
  
		const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

		// buscamos el usuario que tenemos que editar
		const id = req.params.id;
		let userToEdit = users.find(users => users.id == id);
    
    console.log(userToEdit);
		
		// Creamos el usuario "nuevo" que va a reemplazar al anterior
		/* userToEdit = {
			id: userToEdit.id,
			nombre: req.body.nombre,
			apellido: req.body.apellido,
			nombreUsuario: req.body.nombreUsuario,
			email: req.body.email,
			fechaNacimiento: req.body.fechaNacimiento,
      domicilio: req.body.domicilio
		} */

    console.log(req.body);

    userToEdit.id = parseInt(userToEdit.id);
    userToEdit.nombre = req.body.nombre;
    userToEdit.apellido = req.body.apellido;
    userToEdit.nombreUsuario = req.body.nombreUsuario;
    userToEdit.email = req.body.email;
    userToEdit.fechaNacimiento = req.body.fechaNacimiento
    userToEdit.domicilio = req.body.domicilio

    console.log(userToEdit);

		// Buscamos la posicion del producto a editar

    let indice = users.findIndex(users => {
      return users.id == id
    })
		// Reemplazamos
		users[indice] = userToEdit;

		fs.writeFileSync(usersFilePath, JSON.stringify(users, null, " "));
		res.redirect("/")
  }
};
//exportamos el objeto controlador
module.exports = userController;
