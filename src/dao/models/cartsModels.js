import mongoose from "mongoose";

//llamo a la coleccion que quiero usar
const cartCollection = "carts";

//creo el modelo de datos
const cartSchema = new mongoose.Schema({
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          ref: "products",
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    default: [],
  },
});

// compilo y exporto el modelo
export const cartsModel = mongoose.model(cartCollection, cartSchema);
