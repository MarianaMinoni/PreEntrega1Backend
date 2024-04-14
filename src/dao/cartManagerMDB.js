import { cartmodel } from "./models/cartsModels";


class CartManagerMDB {
  constructor(path) {
    this.cart = [];
    this.cartId = 0;
    this.path = path;
    this.initialize();
  }

  //METODOS

  async initialize() {
    await this.getProducts();
   
  }

  //obtener carrito
  async getProducts() {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      this.cart = JSON.parse(data);
      return this.cart;
    } catch (err) {
      console.log(err);
    }
  }

  //guardar carrito

  async saveCart() {
    try {
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.cart, null, "\t"),
        "utf-8"
      );
      console.log("productos guardados correctamente");
    } catch (err) {
      console.log(err);
    }
  }

  //crear carrito

  createCart() {
    const newCart = {
      id: ++this.cartId,
      products: [],
    };
    this.cart.push(newCart);
    this.saveCart();
    return newCart;
  }
  // buscar por id

  getCartById(id) {
    const cartId = this.cart.find((cart) => cart.id === parseInt(id));

    if (cartId) {
      return cartId;
    } else {
      return { error: true, message: "carrito no encontrado" };
    }
  }

  //agreagr al carrito

  async addToCart(cartId, productId, quantity) {
    try {
      const cart = this.cart.find((c) => c.id === cartId);
      if (!cart) {
        return { error: true, message: "carrito no encontrado" };
      }

      const productIndex = cart.products.findIndex((p) => p.id === productId);

      if (productIndex !== -1) {
        // Si el producto ya existe, lo sumo
        cart.products[productIndex].quantity += quantity;
      } else {
        // Si el producto no existe en el carrito, lo pusheo
        cart.products.push({ product: productId, quantity });
      }
    
    } catch (err) {
      console.error(err);
    }
  }
}



export default CartManagerMDB;
