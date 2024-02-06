const { body } = require("express-validator");
const path = require("path");
const fs = require("fs");
const usersFilePath = path.join(__dirname, "../database/users.json");
const bcrypt = require("bcryptjs");
module.exports = [
  body("email")
    .notEmpty()
    .withMessage("El email es obligatorio")
    .bail()
    .isEmail()
    .withMessage("El email no es válido")
    .custom((value, { req }) => {
      let users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
      let userInDB = users.find((user) => user.email == req.body.email);
      if (!userInDB) {
        throw new Error("El email no existe");
      }
      return true;
    }),
  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .bail()
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres")
    .matches(/^(?=.*[A-Z])/)
    .withMessage("La contraseña debe tener al menos una mayúscula").custom((value, { req }) => {
      let users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
      let userInDB = users.find((user) => user.email == req.body.email);
      if (!bcrypt.compareSync(req.body.password, userInDB.password)) {
        throw new Error("La contraseña es incorrecta");
      }
      return true;
    })
];
