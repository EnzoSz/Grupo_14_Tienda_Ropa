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
      // return res.send(product);
      res.render("./productDetail", { product: product});
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  /* traemos la vista para crear un nuevo producto y traemos los atributos del form de la DB para el formulario */
  create: async (req, res) => {
    try {
      // const allColors = await db.Color.findAll();
      // const allSizes = await db.Size.findAll();
      const allCategories = await db.Category.findAll();
      const allBrands = await db.Brand.findAll();
      return res.render("uploadProduct.ejs", {
        allCategories,
        allBrands,
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  /* Creamos el producto nuevo asociando todos los atributos a la BD */
  processCreate: async (req, res) => {
    try {
      let error = validationResult(req);
      
      if (error.isEmpty()) {
        const productDB = await db.Product.findOne({ where: { name: req.body.name } });
        if (productDB) {
          return res.status(400).send("El producto ya existe");
        }
        const newProduct = await db.Product.create({
          name: req.body.name,
          description: req.body.description,
          price: parseInt(req.body.price),
          category_id: parseInt(req.body.category_id),
          brand_id: parseInt(req.body.brand_id),
        });
        //establecer la asociacion con la marca
        if (req.body.brand_id) {
          const brand = await db.Brand.findByPk(req.body.brand_id);
          if (brand) {
            await newProduct.setBrand(parseInt(req.body.brand_id));
          }
        }
        //establecer la asociacion con la categoria
        if (req.body.category_id) {
          const category = await db.Category.findByPk(req.body.category_id);
          if (category) {
            await newProduct.setCategory(req.body.category_id);
          }
        }
        //establecer la asociacion con el color
        if (req.body.color && req.body.color.length > 0) {
          for (let i = 0; i < req.body.color.length; i++) {
            const color = await db.Color.findOne({ where: { name: req.body.color[i] } });
            if (color) {
              //crear una nueva entrada en la tabla intermedia product_color
              await db.Product_color.create({
                product_id: newProduct.id,
                color_id: color.id,
              });
            }
          } 
        }
        //establecer la asociacion con el talle y cantidades
        if (req.body.size && req.body.amount && req.body.size.length === req.body.amount.length) {
          for (let i = 0; i < req.body.size.length; i++) {
            const size = await db.Size.findOne({ where: { name: req.body.size[i] } });
            if (size) { 
              //crear una nueva entrada en la tabla intermedia produc_size
              await db.Product_size.create({
                product_id: newProduct.id,
                size_id: size.id || newSize.id,
                amount: req.body.amount[i],
              })
            } else {
              const newSize = await db.Size.create({ name: req.body.size[i] });
              await db.Product_size.create({
                product_id: newProduct.id,
                size_id: newSize.id,
                amount: req.body.amount[i],
              });
            }
          }
        }
        //establecer la asociacion con la imagen
        if (req.file) {
          const image = await db.Image.create({
            image: req.file.filename,
            product_id: newProduct.id,
          });
          
        } 
        // return res.json({ body:  req.body, file: req.file });
        return res.redirect("/products/detail/" + newProduct.id);
      } else {
        const allCategories = await db.Category.findAll();
        const allBrands = await db.Brand.findAll();
        
        return res.render("uploadProduct.ejs", {
          oldBody: req.body,
          error: error.mapped(),
          allCategories,
          allBrands,
        },
        console.log(error.mapped(), {body: req.body})
        );
        // return res.send(error);
      }
    } catch (error) {
      /* if (error.name === 'TypeError' && error.message.includes('findAll')) {
        // Manejar el error específico de findAll
        console.error('Error: No se pudo encontrar el método findAll. Detalles:', error);
        res.status(500).send('Error interno del servidor');
      } else {
        // Manejar otros errores
        console.error('Error al crear el producto:', error);
        res.status(500).send(error.message);
      }
      /* if (error.name === "SequelizeValidationError") {
        const errors = error.errors.map((err) => err.message);
        console.log(errors);
      } else {
        console.log(error);
      } */ 
      res.status(500).send(error.message);
    }
  },
  editProduct: async (req, res) => {
    try {
      const product = await db.Product.findOne({
        where: { id: req.params.id },
        include: [
          { association: "brand" },
          { association: "category" },
          { association: "colors" },
          { association: "sizes" },
          { association: "images" },
        ],
      });
      const product_size = await db.Product_size.findAll({
        where: { product_id: req.params.id }
      })
      // console.log(product);
      // return res.json({ product, product_size });    
      const allCategories = await db.Category.findAll();
      const allBrands = await db.Brand.findAll();
      res.render("./editProduct", {
        product,
        allCategories,
        allBrands,
        product_size
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  processEdit: async (req, res) => {
    let error = validationResult(req);
    if (!error.isEmpty()) {
      const allBrands = await db.Brand.findAll();
      const allColors = await db.Color.findAll();
      const allCategories = await db.Category.findAll();
      return res.render("./uploadProduct.ejs", {
        oldBody: req.body,
        error: error.mapped(),
        allColors,
        allCategories,
        allBrands
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
        category_id: req.body.category_id || product.category_id,
        brand_id: req.body.brand_id || product.brand_id,
      };
       //establecer la asociacion con el talle y cantidades
       if (req.body.size && req.body.amount && req.body.size.length === req.body.amount.length) {
        for (let i = 0; i < req.body.size.length; i++) {
          const size = await db.Size.findOne({ where: { name: req.body.size[i] } });
          if (size) { 
            //crear una nueva entrada en la tabla intermedia produc_size
            newProduct_size = {
              product_id: req.params.id,
              size_id: size.id || newSize.id,
              amount: req.body.amount[i],
            }
            await db.Product_size.update(newProduct_size, { where: { product_id: req.params.id } });
          } else {
            const newSize = await db.Size.create({ name: req.body.size[i] });
            await db.Product_size.create({
              product_id: req.params.id,
              size_id: newSize.id,
              amount: req.body.amount[i],
            });
          }
        }
      }
       //establecer la asociacion con el color
       if (req.body.color && req.body.color.length > 0) {
        for (let i = 0; i < req.body.color.length; i++) {
          const color = await db.Color.findOne({ where: { name: req.body.color[i] } });
          if (color) {
            //crear una nueva entrada en la tabla intermedia product_color
            await db.Product_color.create({
              product_id: req.params.id,
              color_id: color.id,
            });
          }
        } 
      }

      //actualizar la imagen del producto que viene del form
      if (req.file) {
        await db.Image.update({
          image: req.file.filename
        }, {
          where: {
            product_id: req.params.id
          }
        })
      } else {
        if (req.file == undefined) {
          const newImage = await db.Image.create({
            image: req.file.filename,
            product_id: req.params.id
          })
        }
      }
      // Actualizamos el producto
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
