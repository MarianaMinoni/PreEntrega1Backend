import { Router } from "express";
import {productsModel} from "../dao/models/productsModel.js";


const router = Router()

router.get("/", async (req,res) => {
const products = await productsModel.find()
res.status(201).send({status: "success", payload: products})
})


router.post("/", async(req,res) => {
    const {title, stock} = req.body
    try{
        const result = await productsModel.create({title, stock})
        res.status(201).send({status: "success", payload: result})

    } catch(err){
        res.status(400).send({status: "err"})
    }
    
})

router.put("/:id", async(req,res) => {
    const id = req.params.id
    const {title, stock} = req.body
    try{
        const result = await productsModel.updateOne({_id: id} , {title, stock})
        res.status(201).send(result)
    }
        catch(err){
            res.status(400).send({status: "err"})
    }
    
})

router.delete("/:id", async(req,res) => {
    const id = req.params.id
    try{
        const result = await productsModel.deleteOne({_id: id})
        res.status(201).send(result)
    } catch(err){
        res.status(400).send({status: "err"})
    }


    
})

router.get("/search", async (req, res) =>{
     try {
        const limit = parseInt(req.query.limit) || 10;
         const page = parseInt(req.query.page) || 1;
    
         const title = req.query.title;
         const description = req.query.description;
         const price = req.query.price;
         const code = req.query.code;
         const stock = req.query.stock;
         const thumbnail = req.query.thumbnail;
         const status = req.query.status;
         const category = req.query.category;
    
         const query = {};
    
         if (title) {
           query.$or = query.$or || [];
           query.$or.push({ title: { $eq: title } });
         }
    
         if (description) {
           query.$or = query.$or || [];
           query.$or.push({ description: { $eq: description } });
         }
    
         if (price) {
           query.$or = query.$or || [];
           query.$or.push({ price: { $eq: price } });
         }
    
         if (code) {
           query.$or = query.$or || [];
           query.$or.push({ code: { $eq: code } });
         }
    
         if (stock) {
           query.$or = query.$or || [];
           query.$or.push({ stock: { $eq: stock } });
         }
    
         if (thumbnail) {
           query.$or = query.$or || [];
           query.$or.push({ thumbnail: { $eq: thumbnail } });
         }
    
         if (status) {
           query.$or = query.$or || [];
           query.$or.push({ status: { $eq: status } });
         }
    
         if (category) {
           query.$or = query.$or || [];
           query.$or.push({ category: { $eq: category } });
         }
    
         let sortOptions = {};
    
         const sortOrder = req.query.sort === 'desc' ? -1 : 1;
         sortOptions = { price: sortOrder };
    
        //  const products = await productsModel.paginate(query, { page, limit, sort: sortOptions });
    
        //  const currentPath = `${req.headers.host}`;
        //  let prevLink = `${currentPath}/?page=${products.prevPage}`;
        //  let nextLink = `${currentPath}/?page=${products.nextPage}`;
    
        //  if (products.prevPage === null) {
        //    prevLink = null;
        //  }
    
        //  if (products.nextPage === null) {
        //    nextLink = null;
        //  }
    
        //  res.json({
        //    status: 'success',
        //    payload: products.docs,
        //    totalPages: products.totalPages,
        //    page: products.page,
        //    prevPage: products.prevPage,
        //    nextPage: products.nextPage,
        //    hasPrevPage: products.hasPrevPage,
        //    hasNextPage: products.hasNextPage,
        //    prevLink: prevLink,
        //    nextLink: nextLink
        //  });
       } catch (error) {
         res.status(500).json({
           status: 'error',
           error: error.message
         });
       }






























    //  try{
    //      const {title}  = req.query
    //      let query = {}
    //      if(title) query = {title}
    //      const result = await productsModel.find(query).explain("executionStats")

    //      res.status(200).send({
    //          status: "success", 
    //          payload: result
    //      })
    //  } catch(err){
    //      res.status(400).send({status: "err"})
        
               
    //  }
} )



export default router