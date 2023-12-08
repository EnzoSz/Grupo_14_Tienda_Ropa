// Requerimos express y el método Router
const express = require('express');
const router = express.Router();

// Requerimos el controlador
const registerController = require('../controllers/registerController');

// Definimos la ruta del login
router.get('/', registerController.index);

// Exportamos la ruta
module.exports = router;