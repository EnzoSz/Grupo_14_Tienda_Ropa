// Requerimos express y el método Router
const express = require('express');
const router = express.Router();

// Requerimos el controlador
const homeController = require('../controllers/homeController');

// Definimos la ruta raíz
router.get('/', homeController.index);

// Exportamos la ruta
module.exports = router;