import { Router } from "express";
import { auth } from "../middlewares/auth.js";


const router = Router()


router.get("/", (req,res) =>{
    
console.log(req.session);
    if(req.session.counter){
        req.session.counter++
        res.send(`visitaste el sitio ${req.session.counter} veces`)
    } else{
        req.session.counter = 1 
        res.send("Bienvenido!!")
    }
})

router.get("/login", auth, (req,res) =>{
    res.send(`login success ${req.session.user}`)
    
})

    router.get("/logout", (req,res) =>{
    
      req.session.destroy( error => {
        if(!error) return res.send("logout success")
        res.send({
    status: "error",
            message: error.message
    
    })
      })
        })

 router.get("/private", (req,res) =>{

    res.send(`Login success${req.session.user}`)
          
   })
            
        
    

export default router