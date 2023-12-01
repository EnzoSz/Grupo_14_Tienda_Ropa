// Importamos el módulo express
const express = require('express');

// Importamos path
const path = require('path');

// Creamos una instancia de express
const app = express();

// Importamos el módulo rutas
const homeRouter = require('./routes/homeRouter');

// Obtenemos la ruta absoluta del directorio public
const publicPath = path.resolve(__dirname, '../public');

// Le decimos a express que use el directorio public
app.use(express.static(publicPath));

// Usamos los enrutadores importados
app.use('/', homeRouter);

// Levantamos el servidor en el puerto 3050
app.listen(3050, () => console.log('Servidor corriendo en http://localhost:3050'));
