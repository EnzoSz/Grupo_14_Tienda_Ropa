//Requerimos express
const express = require("express");
//llamamos a la clase Router de express y la guardamos en una constante
const router = express.Router();

//requerimos el controlador
const userController = require("../controllers/userController");

//Definimos las rutas de users

router.get("/", userController.index);
router.get("/register", userController.register);
router.get("/login", userController.login);

//exportamos la ruta
module.exports = router;
