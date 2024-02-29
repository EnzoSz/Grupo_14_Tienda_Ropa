//requerimos el bcrypt
const bcrypt = require("bcryptjs");
//requerimos el fs
const fs = require("fs");
//requerimos path para poder enviar archivos
const path = require("path");
//obtenemos el archivo JSON
const usersFilePath = path.join(__dirname, "../data/users.json");
//requerimos express-validator
const { validationResult } = require("express-validator");
const { log } = require("console");
//requerimos los modelos
const UserDb = require('../database/models');
//creamos el objeto controller
const userController = {

  index: (req, res) => {
    return res.render('login')
  },

  createView: (req, res) => {
    res.render("register");
  },

  create: (req, res) => {
    
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

  profile: (req,res) => {

    let singleUser = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

    res.render("profileUser",{singleUser})
  },

  profileView:(req,res) => {

    let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
    let id = req.params.id
    const idUserToEdit = users.find((user) => {
      return user.id == id
    })

    console.log()

    res.render("profileUser",{idUserToEdit})
  },

  profileEdition:(req,res) => {

    let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
    let id = req.params.id
    const idUserToEdit = users.find((user) => {
      return user.id == id
    })

    res.render("profileUserEdit",{idUserToEdit})
  },

  profileEdit: (req,res) => {
    const validationErrors = validationResult(req);
    let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
    let id = req.params.id
    const idUserToEdit = users.find((user) => {
      return user.id == id
    });

    if (validationErrors.errors.length > 0) {
      res.render("profileUserEdit",{idUserToEdit}, {
        errorsObjeto: validationErrors.mapped(),
        oldData: req.body
      })
    } else {  
        userToEdit = {
        id: parseInt(idUserToEdit.id),
        nombre: req.body.name,
        apellido: req.body.lastName,
        nombreUsuario: req.body.nickname,
        email: req.body.email,
        fechaNacimiento: req.body.birthdate,
        domicilio: req.body.domicilio,
        password: idUserToEdit.password,
        foto: req.file != undefined ? req.file.filename : idUserToEdit.foto
        }
      
        let indice = users.findIndex(user => {
          return user.id == id
        });

        users[indice] = userToEdit;

        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, " "));
        res.redirect('/')
      }  
      
  },

  destroy: (req,res) => {

    let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
    let id = req.params.id

    users = users.filter(user => {
      return user.id != id
    })

    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, " "));
    
    res.redirect('/')
  }
};
//exportamos el objeto controlador
module.exports = userController;
