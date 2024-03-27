//obtenemos la base de datos
const db = require("../database/models");

async function authMiddleware(res,req,next) {
    console.log(req.cookies)
    //obtnemos los usuarios de la base de datos
let usersDB = await db.User.findAll();
//obtemos el email de la cookie
let emailInCookie = req.cookies.userEmail;

//verificamos que el email de la cookie exista en la base de datos
let userWithEmail = usersDB.find((user) => user.dataValues.email === emailInCookie);
console.log(userWithEmail);

if (userWithEmail) {
  req.session.userLogged = userWithEmail;
} else {
    res.redirect("/profile")
    
}
/* if (req.session && req.session.userLogged) {
  res.locals.isLogged = true;
  //pasamos el usuario que viene de la sesion a una variable local
  res.locals.userLogged = req.session.userLogged;
}  */
next();
    
}


module.exports = authMiddleware;
    

/* const { body } = require("express-validator");
const path = require("path");
// const fs = require("fs");
// const usersFilePath = path.join(__dirname, "../data/users.json");
const bcrypt = require("bcryptjs");
//traemos la base de datos

module.exports = [
  body("email")
    .notEmpty()
    .withMessage("El email es obligatorio")
    .bail()
    .isEmail()
    .withMessage("El email no es válido")
    .custom(async (value, { req }) => {
      //validamos que el email exista
      //traemos todos los usuarios con try catch
      let user = await db.User.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (!user) {
        throw new Error("El email no existe");
      } else {
        return true;
      }
    })
    .bail(),
  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .bail()
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres")
    .matches(/^(?=.*[A-Z])/)
    .withMessage("La contraseña debe tener al menos una mayúscula")
    .custom(async (value, { req }) => {
      try {
        let users = await db.User.findAll();
        let userInDB = users.find((user) => user.email == req.body.email);
        if (!bcrypt.compareSync(req.body.password, userInDB.password)) {
          throw new Error("La contraseña es incorrecta");
        } else {
          return true;
        }
      } catch (error) {
        throw new Error("La contraseña es incorrecta");
      }
    }),
]; */