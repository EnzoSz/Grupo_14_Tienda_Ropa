const { body } = require("express-validator");
const path = require("path");

const validateRegisterMiddleware = [
  body("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .bail(),
  body("lastName")
    .notEmpty()
    .withMessage("El apellido es obligatorio")
    .bail(),
  body("phone")
    .notEmpty()
    .withMessage("El telefono es obligatorio")
    .bail(),
  body("email")
    .notEmpty()
    .withMessage("El email es obligatorio")
    .bail()
    .isEmail()
    .withMessage("El email no es válido")
    .bail(),
  body("birthdate")
    .notEmpty()
    .withMessage("La fecha de nacimiento es obligatoria")
    .bail()
    .isISO8601()
    .withMessage("La fecha de nacimiento debe ser una fecha válida")
    .bail(),
  body("address")
    .notEmpty()
    .withMessage("El domicilio es obligatorio")
    .bail(),
  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .bail()
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres")
    .bail()
    .matches(/^(?=.*[A-Z])/)
    .withMessage("La contraseña debe tener al menos una mayúscula")
    .bail(),
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
  }).bail()
];

module.exports = validateRegisterMiddleware;
