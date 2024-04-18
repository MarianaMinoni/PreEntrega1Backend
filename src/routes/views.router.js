import express from "express";
import productManager from "../dao/productManagaerMDB.js";

const router = express.Router();

//vista productos handlebars, sin socketIo
router.get("/", async (req, res) => {
  try {
    let products = await productManager.getProducts();
    res.render("home", { products });
  } catch (err) {
    res.status(500).send(`Error: ${err}`);
  }
});

router.get("/realtimeproducts", async (req, res) => {
  try {
    let products = await productManager.getProducts();

    res.render("realtimeproducts", { products });
  } catch (err) {
    res.status(500).send(`Error: ${err}`);
  }

  //acá deberia usar el socket.emit
});

export default router;
