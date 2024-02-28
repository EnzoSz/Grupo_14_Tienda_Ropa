const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const productsController = require("../controllers/productsController");

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

//Mostramos todos los productos
router.get("/", productsController.index);
//Mostramos un producto
router.get("/detail/:id", productsController.detail);
//Creando ruta parametrizada
router.get('/products/:categoria?', (req, res) => {
    const categoria = req.params.categoria;

    productsController.getProductsByCategory(categoria)

    .then(products => {
        res.render('allProducts', {products: products}, {categoria: categoria})
    })

    .catch (error => {
        console.log('Error al obtener productos por categoria.', error);
        res.status(500).send('Error al obtener productos por categoria.')
    })
})

//Cargar un producto
router.get("/create", productsController.create);
router.post("/create", upload.single('imagenProducto'), productsController.processCreate);

//Editamos un producto
router.get("/edit/:id", productsController.editProduct);
router.put("/edit/:id", upload.single('imagenProducto'), productsController.processEdit);

//Eliminamos un producto
router.delete("/delete/:id", productsController.detroy);
module.exports = router;
