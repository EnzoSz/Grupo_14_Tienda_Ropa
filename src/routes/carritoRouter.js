// Requerimos express y el método Router
const express = require('express');
const router = express.Router();

// Requerimos el controlador
const carritoController = require('../controllers/carritoController');

// Definimos la ruta del carrito
router.get('/', carritoController.index);

// Exportamos la ruta
module.exports = router;