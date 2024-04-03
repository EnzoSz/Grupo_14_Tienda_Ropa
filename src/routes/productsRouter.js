const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer");
const productsController = require("../controllers/productsController");
const createMiddleware = require('../middlewares/createProductValidatorMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');


//Mostramos todos los productos
router.get("/", productsController.index);
//Mostramos un producto
router.get("/detail/:id", productsController.detail);
//Creando ruta de categoria
/* router.get('/hombre', productsController.hombre);
router.get('/mujer', productsController.mujer);
router.get('/kids', productsController.kids);
 */
//Cargar un producto
router.get("/create",adminMiddleware, productsController.create);
router.post("/create", upload.single('image_product'),createMiddleware, productsController.processCreate);

//Editamos un producto
router.get("/edit/:id",adminMiddleware, productsController.editProduct);
router.put("/edit/:id", upload.single('image_product'),createMiddleware, productsController.processEdit);

//Eliminamos un producto
router.get("/delete/:id",adminMiddleware, productsController.delete);
router.delete("/delete/:id", productsController.destroy);


module.exports = router;
