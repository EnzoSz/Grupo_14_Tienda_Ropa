// Importamos el módulo express
const express = require("express");
//requerimos el módulo session
const session = require("express-session");
//requerimos cookies
const cookies = require("cookie-parser");
//requerimos cors
const cors = require("cors");

const bodyParser = require('body-parser');
// Importamos path
const path = require("path");
// Creamos una instancia de express
const app = express();
// configuramos el método override para capturar el método de formulario
const methodOverride = require("method-override");
//middlewares de aplicación
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');
// Obtenemos la ruta absoluta del directorio public
const publicPath = path.resolve(__dirname, "../public");


// Importamos el módulo rutas
const homeRouter = require('./routes/homeRouter');
const productsRouter = require('./routes/productsRouter');
const carritoRouter = require('./routes/carritoRouter');
const userController = require("./routes/userRouter");
const adminRouter = require("./routes/adminRouter");
const productApiRouter = require("./api/routes/routeProductApi");
const userApiRouter =  require("./api/routes/routeUserApi");
const imageApiRouter =  require("./api/routes/routeImagesApi");

// declaramos el motor de plantillas ejs
app.set("view engine", "ejs");
// configuramos el directorio de vistas
app.set("views", path.resolve(__dirname, "./views"));


// configuramos la app para capturar los datos del formulario
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// usar el método override
app.use(methodOverride("_method")); 
// configuramos la sesión
app.use(session({
  secret: 'claveSecreta',
  resave: false,
  saveUninitialized: false,
}));
// Configuramos cors para aceptar conexiones desde el puerto 3000
app.use(cors({ origin: "http://localhost:3001" }));
// Configuración del middleware body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// configuramos el middleware cookies
app.use(cookies());
// configuramos el middleware userLoggedMiddleware
app.use(userLoggedMiddleware);
// Le decimos a express que use el directorio public
app.use(express.static(publicPath));

// Usamos los enrutadores importados

app.use('/', homeRouter);
app.use('/user', userController);
app.use('/products', productsRouter);
app.use('/carrito', carritoRouter);
app.use('/admin', adminRouter);

// API Routes
app.use('/api-user', userApiRouter);
app.use('/api-products', productApiRouter);
app.use('/api-images', imageApiRouter);


app.use((req, res, next) => {
  res.status(404).render('error');
});

// Levantamos el servidor en el puerto 3050
app.listen(3000, () =>
  console.log("Servidor corriendo en http://localhost:3000")
);
