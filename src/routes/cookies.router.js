import { Router } from "express";

const router = Router()

router.get("signed/setCookies", (req, res) =>{
    res.cookie(
        "MarianCookie",
        "cookie firmada",
        {maxAge: 500000, signed : true}
    ).send("Cookie creada")
})

 router.get("signed/getcookies" , (req,res) =>{
     console.log(req.signedCookies)
      res.send({ cookies : req.signedCookies
  })
 })

  router.get("/delete" , (req,res) =>{
      res.clearCookie("MarianCookie").send("borrada con exito")
      })


    export default router