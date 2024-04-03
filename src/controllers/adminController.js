//requerimos el fs
const fs = require("fs");
//requerimos path para poder enviar archivos
const path = require("path");
//obtenemos el archivo JSON
const usersFilePath = path.join(__dirname, "../data/users.json");
//requerimos express-validator
const { validationResult } = require("express-validator");
//requerimos los modelos
const db = require("../database/models");
const User = require("../database/models/User.js");

const adminController = {


  productList: async (req, res) => {
    try {
      /* traemos los productos y le asociamos los atributos categoria, colores y talles para que se muestren en las tarjetas de productos */
      const product = await db.Product.findAll({
        include: [
          { association: "category" },
          { association: "colors" },
          { association: "sizes" },
          { association: "images" },
        ],
      });
   
      res.render("./admin/productsList", { products: product });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  userList: async (req, res) => {
    try {

      const users = await db.User.findAll({
        where: { rol_id: 1 }
      });
      console.log(users);
      res.render("./admin/userList", { users: users });
    }catch (error) {
      res.status(500).send(error.message);
    }
      
  }




  
};
module.exports = adminController;
