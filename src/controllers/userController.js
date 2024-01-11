//requerimos path para poder enviar archivos
const path = require("path");

//creamos el objeto controller
const userController = {
  index: (req, res) => {
    res.render("users");
  },
  register: (req, res) => {
    res.render("register");
  },
  login: (req, res) => {
    res.render("login");
  },
};
//exportamos el objeto controlador
module.exports = userController;
