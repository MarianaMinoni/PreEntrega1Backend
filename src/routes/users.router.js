import { Router } from "express";
import userModel from "../dao/models/userModel.js";
import { auth } from "../middlewares/auth.js";


const router = Router()


router.get("/", (req,res) =>{
 let username = req.session.user ? req.session.user : ""
    if(req.session.counter){
        req.session.counter++
        res.send(` ${username} visitaste el sitio ${req.session.counter} veces`)
    } else{
        req.session.counter = 1 
        res.send(`Bienvenido!!${username}`)
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
   


   //para la entrega session tenemos que tener login y register no más aca

//    router.post("/register" , async (req,res) => {

//   try{
  
//     req.session.failRegister = false
//      await userModel.create(req.body)
//      delete user.password
  
//      req.session.successRegister = true
//      res.redirect("/login")
 

//   }catch(e){
//     req.session.failRegister = true
//     res.redirect("/register")
//   }
//   })

router.post("/register", async (req, res) => {
    try {

        console.log("Datos recibidos del formulario:", req.body);
        
        req.session.failRegister = false;
        await userModel.create(req.body);
        req.session.successRegister = true;
        res.redirect("/login");
    } catch (e) {
        req.session.failRegister = true;
        res.redirect("/register");
    }
});


  router.post("/login", async (req,res) =>{
    
    try {
        const result = await userModel.findOne({email: req.body.email})
      
    
        if(!result) {
        req.session.failLogin = true    
        res.redirect("/login")
    }

        if(result.password !== req.body.password) {
            req.session.failLogin = true   
            res.send(`login success ${req.session.user}`)
           res.redirect("/login")
        }

        //si sale todo bien
        //elimino la contra para que no queden datos sensibles
        delete result.password

        //guardo el usuario en result
        req.session.user = result
       res.redirect("/api/products")




    } catch(e) {
        req.session.failLogin = true   
        res.redirect("/login")
    }
    
})


        
    

export default router