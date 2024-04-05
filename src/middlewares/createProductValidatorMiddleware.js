const { body } = require("express-validator");
const path = require("path");

const createProductValidatorMiddleware = [
  body("name")
    .notEmpty()
    .withMessage("Ingrese el nombre del producto")
    .bail()
    .isLength({ min: 5 })
    .withMessage("Debe tener minimo 5 caracteres")
    .isLength({ max: 60 })
    .withMessage("Debe tener maximo 20 caracteres"),
  body("description")
    .notEmpty()
    .withMessage("Ingrese la descripcion del producto")
    .bail()
    .isLength({ min: 20 })
    .withMessage("Debe tener minimo 20 caracteres")
    .bail()
    .isLength({ max: 3500 })
    .withMessage("Debe tener maximo 500 caracteres"),
  body("price")
    .notEmpty()
    .withMessage("Ingrese el precio del producto")
    .bail()
    .isInt({ min: 1 }),

  body("category_id").notEmpty().withMessage("Debe seleccionar una categoria"),
  body("brand_id").notEmpty().withMessage("Debe seleccionar una marca"),
  body("size.*").notEmpty().withMessage("Debe seleccionar un talle"),
  body("amount.*")
    .notEmpty()
    .withMessage("Ingrese la cantidad del producto")
    .bail()
    .isNumeric()
    .withMessage("Por favor ingrese un valor numerico"),
  body("color.*").notEmpty().withMessage("Debe seleccionar un color"),
  body("image_product").custom((value, { req }) => {
    let file = req.file;
    let acceptedExtensions = [".jpg", ".png", ".svg"];

    if (!file) {
      throw new Error("Debe subir la imagen del producto");
    } else {
      let fileExtension = path.extname(file.originalname);
      if (!acceptedExtensions.includes(fileExtension)) {
        throw new Error("Las extensiones permitidas son .jpg, .png .svg");
      }
    }

    return true;
  }),
];

module.exports = createProductValidatorMiddleware;