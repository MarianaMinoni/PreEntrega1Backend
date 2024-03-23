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
        let products = await productManager.getProducts();
        res.render("realtimeproducts", { products })

    }catch(err){
        console.log(err);
        res.status(500).send("Error interno del servidor");
    }
    
})



  
  router.post("/", (req, res)=>{
    const { title, description, code, price, stock, category, thumbnail } = req.body
       
    try {
        productManager.addProduct(title, description, code, price, stock, category, thumbnail)
        res.render("realTimeProducts", "Producto agregado correctamente.")
    } catch (err) {
        console.error(err);
        res.status(500).send("Error interno del servidor")
    }

})


    
   

export default router;