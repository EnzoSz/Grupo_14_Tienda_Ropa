const path= require("path");
const {body} = require("express-validator");

module.exports = [
    body('name')
        .notEmpty()
        .withMessage('Debes completar el campo'),
    body('lastName')
        .notEmpty()
        .withMessage('Debes poner tu apellido'),
    body('nickname')
        .notEmpty()
        .withMessage('El nombre de usuario es obligatorio'),
    body('email')
        .notEmpty()
        .withMessage('El email es obligatorio')
        .bail()
        .isEmail()
        .withMessage('El email no es valido'),
    body('birthdate')
        .notEmpty()
        .withMessage('La fecha de nacimiento es obligatoria')
        .bail()
        .isISO8601()
        .withMessage('La fecha de nacimiento debe ser una fecha válida'),
    body("domicilio")
        .notEmpty()
        .withMessage("El domicilio es obligatorio")
];