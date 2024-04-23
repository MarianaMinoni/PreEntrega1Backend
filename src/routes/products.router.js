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

// router.get("/search", async (req, res) => {


//    try{
//           const {title}  = req.query
//           let query = {}
//           if(title) query = {title}
//           const result = await productsModel.find(query).explain("executionStats")

//           res.status(200).send({
//              status: "success", 
//               payload: result
//           })
//       } catch(err){
//           res.status(400).send({
//             status: "error", 
//             payload: { 
//             error:e.message}
//           })
        
                
//       }
// });

export default router;
