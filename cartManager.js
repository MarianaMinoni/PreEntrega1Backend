const fs = require('fs')

/* la ruta POST '/' debe crear un carrito con esta estructura :
id: Number
products: [array de productos en el carro] (get products)



la ruta GET/:cid debe listar los productos que pertenezcan al carrito con el id proporcionado
(buscar x id) =>
 el producto x id que este en el carro


la ruta POST /:cid/product/:pid deben agregar el producto al carrito con el siguiente formato:
product[id, q] (quantity), solo esos dos parametros

(addproduct(id, q))
si el id existe, no repetir

tambien si es un producto ya existente al carrito, sumarle la cantidad sin repetir el producto




*/

class CartManager{
    constructor(path){
        this.cart = [];    
        this.cartId = 0;
        this.path = path;
        this.initialize();
    }

    //METODOS

    async initialize(){
        await this.getProducts();
        this.saveCart();
    }

    //obtener carrito
    async getProducts(){
        try {
            const data = await fs.promises.readFile(this.path, "utf-8");
            this.cart = JSON.parse(data);
            return this.cart;
        } catch(err){
            console.log(err);
        }
    }

    //guardar carrito

    async saveCart(){
        try{
            await fs.promises.writeFile(this.path, JSON.stringify(this.cart, null, 2), "utf-8");
            console.log("productos guardados correctamente");
        } catch(err){
            console.log(err);
        }
    }

    //crear carrito

    createCart(cartId, cartProducts) {
        const newCart = {
            id: ++this.cartId,
            products: cartProducts
        };
        this.cart.push(newCart);  
        this.saveCart();      
        return newCart;
    }




    // buscar por id

    getCartById(id){
        const cartId = this.cart.find(cart => cart.id === id);

        if (cartId){
            return cartId;
        } else{
            console.log("el id ingresado no existe");
        }


    }

   





}










const cartManager = new CartManager("./package-json/carts.json")

module.exports = cartManager;

