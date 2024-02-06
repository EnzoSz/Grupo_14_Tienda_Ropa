//requerimos el fs
const fs = require("fs");
//requerimos el path
const path = require("path");
//obtenemos el archivo JSON
const usersFilePath = path.join(__dirname, "../database/users.json");
function userLoggedMiddleware(req, res, next) {
  res.locals.isLogged = false;
  //leemos el json
  let users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
  let emailInCookie = req.cookies.userEmail;
  //verificamos que el email de la cookie exista en el json
  let userWithEmail = users.find((user) => user.email === emailInCookie);
  if (userWithEmail) {
    req.session.userLogged = userWithEmail;
  }
  if (req.session && req.session.userLogged) {
    res.locals.isLogged = true;
    //pasamos el usuario que viene de la sesion a una variable local
    res.locals.userLogged = req.session.userLogged;
  }

  next();
}
module.exports = userLoggedMiddleware;
