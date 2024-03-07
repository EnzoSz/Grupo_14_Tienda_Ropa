//requerimos path para poder enviar los archivos html
const path = require('path');
const fs = require('fs');
const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const db = require("../database/models");

//creamos el objeto controller
const homeController = {
    index: async(req,res) => {
        try {
            let productsList = await db.Product.findAll();
            res.render("home", {products: productsList});

                
        } catch (error) {
            res.status(500).send(error.message);
         }

    }






   /*  index: (req, res) => {
        res.render('home' , {products: products});
    } */
}; 

//exportamos el objeto controller
module.exports = homeController;