//requerimos path para poder enviar los archivos html
const path = require('path');

//creamos el objeto controller
const  carritoController = {
    index: (req, res) => {
        res.render('carrito');
    }
}; 

//exportamos el objeto controller
module.exports = carritoController;