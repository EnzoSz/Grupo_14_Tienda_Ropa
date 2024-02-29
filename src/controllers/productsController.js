const fs = require("fs");
const path = require("path");
const productsFilePath = path.join(__dirname, "../data/products.json");
const Product = require('../database/models/Product.js');
const productsController = {
  //metodo get, renderizamos todos los productos
  index: (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
    res.render("allProducts", { products: products });
  },
  //metodo get, mostramos los productos de hombres, mujer y niño.
  hombre: (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
    let product = products.filter((product) => product.categoria == "hombre");
    res.render("productsHombre", { products: product});
  },

  'mujer': (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
    let product = products.filter((product) => product.categoria == "mujer");
    res.render("productsMujer", { products: product });
  },

  'kids': (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
    let product = products.filter((product) => product.categoria == "kids");
    res.render("productsKids", { products: product });
  },

  //metodo get, mostramos el detalle del producto
  detail: (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
    let product = products.find((product) => product.id == req.params.id);
    res.render("productDetail", { product: product });
  },
  //metodo get, mostramos formulario para crear un pructo
  create: (req, res) => {
    res.render("uploadProduct");
  },
  //metodo post, creamos un nuevo producto y lo guardamos
  processCreate: (req, res) => {
    //leemos el json
    let products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
    //verificamos que la imagen del producto exista
    if (req.file) {
      //creamos un objeto literal y guardamos dentro de el la info que viene del form
      const newProduct = {
        id: products[products.length - 1].id + 1,
        nombre: req.body.nombre,
        imagen: req.file.filename,
        precio: req.body.precio,
        categoria: req.body.categoria,
        descripcion: req.body.descripcion,
        talles: {
          talle: req.body.radio,
          stock: req.body.cantidad,
        },
      };
      //pusheamos el objeto literal al array
      products.push(newProduct);

      //sobreescribomos el archivo JSON
      fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));
      //mostramos al usuario un vista
      res.redirect("/products/detail/" + newProduct.id);
    } else {
      res.redirect("/products/create");
    }
  },
  //metodo get, mostramos formulario de edicion de un producto
  editProduct: (req, res) => {
    let products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
    const productToEdit = products.find((product) => {
      return product.id == req.params.id;
    });
    res.render("editProduct", { product: productToEdit });
  },
  //metodo PUT, para actualizar la info del producto
  processEdit: (req, res) => {
    //leemos el Json
    const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
    //buscamos el producto que tenemos que editar
    const id = req.params.id;
    let productToEdit = products.find((product) => product.id == id);
    //obtenemos el array cantidades de talles del body
    const talles = req.body.cantidades;

    //obtengo las claves del objeto talles
    let tallesObj = Object.keys(productToEdit.talles);
    // Asigna los valores del array talles que viene en el formulario en el objeto a editar
    tallesObj.forEach((talle, index) => {
      productToEdit.talles[talle] = parseInt(talles[index]);
    });
    //ahora editamos las demas propiedades del producto
    productToEdit.id = parseInt(productToEdit.id);
    productToEdit.nombre = req.body.nombre;
    productToEdit.imagen =
      req.file != undefined ? req.file.filename : productToEdit.imagen;
    productToEdit.precio = parseInt(req.body.precio);
    productToEdit.categoria = req.body.categoria;
    productToEdit.descripcion = req.body.descripcion;

    //buscamos la posicion del producto a editar
    let indice = products.findIndex((product) => product.id == id);
    //Reemplazamos el producto nuevo en el array de productos
    products[indice] = productToEdit;

    //sobre escribimos el json con el producto editado

    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));

    res.redirect("/products/detail/" + id);
  },
  detroy: (req, res) => {
    //leemos el json
    let products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

    //eliminamos
    products = products.filter((product) => {
      return product.id != req.params.id;
    });
    //sobreescribimos el json con el array sin el producto eliminado
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));

    //redireccionamos al home
    res.redirect("/");
  },
  //Obtener productos segun su categoria
  getProductsByCategory: async (categoria) => { 
    try {
      const products = await Product.filter({ categoria: categoria });
      return products;
    } catch (error) {
      console.error('Eror al obtener productos por categoria: ', error);
      throw new error('Error al obtener productos por categoria.');
    }
  }
};
module.exports = productsController;
