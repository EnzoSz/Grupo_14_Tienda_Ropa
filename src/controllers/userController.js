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
    //leemos el json
    let users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
    //si no hay errores
    if (errors.isEmpty()) {
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
      let User = users.slice(-1)[0];
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
};
//exportamos el objeto controlador
module.exports = userController;
