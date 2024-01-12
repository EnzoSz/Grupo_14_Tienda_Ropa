const fs = require("fs");
const path = require("path");
const productsFilePath = path.join(__dirname, "../database/products.json");
const productsController = {
  //metodo get, renderizamos todos los productos
  index: (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
    res.render("allProducts", { products: products });
  },
  //metodo get, mostramos el detalle del producto
  detail: (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
    let product = products.find((product) => product.id == req.params.id);
    res.render("productDetail", { product: product });
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
    //leemos el JSON
    const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
    //buscamos el producto que tenemos que editar
    const id = req.params.id;
    let productToEdit = products.find((product) => product.id == id);
    //creamos el producto "nuevo" que va a reemplazar al anterior
    productToEdit = {
      id: productToEdit.id,
      nombre: req.body.nombre,
      imagen: productToEdit.imagen,
      precio: productToEdit.precio,
      categoria: req.body.categoria,
      descripcion: req.body.descripcion,
      talles: productToEdit.talles,
    };
    //buscamos la posicion del producto a editar
    let indice = products.findIndex((product) => product.id == id);

    //Reemplazamos el producto nuevo en el array de productos
    products[indice] = productToEdit;
    //sobreescribimos el json con el producto editado
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));
    res.redirect("/");
  },
};
module.exports = productsController;
