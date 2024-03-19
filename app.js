import express from "express";
import routerProducts from "./src/routes/products.router.js";
import routerCarts from "./src/routes/cart.router.js";

const app = express();

// Use routers
app.use("/products", routerProducts);
app.use("/cart", routerCarts);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", routerProducts);
app.use("/api/carts", routerCarts);

//reglas para ver si funciona ok

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.listen(8080, () => console.log("servidor funcionando"));
