//Requerimos express
const express = require("express");
//Requerimos multer
const multer = require("multer");
//Requerimos path
const path = require("path");
//llamamos a la clase Router de express y la guardamos en una constante
const router = express.Router();

//Middlewares
const validationsRegisterMiddleware = require("../middlewares/validateRegisterMiddleware");
const validationsLoginMiddleware = require("../middlewares/validateLoginMiddleware");
const guestMiddleware = require("../middlewares/guestMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const validationsEditProfileMiddleware = require("../middlewares/validateEditProfileMiddleware");
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

router.get("/", authMiddleware , userController.index);

//rutas de registro
router.get("/register",guestMiddleware, userController.register);
router.post(
  "/register",
  upload.single("imageProfile"),
  validationsRegisterMiddleware,
  userController.processRegister
);
//rutas de login
router.get("/login",guestMiddleware, userController.login);
router.post("/login",validationsLoginMiddleware , userController.processLogin);
//rutas de logout
router.get("/logout", userController.logout);
//rutas de profile
router.get("/profile/:id", userController.profileView);
//rutas de edit 
router.get("/profile/edit/:id",userController.profileEdition);
router.put(
  "/profile/edit/:id",
  upload.single("imageProfile"),
  //validationsEditProfileMiddleware,
  userController.profileEdit
);
//rutas de delete
router.delete("/delete/:id",userController.destroy);

//exportamos la ruta
module.exports = router;
