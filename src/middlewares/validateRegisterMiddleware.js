const path = require("path");
const {body} = require("express-validator");

module.exports = [
    body("name").notEmpty().withMessage("El nombre es obligatorio"),
  body("lastname").notEmpty().withMessage("El apellido es obligatorio"),
  body("nickname")
    .notEmpty()
    .withMessage("El nombre de usuario es obligatorio"),
  body("email")
    .notEmpty()
    .withMessage("El email es obligatorio")
    .bail()
    .isEmail()
    .withMessage("El email no es válido"),
  body("birthdate")
    .notEmpty()
    .withMessage("La fecha de nacimiento es obligatoria")
    .bail()
    .isISO8601()
    .withMessage("La fecha de nacimiento debe ser una fecha válida"),
  body("domicilio").notEmpty().withMessage("El domicilio es obligatorio"),
  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .bail()
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres")
    .matches(/^(?=.*[A-Z])/)
    .withMessage("La contraseña debe tener al menos una mayúscula"),
  body("imageProfile").custom((value, { req }) => {
    let file = req.file;
    let acceptedExtensions = [".jpg", ".jpeg", ".png", ".gif"];
    if (!file) {
      throw new Error("Tienes que subir una imagen");
    } else {
      let fileExtension = path.extname(file.originalname);
      if (!acceptedExtensions.includes(fileExtension)) {
        throw new Error(
          `Las extensiones de archivo permitidas son ${acceptedExtensions.join(
            ", "
          )}`
        );
      }
    }
    return true;
  }),
]