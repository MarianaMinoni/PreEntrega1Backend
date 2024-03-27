import express  from "express";
import productManager from "../managers/productManager.js";


const router = express.Router();

router.get("/", async (req, res) => {
    try{
        let products = await productManager.getProducts();
        res.render("home", { products })

    }catch(err){
        console.log(err);
        res.status(500).send("Error interno del servidor");
    }
    
})



router.get("/realtimeproducts", async (req, res) => {
    try{
        let realTimeProducts = await productManager.getProducts();
        res.render("realTimeProducts", {realTimeProducts});

    }catch(err){
        console.log(err);
        res.status(500).send("Error interno del servidor");
    }
    
  });
  




   

export default router;