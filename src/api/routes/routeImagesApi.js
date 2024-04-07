const express = require('express');
const router = express.Router();
const imagesApiController = require('../controllers/controllerImagesApi');

router.get('/', imagesApiController.getAll);

router.get('/user/:img', imagesApiController.getImage);

module.exports = router;