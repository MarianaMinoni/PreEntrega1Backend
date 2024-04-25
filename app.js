import express from "express";
import { Server } from "socket.io";
import mongoose from "mongoose";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import routerProducts from "./src/routes/products.router.js";
import routerCarts from "./src/routes/cart.router.js";
import viewsRouter from "./src/routes/views.router.js";
//import productManager from "./src/dao/productManagerFS.js"
//import productsRouter from "./src/routes/productsRouter.js";
import cookieParser from "cookie-parser";
import cookiesRouter from "./src/routes/cookies.router.js";
import sessionRouter from "./src/routes/session.router.js";
import session from "express-session";

//const productManager = new productManager();

const app = express();
const port = 8080;

const httpServer = app.listen(port, () => console.log("servidor funcionando"));

const io = new Server(httpServer);

app.set("views", __dirname + "/src/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));
app.engine("handlebars", handlebars.engine());

// Use routers/app.use("/products", routerProducts);
app.use("/products", routerProducts);
app.use("/cart", routerCarts);
app.use("/", viewsRouter);
app.use("/cookies", cookiesRouter)
app.use("/session", sessionRouter)

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("marian"))
app.use(session(
  {
    secret : "secretPhrase",
    resave : true,
    saveUninitialized : true
  }
))

app.use("/api/products", routerProducts);
app.use("/api/carts", routerCarts);

const environment = async () => {
  await mongoose.connect(
    "mongodb+srv://dbAdmin:dbAdmin@cluster0.b4sydgr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    { dbName: "ecommerce" }
  );
  console.log("conectado a la base remota de datos");
};

environment();

//conecto mongodb y le paso la uri de mi conexión y le paso el nombre de la base a la que quiero que se conecte
// const connection = async() => {
//   try {
//     await mongoose.connect("mongodb+srv://dbAdmin:dbAdmin@cluster0.b4sydgr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {dbName: "ecommerce"})
//     //await mongoose.connect("mongodb://127.0.0.1:27017", {dbName: "ecommerce"})
//     console.log("conectado a la base remota de datos")
//   } catch(err) {
//     console.log("falló la conexión")
//   }
// }

// connection()



//regla para ver si funciona ok
app.get("/ping", (req, res) => {
  res.send("pong");
});

io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado:", socket.id);

  socket.on("newproduct", async (data) => {
    try {
      const newProduct = await productManager.addProduct(
        data.title,
        data.description,
        data.code,
        data.price,
        data.stock,
        data.category
      );

      io.emit("productsUpdated", productManager.getProducts());

      io.emit("addProductResponse", data); // Emitir dentro del bloque try
    } catch (error) {
      console.error(error);

      socket.emit("addProductResponse", { error: error.message }); // Emitir el error si ocurre
    }
  });
});
