import fs from "fs";

class ProductManager {
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

  //METODO TRAER PRODUCTOS
  async getProducts() {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      this.products = JSON.parse(data);
      return this.products;
    } catch (err) {
      console.log(err);
    }
  }

  //METODO AGREGAR PRODUCTO A LA LISTA, CON VALIDACIONES
  async addProduct(
    title,
    description,
    code,
    price,
    stock,
    category,
    thumbnail
  ) {
    if (!title || !description || !code || !price || !stock || !category) {
      console.log("todos los campos son obligatorios");
    }
    const codeExists = this.products.some((product) => product.code === code);

    if (codeExists) {
      console.log("el código ingresado ya existe");
    } else {
      const product = {
        id: this.id,
        title: title,
        description: description,
        code: code,
        price: price,
        status: true,
        stock: stock,
        category: category,
        thumbnail: thumbnail,
      };
      this.products.push(product);
      this.id++;
    }

    try {
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.products, null, "\t"),
        "utf-8"
      );
    } catch (err) {
      console.log(err);
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

  //METODO FILTRAR POR ID

  getProductById(id) {
    const productId = this.products.find((product) => product.id === id);
    if (productId) {
      return productId;
    } else {
      return { error: true, message: "ID no encontrado" };
    }
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

const productManager = new ProductManager("./src/json/products.json");

productManager.addProduct('t-shirt', 'white t-shirt','1100', '100', '10', "shirts");
productManager.addProduct('shoe', 'sports shoes','1101', '250',  '5', "shoes");
productManager.addProduct('jeans', 'fashion white jeans', '1102','200', '3', "pants");
productManager.addProduct('skirt', 'long skirt','1103', '150',  '16', "skirts");


//console.log(productManager.getProducts())//ok
//productManager.deleteProduct(0) //ok
//console.log(productManager.getProductById(1)); //ok

export default productManager;
