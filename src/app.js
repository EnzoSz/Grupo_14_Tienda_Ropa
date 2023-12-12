// Importamos el módulo express
const express = require('express');

// Importamos path
const path = require('path');

// Creamos una instancia de express
const app = express();

// configuramos el método override para capturar el método de formulario
const methodOverride = require('method-override');

// declaramos el motor de plantillas ejs
app.set('view engine', 'ejs');

// configuramos el directorio de vistas
app.set('views', path.resolve(__dirname, './views'));
// configuramos la app para capturar los datos del formulario
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// usar el método override
app.use(methodOverride('_method'));
// Importamos el módulo rutas
const homeRouter = require('./routes/homeRouter');
const loginRouter = require('./routes/loginRouter');
const registerRouter = require('./routes/registerRouter');
const productsRouter = require('./routes/productsRouter');

// Obtenemos la ruta absoluta del directorio public
const publicPath = path.resolve(__dirname, '../public');

// Le decimos a express que use el directorio public
app.use(express.static(publicPath));

// Usamos los enrutadores importados
app.use('/', homeRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/products', productsRouter);

// Levantamos el servidor en el puerto 3050
app.listen(3050, () => console.log('Servidor corriendo en http://localhost:3050'));
