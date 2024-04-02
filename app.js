import express from "express";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import __dirname from "./utils.js"
import routerProducts from "./src/routes/products.router.js";
import routerCarts from "./src/routes/cart.router.js";
import viewsRouter from "./src/routes/views.router.js";
import productManager from "./src/managers/productManager.js";


const app = express();
const port = 8080;

const httpServer = app.listen(port, () => console.log("servidor funcionando"));

const io = new Server(httpServer);


app.set("views", __dirname+"/src/views")
app.set("view engine", "handlebars")
app.use(express.static(__dirname+"/public"))
app.engine("handlebars", handlebars.engine());

// Use routers
app.use("/products", routerProducts);
app.use("/cart", routerCarts);
app.use("/", viewsRouter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", routerProducts);
app.use("/api/carts", routerCarts);

//reglas para ver si funciona ok
app.get("/ping", (req, res) => {
  res.send("pong");
});



io.on("connection", (socket) => {
   console.log("Nuevo cliente conectado:", socket.id)

   
   socket.on("newProduct", async (data) => {
    try {
        await productManager.addProduct(
            data.title,
            data.description,
            data.code,
            data.price,
            data.stock,
            data.category,
           
        );

        const products = await productManager.getProducts();
        io.emit("productListUpdated", products); // Emitir evento para actualizar la lista de productos en tiempo real
    } catch (err) {
        console.error(err);
        // Manejar el error adecuadamente
    }
});


    })