import express from "express";
import { productsModel } from "../dao/models/productsModel.js";
import ProductManagerMDB from "../dao/productManagaerMDB.js";
import mongoose  from "mongoose";

const router = express.Router();

const productManager = new ProductManagerMDB();


router.get("/search", async (req, res) => {
  try {
    const { title, sortField, sortOrder, limit = 10, page = 1 } = req.query;
    
    // Construir el objeto de consulta
    let query = {};
    if (title) {
      query.title = title;
    }

    // Construir el objeto de ordenamiento
    let sort = {};
    if (sortField && sortOrder) {
      sort[sortField] = sortOrder === "asc" ? 1 : -1;
    }

    
    const offset = (page - 1) * limit;

    //  filtrado, ordenamiento, límite y paginación
    const result = await productsModel
      .find(query)
      .sort(sort)
      .limit(parseInt(limit))
      .skip(offset)
      .explain("executionStats")
    

    res.status(200).send({
      status: "success",
      payload: result,
    });
  } catch (err) {
    res.status(400).send({
      status: "error",
      payload: {
        error: err.message,
      },
    });
  }
});

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

 
});

router.get("/chat", (req,res) =>{
  res.render("chat", {
    style: "index.css"
  } )

})

router.get("/login", (req, res) => {

  res.render(
      'login',
      {
         
          failLogin: req.session.failLogin ?? false
      }
  )
});

router.get("/register", (req, res) => {

  res.render(
      'register',
      {
        
          failRegister: req.session.failRegister ?? false
      }
     
    )
});



export default router;
