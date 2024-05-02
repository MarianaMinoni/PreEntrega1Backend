//import productManager from "../dao/productManagerFS.js";
import productManagerMDB from "../dao/productManagaerMDB.js";
import { productsModel } from "../dao/models/productsModel.js";
import  mongoosePaginate from "mongoose-paginate-v2";
import express from "express";

const productManager = new productManagerMDB();

const router = express.Router();

//TRAER TODOS LOS PRODUCTOS // funciona ok
//  router.get("/", async (req, res) => {
//    try {
//      let products = await productManager.getProducts();
//      res.send(products);
//    } catch (err) {
//      console.log(err);
//      res.status(500).send("Error interno del servidor");
//    }
//  });


//pagination

router.get("/", async (req, res) => {
  let page = parseInt(req.query.page) || 1;

  try {
    const options = {
      page: page,
      limit: 2,
      lean: true,
    };

    const result = await productsModel.paginate({}, options);

    const baseURL = "http://localhost:8080/api/products";
    const paginationData = {
      title: "productos",
      prevLink: result.hasPrevPage ? `${baseURL}?page=${result.prevPage}` : "",
      nextLink: result.hasNextPage ? `${baseURL}?page=${result.nextPage}` : "",
    };

    res.render("home", { products: result.docs, paginationData });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error interno del servidor");
  }
});
 



//TRAER POR ID ok // funciona ok
router.get("/:pid", async (req, res) => {
  let id = req.params.pid;
  try {
    //const productXid = parseInt(id);
    if (id === null) {
      res.send("No se ha otorgado un ID");
    } else {
      const productId = await productManager.getProductById(id);
      res.send(productId);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Error interno del servidor");
  }
});

//AGREGAR UN PRODUCTO OK // funciona ok

router.post("/", async (req, res) => {
  const { title, description, code, price, stock, category, thumbnail } =
    req.body;

  try {
    await productManager.addProduct(
      title,
      description,
      code,
      price,
      stock,
      category,
      thumbnail
    );
    res.send("Producto agregado correctamente.");
  } catch (err) {
    console.error(err);
    if (err.message === "Ya existe un producto con el mismo título") {
      res.status(400).json({ error: "Ya existe un producto con el mismo título" });
    } else {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
});

// UPDATE UN PRODUCTO // funciona ok

router.put("/:pid", (req, res) => {
  let id = req.params.pid;
  const changes = req.body;

  if (!changes) {
    return res.status(400).send("Se debe proporcionar al menos un cambio.");
  }
  try {
    productManager.updateProduct(id, changes);
    res.send("Producto actualizado correctamente.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error interno del servidor");
  }
});

//BORRAR UN PRODUCTO // funciona ok

router.delete("/:pid", (req, res) => {
  let id = req.params.pid;

  try {
    productManager.deleteProduct(id);
    res.send("Producto  eliminado correctamente.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error interno del servidor.");
  }
});



export default router;
