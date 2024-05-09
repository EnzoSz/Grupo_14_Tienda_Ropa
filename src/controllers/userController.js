//requerimos el bcrypt
const bcrypt = require("bcryptjs");
//requerimos path para poder enviar archivos
const path = require("path");
//requerimos express-validator
const { validationResult } = require("express-validator");
//requerimos los modelos
const db = require("../database/models");
//creamos el objeto controller
const userController = {
  //vista de registro
  createView: (req, res) => {
    res.render("register");
  },
  //creacion de usuario
  processCreate: async (req, res) => {
    let errors = validationResult(req);

    try {
      if (!errors.isEmpty()) {
        return res.render("register", {
          errors: errors.mapped(),
          old: req.body,
        });
      }
      const idUserToEdit = await db.User.create({
        first_name: req.body.name,
        last_name: req.body.lastName,
        phone: req.body.phone,
        email: req.body.email,
        birth_date: req.body.birthdate,
        address: req.body.address,
        password: bcrypt.hashSync(req.body.password, 10),
        image_profile: path.parse(req.file.filename).name,
        rol_id: 2,
      });
      res.redirect("./profile/" + idUserToEdit.id);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
  //vista de login
  login: (req, res) => {
    res.render("login");
  },

  //proceso de login
  processLogin: async (req, res) => {
    try {
      //creamos la variable error
      const error = validationResult(req);
      //verificamos si hay errores
      if (!error.isEmpty()) {
        return res.render("login", {
          errors: error.mapped(),
          old: req.body,
        });
      }
      //guardamos los datos del usuario que viene en el form en la variable userToLogin
      const userToLogin = await db.User.findOne({
        where: {
          email: req.body.email,
        },
      });
      //borramos la propiedad password
      if (userToLogin) {
        delete userToLogin.dataValues.password;
      }
      //preguntamos que rol tiene el usuario
      // console.log(userToLogin);

      if (userToLogin.rol_id === 1) {
        //guardamos el usuario en la sesion como admin
        req.session.userAdmin = userToLogin.dataValues;
      } else if (userToLogin.rol_id === 2) {
        //guardamos el usuario en la sesion como user
        req.session.userLogged = userToLogin.dataValues;
      }
      //verificamos si vino rememberMe en el form
      if (req.body.rememberMe) {
        // Remember me logic here
        res.cookie("userEmail", req.body.email, { maxAge: 1000 * 60 * 60 }); // Cookie expira en una hora
      }
      console.log(req.cookies.userEmail);
      //si no hay errores
      res.redirect("/user/profile/" + userToLogin.id);
    } catch (error) {
      // En caso de error, envía el error como respuesta.
      res.status(500).send(error.message);
    }
  },

  //vista de perfil
  profile: async (req, res) => {
    try {
      const idUserToEdit = await db.User.findByPk(req.params.id, {
        include: [{ association: "rols" },
        { association: "orders" },
        ],
      });

      res.render("profileUser", { idUserToEdit });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  //vista de editar perfil
  edit: async (req, res) => {
    try {
      const idUserToEdit = await db.User.findByPk(req.params.id);

      res.render("profileUserEdit", { idUserToEdit });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  //proceso de editar perfil
  processEdit: async (req, res) => {
    const errors = validationResult(req);
    try {
      if (!errors.isEmpty()) {
        return res.render("profileUserEdit", {
          errors: errors.mapped(),
          old: req.body,
        });
      }
      const user = await db.User.findByPk(req.params.id);
      
      const userUpload = {
        first_name: req.body.name,
        last_name: req.body.lastName,
        phone: req.body.phone,
        email: req.body.email,
        birth_date: req.body.birthdate,
        address: req.body.address,
        image_profile: req.file ? req.file.filename : User.image_profile,
      };

      await db.User.update(userUpload, {
        where: {
          id: req.params.id,
        },
      });

      res.redirect("/user/profile/" + req.params.id);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  
  //borrar usuario
  deleteUser: async (req, res) => {
    try {
      const user = await db.User.findByPk(req.params.id);
      if (user) {
        await db.User.destroy({
          where: { id: req.params.id },
        });
        res.redirect("/");
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
 
  //cerrar sesion
  logout: (req, res) => {
    res.clearCookie("userEmail");
    req.session.destroy();
    return res.redirect("/");
  },
};
//exportamos el objeto controlador
module.exports = userController;

/* processLogin: (req, res) => {
  
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
} */

/* 
const { email, password } = req.body;

    try {
      let user = await db.User.findOne({ where: { email } });
      if (user) {
        let validPassword = await bcrypt.compare(password, user.password);
        if (validPassword) {
          delete user.password;
          if(user.rol_id == 2){
            req.session.userAdmin = user;
          }else{
            req.session.userLogged = user;
          }

          if (req.body.rememberMe) {
            res.cookie("userEmail", email, { maxAge: 1000 * 60 * 30 });
          }

          return res.redirect("/user/profile/" + user.id);
        }else {
          return res.render("login", {
            error: {
              password: {
                msg: "La contraseña no es valida",
              },
            },
            oldBody: req.body,
          });
        }
      }
      return res.render("login", {
        error: {
          email: {
            msg: "El mail no esta registrado",
          },
        },
        oldBody: {email},
      }); */
