//obtenemos la base de datos
const db = require("../database/models");

async function userLoggedMiddleware(req,res,next) {
      res.locals.isLogged = false;
      res.locals.isAdmin = false;
      
      let emailInCookie = req.cookies.userEmail;
  
      if (emailInCookie) {
        let userCookie = await db.User.findOne({ where: { email: emailInCookie } });
          if (userCookie.rol_id == 1) {
            req.session.userAdmin = userCookie;
          }else{
            req.session.userLogged = userCookie;
          }
      }
      if(req.session.userAdmin){
        res.locals.isAdmin = true;
        res.locals.userAdmin = req.session.userAdmin;
      }
      if(req.session.userLogged){
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
      }
      
      
    next();
}
module.exports = userLoggedMiddleware;

 

/* //requerimos el fs
const fs = require("fs");
//requerimos el path
const path = require("path");
//obtenemos el archivo JSON
// const usersFilePath = path.join(__dirname, "../data/users.json");
//obtenemos la base de datos
const db = require("../database/models");
async function userLoggedMiddleware(req, res, next) {
  res.locals.isLogged = false;
  //leemos el json
  // let users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
  //obtnemos los usuarios de la base de datos
  let usersDB = await db.User.findAll();
  // console.log(usersDB);
  //obtemos el email de la cookie
  let emailInCookie = req.cookies.userEmail;
  //verificamos que el email de la cookie exista en la base de datos
  let userWithEmail = usersDB.find((user) => user.dataValues.email === emailInCookie);
  // console.log(userWithEmail);
  //verificamos que el email de la cookie exista en el json
  /*let userWithEmail = users.find((user) => user.email === emailInCookie);
  */
/*   if (userWithEmail) {
    req.session.userLogged = userWithEmail;
  }
  if (req.session && req.session.userLogged) {
    res.locals.isLogged = true;
    //pasamos el usuario que viene de la sesion a una variable local
    res.locals.userLogged = req.session.userLogged;
  } 
  next(); */
 

