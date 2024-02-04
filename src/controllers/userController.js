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
    res.render("users");
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
      //creamos un objeto literal y guardamos dentro de el la info que viene del form
      if (req.file) {
        const newUser = {
          id: users[users.length - 1].id + 1,
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
        console.log(newUser);
      }
    } else {
      res.render("register", { errors: errors.mapped(), old: req.body });
    }
  },
  logout: (req, res) => {
    res.render("logout");
  },
  processLogout: (req, res) => {
    res.send(req.body);
  },
  login: (req, res) => {
    res.render("login");
  },
  processLogin: (req, res) => {
    res.send(req.body);
  },
};
//exportamos el objeto controlador
module.exports = userController;
