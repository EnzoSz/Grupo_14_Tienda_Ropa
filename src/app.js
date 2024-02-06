// Importamos el módulo express
const express = require("express");
//requerimos el módulo session
const session = require("express-session");
//requerimos cookies
const cookies = require("cookie-parser");

// Importamos path
const path = require("path");

// Creamos una instancia de express
const app = express();

// configuramos el método override para capturar el método de formulario
const methodOverride = require("method-override");

// declaramos el motor de plantillas ejs
app.set("view engine", "ejs");

// configuramos el directorio de vistas
app.set("views", path.resolve(__dirname, "./views"));

//middlewares de aplicación
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');
// configuramos la sesión
app.use(session({
  secret: 'claveSecreta',
  resave: false,
  saveUninitialized: false
}));
// configuramos el middleware cookies
app.use(cookies());
// configuramos el middleware userLoggedMiddleware
app.use(userLoggedMiddleware);
// configuramos la app para capturar los datos del formulario
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// usar el método override
app.use(methodOverride("_method"));
// Importamos el módulo rutas
const homeRouter = require('./routes/homeRouter');
const productsRouter = require('./routes/productsRouter');
const carritoRouter = require('./routes/carritoRouter');
const userController = require("./routes/userRouter");


// Obtenemos la ruta absoluta del directorio public
const publicPath = path.resolve(__dirname, "../public");

// Le decimos a express que use el directorio public
app.use(express.static(publicPath));

// Usamos los enrutadores importados

app.use('/', homeRouter);
app.use('/user', userController);
app.use('/products', productsRouter);
app.use('/carrito', carritoRouter);



// Levantamos el servidor en el puerto 3050
app.listen(3050, () =>
  console.log("Servidor corriendo en http://localhost:3050")
);
