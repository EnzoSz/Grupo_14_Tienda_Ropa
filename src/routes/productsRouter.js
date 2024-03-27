const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const productsController = require("../controllers/productsController");
const createMiddleware = require('../middlewares/createProductValidatorMiddleware');

/* MULTER CONFIG */
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, path.join(__dirname, '../../public/assets/images/products'))
    },
    filename: (req, file, cb) =>{
        const newFilename = 'product-'+ Date.now()+ path.extname(file.originalname);
        cb(null, newFilename);
    }
});

const upload = multer({storage})



//Mostramos un producto
router.get("/detail/:id", productsController.detail);
//Creando ruta de categoria
/* router.get('/hombre', productsController.hombre);
router.get('/mujer', productsController.mujer);
router.get('/kids', productsController.kids);
*/
//Cargar un producto
router.get("/create", productsController.create);
router.post("/create", upload.single('image_product'),createMiddleware, productsController.processCreate);

//Mostramos todos los productos
router.get("/:category?", productsController.index);
//Editamos un producto
router.get("/edit/:id", productsController.editProduct);
router.put("/edit/:id", upload.single('image_product'),createMiddleware, productsController.processEdit);

//Eliminamos un producto
router.get("/delete/:id", productsController.delete);
router.delete("/delete/:id", productsController.destroy);





module.exports = router;
