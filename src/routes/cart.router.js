import cartManager from "../dao/cartManager.js";
import express from "express";
const router = express.Router();

//TRAER TODOS LOS CARRITOS EXISTENTER // funciona ok

router.get("/", async (req, res) => {
  let cart = await cartManager.getProducts();
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
    const cartId = parseInt(req.params.cid);
    const cart = cartManager.cart.find((cart) => cart.id === cartId);

    if (!cart) {
      return res.status(404).send("Carrito inexistente");
    }

    res.send(cart.products);
  } catch (err) {
    res.status(500).send("Error interno del servidor");
  }
});

//funciona ok

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);
    const quantity = parseInt(req.body.quantity);

    if (isNaN(cartId) || isNaN(productId) || isNaN(quantity)) {
      return res.status(400).send("Todos los campos son requeridos.");
    }

    await cartManager.addToCart(cartId, productId, quantity);
    res.status(201).send("Producto agregado al carrito");
  } catch (err) {
    console.error(err);

    res.status(500).send("Error del servidor");
  }
});

export default router;
