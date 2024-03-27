//requerimos el fs
const fs = require("fs");
//requerimos el path
const path = require("path");
//obtenemos la base de datos
const db = require("../database/models");

async function userLoggedMiddleware(req, res, next) {
  res.locals.isLogged = false;
  //obtnemos los usuarios de la base de datos
  let usersDB = await db.User.findAll();
  //obtemos el email de la cookie
  let emailInCookie = req.cookies.userEmail;
  //verificamos que el email de la cookie exista en la base de datos
  let userWithEmail = usersDB.find((user) => user.dataValues.email === emailInCookie);
  // console.log(userWithEmail);
  //verificamos que el email de la cookie exista en el json
  /*let userWithEmail = users.find((user) => user.email === emailInCookie);
  */
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