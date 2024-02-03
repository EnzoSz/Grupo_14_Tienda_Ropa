//Requerimos express
const express = require("express");
//Requerimos multer
const multer = require('multer');
//Requerimos path
const path = require('path');
//llamamos a la clase Router de express y la guardamos en una constante
const router = express.Router();

//requerimos el controlador
const userController = require("../controllers/userController");
//configuramos multer
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, path.join(__dirname, '../../public/assets/images/users'))
    },
    filename: (req, file, cb) =>{
        const newFilename = 'user-'+ Date.now()+ path.extname(file.originalname);
        cb(null, newFilename);
    }
});

const upload = multer({storage});

//Definimos las rutas de users

router.get("/", userController.index);

//rutas de registro
router.get("/register", userController.register);
router.post("/register",upload.single('image-profile') ,userController.processRegister);
//rutas de login
router.get("/login", userController.login);
router.post("/login", userController.processLogin);

//exportamos la ruta
module.exports = router;
