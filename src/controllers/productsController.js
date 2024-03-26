const fs = require("fs");
const path = require("path");
// const productsFilePath = path.join(__dirname, "../data/products.json");
const { validationResult } = require("express-validator");
const db = require("../database/models");

const productsController = {
  index: async (req, res) => {
    try {
      //obtenemos el parametro dinamico de la url
      const category = req.params.category;
      //buscamos la categoria
      let categoryDB = null;
      if (category) {
        categoryDB = await db.Category.findOne({ where: { name: category } });
      }
      //verifacamos que la categoria exista
      if (!categoryDB) {
        const products = await db.Product.findAll({
          include: [
            { association: "category" },
            { association: "colors" },
            { association: "sizes" },
            { association: "images" },
          ],
        });
        return res.render("allProducts", { products, category: categoryDB });
      } else {
        const products = await db.Product.findAll({
          where: { category_id: categoryDB.id },
          include: [
            { association: "category" },
            { association: "colors" },
            { association: "sizes" },
            { association: "images" },
          ],
        });
        return res.render("allProducts", { products, category: categoryDB });
      }
      /* traemos los productos y le asociamos los atributos categoria, colores y talles para que se muestren en las tarjetas de productos */
      /*  const products = await db.Product.findAll({
            include:
            [
            {association: "category"},
            {association: "colors"},
            {association: "sizes"},
            {association: "images"}
            ]
            
        });
        console.log(products)
        // res.send(products);
         monstramos los productos con los atributos ya asociados 
        res.render("allProducts", {products}); 
        */
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  /* monstramos la vista del detalle del producto de la DB trayendolo con la PK y le asociamos los atributos */
  detail: async (req, res) => {
    try {
      const product = await db.Product.findByPk(req.params.id, {
        include: [
          { association: "brand" },
          { association: "category" },
          { association: "colors" },
          { association: "sizes" },
          { association: "images" },
        ],
      });
      /* res.send(product); */
      res.render("./productDetail", { product: product });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  /* traemos la vista para crear un nuevo producto y traemos los atributos del form de la DB para el formulario */
  create: async (req, res) => {
    try {
      const allColors = await db.Color.findAll();
      const allSizes = await db.Size.findAll();
      const allCategories = await db.Category.findAll();
      const allBrands = await db.Brand.findAll();
      return res.render("uploadProduct.ejs", {
        allColors,
        allSizes,
        allCategories,
        allBrands,
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  /* Creamos el producto nuevo asociando todos los atributos a la BD */
  processCreate: async (req, res) => {
    let error = validationResult(req);
    /* if(!error.isEmpty()){
          const allColors = await db.Color.findAll()
          const allSizes = await db.Size.findAll()
          const allCategories = await db.Category.findAll()
            return res.render("uploadProduct", {
                oldBody: req.body,
                error: error.mapped(),
                allColors, 
                allSizes, 
                allCategories   
            })
        };  */
    try {
      if (!error.isEmpty()) {
        const newProduct = await db.Product.create({
          name: req.body.name,
          price: req.body.price,
          description: req.body.description,
          amount: req.body.amount,
          category_id: req.body.category_id,
          color_id: req.body.color_id,
          size_id: req.body.size_id,
          brand_id: req.body.brand_id,
        });
        const newImage = await db.Image.create({
          image: req.file.filename,
          product_id: newProduct.id,
        });

        res.redirect("/detail/" + newProduct.id);
      } else {
        return res.render("uploadProduct.ejs", {
          oldBody: req.body,
          error: error.mapped(),
          allColors,
          allSizes,
          allCategories,
          allBrands,
        });
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  editProduct: async (req, res) => {
    try {
      const product = await db.Product.findByPk(req.params.id);
      const allColors = await db.Color.findAll();
      const allSizes = await db.Size.findAll();
      const allCategories = await db.Category.findAll();
      const allImages = await db.Image.findAll();
      res.render("./editProduct", {
        product,
        allColors,
        allSizes,
        allCategories,
        allImages,
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  processEdit: async (req, res) => {
    let error = validationResult(req);
    if (!error.isEmpty()) {
      const allColors = await db.Color.findAll();
      const allSizes = await db.Size.findAll();
      const allCategories = await db.Category.findAll();
      return res.render("./uploadProduct.ejs", {
        oldBody: req.body,
        error: error.mapped(),
        allColors,
        allSizes,
        allCategories,
      });
    }

    try {
      const product = await db.Product.findByPk(req.params.id);
      if (!product) {
        return res.status(404).send("Producto no encontrado");
      }
      const updateProducto = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        amount: req.body.amount,
        category_id: req.body.category_id || product.category_id,
        color_id: req.body.color_id || product.color_id,
        size_id: req.body.size_id || product.size_id,
        image_product: req.file ? req.file.filename : product.images,
      };

      await db.Product.update(updateProducto, {
        where: {
          id: req.params.id,
        },
      });

      res.redirect("/products/detail/" + req.params.id);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  /* Traemos la vista delete con PK para confirmar el softdelete del producto */
  delete: async (req, res) => {
    try {
      const product = await db.Product.findByPk(req.params.id);
      res.render("./delete", { product: product });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  destroy: async (req, res) => {
    try {
      await db.Product.destroy({
        where: { id: req.params.id },
      });
      res.redirect("/");
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  //metodo get, renderizamos todos los productos
  /* index: (req, res) => {
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

  }, */

  //metodo get, mostramos el detalle del producto
  /* detail: (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
    let product = products.find((product) => product.id == req.params.id);
    res.render("productDetail", { product: product });
  }, */
  //metodo get, mostramos formulario para crear un pructo
  /* create: (req, res) => {
    res.render("uploadProduct");
  }, */
  //metodo post, creamos un nuevo producto y lo guardamos
  /* processCreate: (req, res) => {
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
  //metodo get, mostramos formulario de edicion de un producto */
  /* editProduct: (req, res) => {
    let products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
    const productToEdit = products.find((product) => {
      return product.id == req.params.id;
    });
    res.render("editProduct", { product: productToEdit });
  }, */
  //metodo PUT, para actualizar la info del producto
  /* processEdit: (req, res) => {
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
  }, */
  /* detroy: (req, res) => {
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
  }, */
};
module.exports = productsController;
