//requerimos path para poder enviar los archivos html
const path = require('path');

//creamos el objeto controller
const homeController = {
    index: (req, res) => {
        res.render('home');
    }
}; 

//exportamos el objeto controller
module.exports = homeController;