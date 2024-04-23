import { cartsModel } from "./models/cartsModels.js";
import { productsModel } from "./models/productsModel.js";

class CartManagerMDB {
  constructor(path) {
    this.cart = [];
    this.cartId = 0;
    this.path = path;
    this.initialize();
  }

  //METODOS

  async initialize() {
    await this.getCart();
   
  }

  //obtener carrito - MONGO OK
  async getCart() {
    try {
        return await cartsModel.find();

    } catch (err) {
      console.log(err);
      throw new Error("error al buscar el carrito")
    }
  }


  //crear carrito - MONGO OK

  async createCart() {

    try{
        const result = await cartsModel.create({
            products: []
        })

        return result

    }catch(err){
        console.log(err)
        throw new Error("error al crear el carrito")
    }   
  }
  // buscar por id - MONGO OK 

  async getCartById(cid) {

    const cartId = await cartsModel.findOne({_id : cid } )
    

    if (!cartId) throw new Error("carrito no encontrado")
    return cartId


    
  }




  //agreagr al carrito

   async addToCart(cartId, productId, quantity = 1 ) {
    try {
        const cart = await cartsModel.findOne({_id: cartId});
        if (!cart) {
          return console.error(error)
        }
  
        const existingProduct = await productsModel.findOne({"products.product": productId})
        if (existingProduct) {
          await cartsModel.updateOne(
            {"products.product": productId},
            {$inc : {"products.$.quantity": 1}}  
          )
        } else {
          await cartsModel.updateOne(
            {_id: cartId},
            {$push: {products: [{product: productId, quantity: quantity}]}}  
          )
        }
      } catch (error) {
        console.error(error)
      }
    }


async removeProductFromCart(cartId, productId) {
  try {
      const cart = await cartsModel.findOne({_id: cartId});
      if (!cart) {
        throw new Error("Carrito no encontrado");
      }

      const productIndex = cart.products.findIndex(product => product.product === productId);
      if (productIndex === -1) {
        throw new Error("Producto no encontrado en el carrito");
      }

      cart.products.splice(productIndex, 1);
      await cart.save();
  } catch (error) {
      console.error(error);
      throw new Error("Error al eliminar el producto del carrito");
  }
}

}

export default CartManagerMDB;
