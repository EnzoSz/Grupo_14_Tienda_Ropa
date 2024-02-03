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
  processRegister: (req, res) => {
    res.send(req.body);
  },
  login: (req, res) => {
    res.render("login");
  },
  processLogin: (req, res) => {
    res.send(req.body);
  },
};
//exportamos el objeto controlador
module.exports = userController;
