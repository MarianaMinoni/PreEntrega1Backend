

const express = require("express")
const app = express()

const routerProducts = require("./routes/products.router")
const routerCarts = require("./routes/cart.router")


app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/products", routerProducts);
app.use("/api/carts", routerCarts);



//reglas para ver si funciona ok

app.get("/ping", (req, res) => {
    res.send("pong")
})

app.listen(8080, () => console.log("servidor funcionando"))
