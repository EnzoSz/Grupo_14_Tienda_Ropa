//requerimos el bcrypt
const bcrypt = require("bcryptjs");
//requerimos el fs
const fs = require("fs");
//requerimos path para poder enviar archivos
const path = require("path");
//obtenemos el archivo JSON
const usersFilePath = path.join(__dirname, "../data/users.json");
//requerimos express-validator
const { validationResult } = require("express-validator");
//requerimos los modelos
const db = require('../database/models');
const User = require("../database/models/User.js");
//creamos el objeto controller
const userController = {

 /*  index: (req, res) => {
    return res.render('')
  },
 */
  createView: (req, res) => {
    res.render("register");
  },

  processCreate: async (req, res) => {

    try {
       const idUserToEdit = await db.User.create({
        first_name: req.body.name,
        last_name: req.body.lastName,
        phone: req.body.phone,
        email: req.body.email,
        birth_date: req.body.birthdate,
        address: req.body.address,
        password: bcrypt.hashSync(req.body.password, 10),
        image_profile: path.parse(req.file.filename).name,
        rol_id: 1
     })
    //  console.log(req.file)
    res.redirect("./profile/" + idUserToEdit.id);

   } catch (error) {
     res.status(400).send(error.message);
   }
  },
    
  login: (req, res) => {
    res.render("login");
  },

  processLogin: async(req, res) => {
  
    //leemos el json
    // let users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
    try {
      //traemos el usuario que coincida con el email del form
      let userToLogin = await db.User.findOne({
        where: {
          email: req.body.email
        }
      });
      //creamos una varible error
      const errors = validationResult(req);
      // if (!errors.isEmpty()) {
      //   res.render('login', { errors: errors.mapped() })
      // }
      //verificamos que el usuario exista
      if (userToLogin) {
        //borramos la propiedad password
        delete userToLogin.password;
      }
      //guardamos el usuario en sesion
      req.session.userLogged = userToLogin;
      console.log(req.session.userLogged);
      //verificamos si vino rememberMe en el form
      if (req.body.rememberMe) {
        // creamos una cookie
        res.cookie("userEmail", req.body.email, { maxAge: 1000 * 60 * 5 }); // Cookie expira en 5 minutos
      }
      //sino hay errores redirigimos
      if (errors.isEmpty()){
        res.redirect('/')
      } else {
        res.render("login", { errors: errors.mapped(), old: req.body });
      }
      
    } catch (error) {
      console.log(error)
    }
   /*  //guardamos los datos del usuario que viene en el form en la variable user
    let userToLogin = users.find(
      (user) =>
        user.email == req.body.email &&
        bcrypt.compareSync(req.body.password, user.password)
    );
    //borramos la propiedad password
    //verificamos que el usuario exista
    if (userToLogin) {
      delete userToLogin.password;
    }
    //creamos una varible error
    let errors = validationResult(req);
    //guardamos el usuario en la sesion
    req.session.userLogged = userToLogin;
    //verificamos si vino rememberMe en el form
    if (req.body.rememberMe) {
      // Remember me logic here
      res.cookie("userEmail", req.body.email, { maxAge: 1000 * 60 * 5 }); // Cookie expira en 5 minutos
    }
    //si no hay errores
    if (errors.isEmpty()) {
      res.redirect("/");
    } else {
      //si hay errores
      res.render("login", { errors: errors.mapped(), old: req.body });
    } */
  },

  logout: (req, res) => {
    res.clearCookie("userEmail");
    req.session.destroy();
    return res.redirect("/");
  },

  profile: async (req,res) => {

    try {
      const idUserToEdit = await db.User.findByPk(req.params.id,
         {
           include:[
           {association: "rols"}
         ]
         })

         res.render("profileUser",{idUserToEdit});
       } catch (error) {
         res.status(500).send(error.message);
       }
  },

  upload: async (req,res) => {

    try {
      const idUserToEdit = await db.User.findByPk(req.params.id);
      
      res.render("profileUserEdit", {idUserToEdit});
      
    } catch (error) {
      res.status(500).send(error.message);
    }

  },

  processUpload: async (req,res) => {
    
    try {
      const user = await db.User.findByPk(req.params.id);
      if(!user){
        return res.status(404).send("Producto no encontrado");
      }
      const userUpload = {
        first_name: req.body.name,
        last_name: req.body.lastName,
        phone: req.body.phone,
        nick_name: req.body.nickname,
        email: req.body.email,
        birth_date: req.body.birthdate,
        address: req.body.address,
        image_profile: req.file ? req.file.filename : User.image_profile,
        
      };
      
      await db.User.update(userUpload,{
        where:{
          id: req.params.id,
        }
      });  
      
      res.redirect('/user/profile/' + req.params.id);
    } catch (error) {
      res.status(500).send(error.message);
    }
      
  },

  deleteUser: async (req,res) => {
    try {
      const user = await db.User.findByPk(req.params.id);
      if (user) {
        await db.User.destroy({
          where: {id: req.params.id}
        })
        res.redirect('/');
      }
      
    } catch (error) {
      res.status(500).send(error.message);
      }
  },
};
//exportamos el objeto controlador
module.exports = userController;
