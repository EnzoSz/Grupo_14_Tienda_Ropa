//requerimos path para poder enviar los archivos html
const path = require('path');
const fs = require('fs');
const productsFilePath = path.join(__dirname, '../../public/assets/data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

//creamos el objeto controller
const homeController = {
    index: (req, res) => {
        res.render('home' , {products: products});
    }
}; 

//exportamos el objeto controller
module.exports = homeController;