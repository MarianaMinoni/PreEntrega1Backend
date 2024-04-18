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
   
} )



export default router