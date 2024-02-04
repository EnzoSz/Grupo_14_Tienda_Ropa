//Requerimos express
const express = require("express");
//Requerimos multer
const multer = require("multer");
//Requerimos path
const path = require("path");
//llamamos a la clase Router de express y la guardamos en una constante
const router = express.Router();

//Requerimos express-validator
const { body } = require("express-validator");
//Validaciones
const validations = [
  body("name").notEmpty().withMessage("El nombre es obligatorio"),
  body("lastname").notEmpty().withMessage("El apellido es obligatorio"),
  body("nickname")
    .notEmpty()
    .withMessage("El nombre de usuario es obligatorio"),
  body("email")
    .notEmpty()
    .withMessage("El email es obligatorio")
    .bail()
    .isEmail()
    .withMessage("El email no es válido"),
  body("birthdate")
    .notEmpty()
    .withMessage("La fecha de nacimiento es obligatoria")
    .bail()
    .isISO8601()
    .withMessage("La fecha de nacimiento debe ser una fecha válida"),
  body("domicilio").notEmpty().withMessage("El domicilio es obligatorio"),
  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .bail()
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres")
    .matches(/^(?=.*[A-Z])/)
    .withMessage("La contraseña debe tener al menos una mayúscula"),
  body("imageProfile").custom((value, { req }) => {
    let file = req.file;
    let acceptedExtensions = [".jpg", ".jpeg", ".png", ".gif"];
    if (!file) {
      throw new Error("Tienes que subir una imagen");
    } else {
      let fileExtension = path.extname(file.originalname);
      if (!acceptedExtensions.includes(fileExtension)) {
        throw new Error(
          `Las extensiones de archivo permitidas son ${acceptedExtensions.join(
            ", "
          )}`
        );
      }
    }
    return true;
  }),
];

//requerimos el controlador
const userController = require("../controllers/userController");
//configuramos multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../public/assets/images/users"));
  },
  filename: (req, file, cb) => {
    const newFilename = "user-" + Date.now() + path.extname(file.originalname);
    cb(null, newFilename);
  },
});

const upload = multer({ storage });

//Definimos las rutas de users

router.get("/", userController.index);

//rutas de registro
router.get("/register", userController.register);
router.post(
  "/register",
  upload.single("imageProfile"),
  validations,
  userController.processRegister
);
//rutas de login
router.get("/login", userController.login);
router.post("/login", userController.processLogin);

//exportamos la ruta
module.exports = router;
