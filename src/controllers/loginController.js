//requerimos path para poder enviar los archivos html
const path = require('path');

//creamos el objeto controller
const loginController = {
    index: (req, res) => {
        res.render('login');
    }
}; 

//exportamos el objeto controller
module.exports = loginController;