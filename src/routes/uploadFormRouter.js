// Requerimos express y el método Router
const express = require('express');
const router = express.Router();

// Requerimos el controlador
const uploadFormController = require('../controllers/uploadFormController');

// Definimos la ruta raíz
router.get('/', uploadFormController.index);

// Exportamos la ruta
module.exports = router;