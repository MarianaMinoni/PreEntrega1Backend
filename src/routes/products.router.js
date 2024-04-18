//import productManager from "../dao/productManagerFS.js";
import productManagerMDB from "../dao/productManagaerMDB.js";
import { productsModel } from "../dao/models/productsModel.js";
import express from "express";

const productManager = new productManagerMDB();

const router = express.Router();

//TRAER TODOS LOS PRODUCTOS // funciona ok
router.get("/", async (req, res) => {
  try {
    let products = await productManager.getProducts();
    res.send(products);
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

router.post("/", (req, res) => {
  const { title, description, code, price, stock, category, thumbnail } =
    req.body;

  try {
    productManager.addProduct(
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
    res.status(500).send("Error interno del servidor");
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

router.get("/search", async (req, res) => {
  const {
    _id,
    title,
    description,
    price,
    code,
    stock,
    thumbnail,
    status,
    category,
  } = req.query;

  //busco el id
  if (_id) {
    try {
      const product = await productsModel.findById(id);
      if (!product) {
        return res
          .status(404)
          .json({ status: "error", message: "Product not found" });
      }
      return res.status(200).json({ status: "success", payload: product });
    } catch (error) {
      return res.status(500).json({ status: "error", message: error.message });
    }
  }

  //
  try {
    const query = {};

    if (title) query.title = title;
    if (description) query.description = description;
    if (price) query.price = price;
    if (code) query.code = code;
    if (stock) query.stock = stock;
    if (thumbnail) query.thumbnail = thumbnail;
    if (status) query.status = status;
    if (category) query.category = category;

    const products = await productsModel.find(query);
    return res.status(200).json({ status: "success", payload: products });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
});

export default router;
