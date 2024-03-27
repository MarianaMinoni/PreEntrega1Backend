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
    try {
        const Allproducts = await productManager.getProducts();
        res.render("realTimeProducts", { Allproducts });
    } catch (err) {
        console.log(err);
        res.status(500).send("Error interno del servidor");
    }
});


router.post("/realtimeproducts", async (req, res) => {
    const { title, description, code, price, stock, category } = req.body;
       
    try {    
        await productManager.addProduct({ title, description, code, price, stock,  category });
        const products = await productManager.getProducts();
        io.emit("newList", products); 
        res.send("Producto agregado correctamente.");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error interno del servidor");
    }
});

export default router;