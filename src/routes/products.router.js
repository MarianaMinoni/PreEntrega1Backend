import productManager from "../dao/productManagerFS.js";
import express from "express";

const router = express.Router();



//TRAER TODOS LOS PRODUCTOS // funciona ok
router.get("/", async (req, res) => {
    try{
        let products = await productManager.getProducts();
        res.send(products);

    }catch(err){
        console.log(err);
        res.status(500).send("Error interno del servidor");
    }
})

//TRAER POR ID ok // funciona ok
router.get("/:pid", async(req,res) => {
    let id = req.params.pid;
    try{
        const productXid = parseInt(id);
        if(productXid === null){
            res.send('No se ha otorgado un ID');
        } else{
            const productId = await productManager.getProductById(productXid);
            res.send(productId);

        } } catch(err){
            console.log(err);
            res.status(500).send('Error interno del servidor');
        }
 })

 //AGREGAR UN PRODUCTO OK // funciona ok

 router.post("/", (req, res)=>{
    const { title, description, code, price, stock, category, thumbnail } = req.body
       
    try {
        productManager.addProduct(title, description, code, price, stock, category, thumbnail)
        res.send("Producto agregado correctamente.")
    } catch (err) {
        console.error(err);
        res.status(500).send("Error interno del servidor")
    }

})
    

 // UPDATE UN PRODUCTO // funciona ok


router.put("/:pid", (req, res) => {
    let id = parseInt(req.params.pid);
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
    let id = parseInt(req.params.pid)

    try {
        productManager.deleteProduct(id)
        res.send("Producto  eliminado correctamente.")
    } catch (err) {
        console.error(err);
        res.status(500).send("Error interno del servidor.")
    }
});

export default router