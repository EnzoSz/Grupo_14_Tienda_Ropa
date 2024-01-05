//requerimos path para poder enviar los archivos html
const path = require('path');

//creamos el objeto controller
const  uploadFormController = {
    index: (req, res) => {
        res.render('uploadForm');
    }
}; 

//exportamos el objeto controller
module.exports = uploadFormController;