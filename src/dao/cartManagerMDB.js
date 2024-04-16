import { cartsModel } from "./models/cartsModels.js";
//import { productsModel } from "./models/productsModel";

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

  async getCartById(pid) {

    const cartId = await cartsModel.findOne({_id : pid } )
    

    if (!cartId) throw new Error("carrito no encontrado")
    return cartId


    
  }




  //agreagr al carrito

   async addToCart(cartId, productId, quantity) {
     if (!cartId || !productId || !quantity) {
       console.log("Todos los datos son obligatorios");
       return; // Debes salir de la función si faltan datos obligatorios
     }
  
     try {
       // Buscar el carrito por su ID en la colección de carritos
       const cart = await cartsModel.findOne({ _id: cartId });
  
       if (!cart) {
         throw new Error("Carrito no encontrado");
       }
  
       // Buscar el producto por su ID en la colección de productos
       const product = await productsModel.findOne({ _id: productId });
  
       if (!product) {
         throw new Error("Producto no encontrado");
       }
  
       // Verificar si el producto ya existe en el carrito
       const existingProduct = cart.products.find(
         (p) => p.product.toString() === productId
       );
  
       if (existingProduct) {
         // Si el producto ya existe, actualizar la cantidad
         existingProduct.quantity += quantity;
       } else {
         // Si el producto no existe en el carrito, agregarlo
         cart.products.push({ product: productId, quantity });
       }
  
       // Guardar los cambios en el carrito
       await cart.save();
  
       // Aquí puedes devolver algún tipo de confirmación o mensaje si lo deseas
       return { success: true, message: "Producto agregado al carrito" };
     } catch (err) {
       console.error(err);
       throw err; // Reenviar el error para que sea manejado por quien llama a esta función
     }
   }
}


export default CartManagerMDB;
