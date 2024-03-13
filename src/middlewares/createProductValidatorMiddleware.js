const {body} = require("express-validator");
const path = require("path");

const createProductMiddleware = [


        body("name")
            .notEmpty().withMessage("Ingrese el nombre del producto").bail()
            .isLength({min:5}).withMessage("Debe tener minimo 5 caracteres")
            .isLength({max: 60}).withMessage('Debe tener maximo 20 caracteres'),
        body("description")
            .notEmpty().withMessage("Ingrese la descripcion del producto")
            .isLength({min:20}).withMessage("Debe tener minimo 20 caracteres")
            .isLength({max: 3500}).withMessage('Debe tener maximo 500 caracteres'),
        body("price")
            .notEmpty().withMessage("Ingrese el precio del producto"),
        body("amount")
            .notEmpty().withMessage("Ingrese la cantidad del producto")
            .isNumeric().withMessage('Por favor ingrese un valor numerico'),
        body("category")
            .notEmpty().withMessage("Ingrese la categoria del producto"),
        body("color")
            .notEmpty().withMessage("Ingrese el color del producto"),
        body("size")
            .notEmpty().withMessage("Ingrese el talle del producto"),
        body("image_product")
            .custom((value, {req}) => {

                let file = req.file;
                let acceptedExtensions = [".jpg", ".png", ".svg"];

                if(!file){
                    throw new Error("Debe subir la imagen del producto")
                }else {
                    let fileExtension = path.extname(file.originalname);
                    if (!acceptedExtensions.includes(fileExtension)) {
                        throw new Error("Las extensiones permitidas son .jpg, .png .svg")
                    }
                }

                return true;

            })

];


module.exports = createProductMiddleware