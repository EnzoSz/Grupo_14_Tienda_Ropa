const { body } = require("express-validator");
const path = require("path");
const bcrypt = require("bcryptjs");
const DB= require("../database/models");
const OP = DB.Sequelize.Op;
const validationsUserEditMiddleware = [
  body("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .bail(),
  body("lastName")
    .notEmpty()
    .withMessage("El apellido es obligatorio")
    .bail(),
  body("birthdate")
    .notEmpty()
    .withMessage("La fecha de nacimiento es obligatoria")
    .bail()
    .isISO8601()
    .withMessage("La fecha de nacimiento debe ser una fecha válida")
    .bail(),
  body("phone").notEmpty().withMessage("El telefono es obligatorio").bail(),
  body("email")
    .notEmpty()
    .withMessage("El email es obligatorio")
    .bail()
    .isEmail()
    .withMessage("El email no es válido")
    .bail(),
  body("address").notEmpty().withMessage("La dirección es obligatoria").bail(),
  body("imageProfile").custom((value, { req }) => {
    let file = req.file;
    let acceptedExtensions = [".jpg", ".jpeg", ".png", ".gif"];
    if (!file) {
      return true;
    }
    if (file !== null) {
      const fileExtension = path.extname(file.originalname);
      if (!acceptedExtensions.includes(fileExtension)) {
        throw new Error(
          "Las extensiones permitidas son .jpg, .jpeg, .png, .gif"
        );
      }
    }
    return true;
  }),
  body("password_actual")
  .custom(async (value, { req }) => {
    const password = req.body.password_actual;
    if (password) {
      if (password.length < 8) {
        throw new Error("La nueva contraseña debe tener al menos 8 caracteres");
        
      }
      if (!password.match(/^(?=.*[A-Z])/)) {
        throw new Error("La nueva contraseña debe tener al menos una mayúscula");
      }
    }
    return true;
  }),
  body("password_new")
    .custom((value, { req }) => {
      const password = req.body.password_new;
      if (password) {
        if (password.length < 8) {
          throw new Error("La nueva contraseña debe tener al menos 8 caracteres");
        };
        if (!password.match(/^(?=.*[A-Z])/)) {
          throw new Error("La nueva contraseña debe tener al menos una mayúscula");
        }
      }
      return true;
    }),
  body("password_confirm")
  .custom((value, { req }) => {
    const password = req.body.password_confirm;
    if (password) {
      if (password.length < 8) {
        throw new Error("La nueva contraseña debe tener al menos 8 caracteres");
      };
      if (!password.match(/^(?=.*[A-Z])/)) {
        throw new Error("La nueva contraseña debe tener al menos una mayúscula");
      }
    }
    return true;
  }),
];

module.exports = validationsUserEditMiddleware;