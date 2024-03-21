import express from "express";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import __dirname from "./utils.js"
import routerProducts from "./src/routes/products.router.js";
import routerCarts from "./src/routes/cart.router.js";
import viewsRouter from "./src/routes/views.router.js";



const app = express();

const httpServer = app.listen(8080, () => console.log("servidor funcionando"));

const socketServer = new Server(httpServer);


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


socketServer.on("connection", (socket) => {
  console.log("Nuevo cliente conectado:", socket.id);
});




