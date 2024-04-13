import fs from "fs";
import { productsModel } from "./models/productsModel";

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
    this.saveProducts();
  }

  // METODO GUARDAR PRODUCTOS
  async saveProducts() {
    try {
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.products, null, "\t"),
        "utf-8"
      );
      console.log("productos guardados correctamente");
    } catch (err) {
      console.log(err);
    }
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
  async addProduct(title,code,price, stock, category, thumbnail ) {

    if (!title || !description || !code || !price || !stock || !category) {
      console.log("todos los campos son obligatorios")}

      try {
        const result = await productsModel.create({title, code, price, stock, category, thumbnail : thumbnail ?? []})
        return result
    } catch (error){
        console.log(error.message)
        throw new Error ("error al agregar el producto")

    }
  }





  // METODO BORRAR PRODUCTO
  deleteProduct(id) {
    const idExists = this.products.some((product) => product.id === id);
    if (idExists) {
      this.products = this.products.filter((product) => product.id != id);
      console.log("producto borrado con exito");
      this.saveProducts();
    } else {
      return { error: true, message: "ID no encontrado" };
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

const productManagerMDB = new ProductManager("./src/json/products.json");


//productManager.getProducts(); //ok
//productManager.deleteProduct(2) //ok
//console.log(productManager.getProductById(0)); //ok
//productManager.updateProduct(1, 'description', 'jean negro') //FUNCIONA OK

export default ProductManagerMDB;
