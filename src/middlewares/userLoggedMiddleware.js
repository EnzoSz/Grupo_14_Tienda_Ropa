//obtenemos la base de datos
const db = require("../database/models");

async function userLoggedMiddleware(req, res, next) {
  res.locals.isLogged = false;
  res.locals.isAdmin = false;

  let emailInCookie = req.cookies.userEmail;

  if (emailInCookie) {
    let userCookie = await db.User.findOne({ where: { email: emailInCookie } });
    if (userCookie) {
      res.locals.isLogged = true;
      req.session.userLogged = userCookie;
      res.locals.userLogged = userCookie;
    }
  }

  if (req.session.admin) {
    res.locals.isAdmin = true;
    res.locals.userAdmin = req.session.admin;
  }
  console.log(req.session);
  console.log(res.locals);

  next();
}
module.exports = userLoggedMiddleware;
/*  try {
     // Inicializa las variables locales para indicar si el usuario está logueado y si es un administrador
     res.locals.isLogged = false;
     res.locals.isAdmin = false;
     // Intenta obtener el valor de la cookie 'userCookie'
     const userCookie = req.cookies.userCookie;
      // Verifica si el usuario es un administrador basado en la sesión
     if (req.session.admin) {
       res.locals.isAdmin = true; // Si el usuario es un administrador, establece la variable local 'isAdmin' en verdadero
       res.locals.admin = req.session.admin; // Asigna el valor de la sesión 'admin' a la variable local 'admin'
     }
      // Verifica si existe una cookie 'userCookie'
     if (userCookie) {
       req.session.userLogged = userCookie; // Si existe, asigna el valor de la cookie a la sesión 'userLogged'
     }
     // Verifica si el usuario está logueado basado en la sesión
     if (req.session.userLogged) {
       res.locals.isLogged = true; // Si el usuario está logueado, establece la variable local 'isLogged' en verdadero
       res.locals.userLogged = req.session.userLogged;  // Asigna el valor de la sesión 'userLogged' a la variable local 'userLogged'
     }
     // Llama a la función 'next' para pasar el control al siguiente middleware o controlador
     next();
  } catch (error) {
     // Aquí puedes manejar el error, por ejemplo, registrándolo y enviando una respuesta de error
     console.error(error);
     res.status(500).send('Error interno del servidor');
  } */

/* //requerimos el fs
const fs = require("fs");
//requerimos el path
const path = require("path");
//obtenemos el archivo JSON
const usersFilePath = path.join(__dirname, "../data/users.json");
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
} */
