const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../../public/assets/data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const productsController = {
    index: (req, res) => {
        res.render('products', { products: products });
    }
};
module.exports = productsController;