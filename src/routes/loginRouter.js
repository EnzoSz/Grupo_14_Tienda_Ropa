// Requerimos express y el método Router
const express = require('express');
const router = express.Router();

// Requerimos el controlador
const loginController = require('../controllers/loginController');

// Definimos la ruta del login
router.get('/', loginController.index);

// Exportamos la ruta
module.exports = router;