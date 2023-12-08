//requerimos path para poder enviar los archivos html
const path = require('path');

//creamos el objeto controller
const registerController = {
    index: (req, res) => {
        res.render('register');
    }
}; 

//exportamos el objeto controller
module.exports = registerController;