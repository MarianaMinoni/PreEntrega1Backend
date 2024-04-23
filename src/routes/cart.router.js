import cartManagerMDB from "../dao/cartManagerMDB.js";
import express from "express";
const router = express.Router();

const cartManager = new cartManagerMDB();

//TRAER TODOS LOS CARRITOS EXISTENTER // funciona ok

router.get("/", async (req, res) => {
  let cart = await cartManager.getCart();
  res.status(200).send(cart);
});

// CREAR CARRITO // funciona ok

router.post("/", async (req, res) => {
  try {
    const cart = await cartManager.createCart();
    res.status(201).send(cart);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error interno del servidor");
  }
});

// TRAER EL CARRITO CON EL ID INDICADO // funciona ok

router.get("/:cid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    console.log(req.params.cid);
    const cart = await cartManager.getCartById(cartId);

    if (!cart) {
      return res.status(404).send("Carrito inexistente");
    } else {
      return res.status(200).send(cart);
    }
  } catch (err) {
    res.status(500).send("Error interno del servidor");
  }
});

//funciona ok

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = parseInt(req.body.quantity);

    if (!cartId || !productId || !quantity) {
      return res.status(400).send("Todos los campos son requeridos.");
    }

    await cartManager.addToCart(cartId, productId, quantity)
    res.status(201).send("Producto agregado al carrito")
  } catch (err) {
    console.error(err);

    res.status(500).send("Error del servidor")
  }
});



  router.delete("/:cid/products/:pid", async (req, res) => {
    try {
      const cartId = req.params.cid
      const productId = req.params.pid
  
    
      if (!cartId || !productId) {
        return res.status(400).send("El id del producto y del carrito son obligatorios")
      }
  
   
      await cartManager.removeProductFromCart(cartId, productId)
  
      res.status(200).send("Producto eliminado del carrito")
    } catch (err) {
      console.error(err);
      res.status(500).send("Error del servidor")
    }
  });
  




export default router;
