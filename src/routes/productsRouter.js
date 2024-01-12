const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");

//Mostramos todos los productos
router.get("/", productsController.index);
//Mostramos un producto
router.get("/detail/:id", productsController.detail);

//Cargar un producto
router.get("/create", productsController.create);
router.post("/create", productsController.processCreate);

//Editamos un producto
router.get("/edit/:id", productsController.editProduct);
router.put("/edit/:id", productsController.processEdit);
module.exports = router;
