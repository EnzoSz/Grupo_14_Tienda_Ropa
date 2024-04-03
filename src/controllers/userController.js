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
//requerimos los modelos
const db = require("../database/models");
const User = require("../database/models/User.js");
const { log } = require("console");
//creamos el objeto controller
const userController = {
  /*  index: (req, res) => {
    return res.render('')
  },
 */
  createView: (req, res) => {
    res.render("register");
  },

  processCreate: async (req, res) => {
    try {
      const idUserToEdit = await db.User.create({
        first_name: req.body.name,
        last_name: req.body.lastName,
        phone: req.body.phone,
        nick_name: req.body.nickname,
        email: req.body.email,
        birth_date: req.body.birthdate,
        address: req.body.address,
        password: bcrypt.hashSync(req.body.password, 8),
        image_profile: req.file.filename,
        rol_id: 1,
      });

      res.redirect("./profile/" + idUserToEdit.id);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },

  login: (req, res) => {
    /* console.log(req.session); */
    res.render("login");
  },

  processLogin: async (req, res) => {
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
      });
      
    } catch (error) {
      // En caso de error, envía el error como respuesta.
      res.status(500).send(error.message);
    }
  }, 
  

  /*
      // Si no se encuentra el usuario, agrega un mensaje de error al objeto errors
      if (!findUser) {
        return res.render("login", {
          error: {
            email: {
              msg: "El mail no esta registrado",
            },
          },
          oldBody: req.body,
        });
      }
      // Verifica si la contraseña es valida, si no es valida agrega un mensaje de error
      let validPassword = await bcrypt.compare(
        req.body.password,
        findUser.password
      );
      if (!validPassword) {
        return res.render("login", {
          error: {
            password: {
              msg: "la contraseña no es valida",
            },
          },
          oldBody: req.body,
        });
      }
      // Si no hay errores, procede con el proceso de inicio de sesión.
      if (findUser && validPassword) {
        delete findUser.password; // Elimina la contraseña del objeto del usuario para no exponerla.
        if (findUser.rol_id == 2) {
          req.session.admin = findUser; // Asigna el usuario a la sesión si es administrador.
         
         } else {
          req.session.userLogged = findUser;
          // Asigna el usuario a la sesión si no es administrador.
         
         }
        // Si el usuario opta por recordar su correo electrónico, establece una cookie.
        if (req.body.rememberMe) {
          res.cookie("userEmail", findUser, { maxAge: 1000 * 60 * 5 });
        }
        // Redirige al usuario a su perfil.
        console.log(req.session);
        return res.redirect("./profile/" + findUser.id);
      }
    } catch (error) {
      // En caso de error, envía el error como respuesta.
      res.status(500).send(error.message);
    }
  },  */

  profile: async (req, res) => {
    try {
      const idUserToEdit = await db.User.findByPk(req.params.id, {
        include: [{ association: "rols" }],
      });

      res.render("profileUser", { idUserToEdit });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  upload: async (req, res) => {
    try {
      const idUserToEdit = await db.User.findByPk(req.params.id);

      res.render("profileUserEdit", { idUserToEdit });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  processUpload: async (req, res) => {
    try {
      const user = await db.User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).send("Producto no encontrado");
      }
      const userUpload = {
        first_name: req.body.name,
        last_name: req.body.lastName,
        phone: req.body.phone,
        nick_name: req.body.nickname,
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
