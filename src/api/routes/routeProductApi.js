const express = require('express');
const router = express.Router();
const productApiController = require('../controllers/controllerProductApi');

router.get('/', productApiController.getAll);

router.get('/last', productApiController.getLast);

router.get('/detail/:id', productApiController.detail);

router.delete('/delete/:id', productApiController.delete);

module.exports = router;