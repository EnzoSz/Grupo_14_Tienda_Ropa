// Importamos el módulo express
const express = require('express');
// Importamos path
const path = require('path');
// Creamos una instancia de express
const app = express();
// Obtenemos la ruta absoluta del directorio public
const publicPath = path.resolve(__dirname, '../public');
// Le decimos a express que use el directorio public
app.use(express.static(publicPath));
// Levantamos el servidor en el puerto 3050
app.listen(3050, () => console.log('Servidor corriendo en http://localhost:3050'));

// Definimos la ruta raíz
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/home.html'));
});