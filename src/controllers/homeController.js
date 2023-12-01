//requerimos path para poder enviar los archivos html
const path = require('path');

//creamos el objeto controller
const homeController = {
    index: (req, res) => {
        res.sendFile(path.resolve(__dirname, '../views/home.html'));
    }
}; 

//exportamos el objeto controller
module.exports = homeController;