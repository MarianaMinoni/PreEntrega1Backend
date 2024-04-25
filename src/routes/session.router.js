import { Router } from "express";


const router = Router()


router.get("/", (req,res) =>{
    res.send("hola desde session")
})

export default router