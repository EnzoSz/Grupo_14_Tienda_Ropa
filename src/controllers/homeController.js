//requerimos path para poder enviar los archivos html
const DB = require("../database/models");

//creamos el objeto controller
const homeController = {
    //metodo index
    index: async (req, res) => {
        let productsList = await DB.Product.findAll({
           /*  include: [{ association: "images" },
            { association: "category" },
            { association: "brand" },
            { association: "colors" },
            { association: "sizes" },
            ], */
        });
        res.render("home", { products: productsList });
    }
};

//exportamos el objeto controller
module.exports = homeController;
