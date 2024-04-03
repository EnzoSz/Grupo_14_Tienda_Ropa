//Requerimos express
const express = require("express");
//llamamos a la clase Router de express y la guardamos en una constante
const router = express.Router();
//Requerimos path
const path = require("path");
const adminController = require('../controllers/adminController');
const adminMiddleware = require('../middlewares/adminMiddleware');


router.get("/products", adminMiddleware, adminController.productList);

router.get("/users", adminMiddleware, adminController.userList);



module.exports = router;