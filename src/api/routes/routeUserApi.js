const express = require('express');
const router = express.Router();
const userApiController = require('../controllers/controllerUserApi');

router.get('/', userApiController.getAll);
router.get('/last', userApiController.getLast);
router.get('/:id', userApiController.getByPk);
router.delete('/delete/:id', userApiController.delete);

module.exports = router;
