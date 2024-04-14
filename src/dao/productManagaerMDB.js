import { productsModel } from "./models/productsModel.js";

class ProductManagerMDB {
  constructor(path) {
    this.products = [];
    this.id = 0;
    this.path = path;
    this.initialize();
  }



  //METODO INICIALIZAR PRODUCTOS

  async initialize() {
    await this.getProducts();
  
  }




  //METODO TRAER PRODUCTOS  - MONGO OK
  async getProducts() {
    try {      
      return await productsModel.find()
    } catch (err) {
      console.log(err);
      throw new Error("error al buscar los productos")
    }
  }




  //METODO AGREGAR PRODUCTO A LA LISTA, CON VALIDACIONES - MONGO OK
  async addProduct(title,description, code,price, stock, category, thumbnail ) {

    if (!title || !description || !code || !price || !stock || !category) {
      console.log("todos los campos son obligatorios")}

      try {
        const result = await productsModel.create({title, description, code, price, stock, category, thumbnail : thumbnail ?? []})
        return result
    } catch (error){
        console.log(error.message)
        throw new Error ("error al agregar el producto")

    }
  }





  // METODO BORRAR PRODUCTO - MONGO OK
  async deleteProduct(pid) {
   try{
    const result = await productsModel.deleteOne({_id: pid})
    if(result.deletedCount === 0) throw new Error ("el id ingresado no existe")
    return result

 } catch (error) {
    console.log(error.message)
    throw new Error ("error al borrar el producto")
   }
  }



  //METODO FILTRAR POR ID - MONGO OK

  async getProductById(pid) {
    const productId = await productsModel.findOne({_id: pid})

    if (!productId) throw new Error ("ID no encontrado")  
    return productId
  }




  // REEMPLAZAR ALGUNA PROPIEDAD DE UN PRODUCTO

  updateProduct(id, changes) {
    let product = this.products.find((product) => product.id === id);
    if (product) {
      for (let prop in changes) {
        if (prop in product) {
          product[prop] = changes[prop];
          console.log("La propiedad se modificó con éxito.");
        } else {
          return {
            error: true,
            message: "La propiedad indicada no ha sido encontrada",
          };
        }
      }
      this.saveProducts();
    } else {
      return { error: true, message: "ID no encontrado" };
    }
  }

  //METODO PARA LIMITAR LA CANTIDAD DE PRODUCTOS QUE SE MUESTRAN POR PÁGINA

  limitProducts(limit) {
    const limitProducts = this.products.slice(0, limit);
    return limitProducts;
  }
}



export default ProductManagerMDB;
