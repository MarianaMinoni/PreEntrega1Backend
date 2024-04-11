

import mongoose from "mongoose";

//llamo a la coleccion que quiero usar
const productsCollection = "products"

//creo el modelo de datos
const productsSchema = new mongoose.Schema({
    title : String,
    description : String,
    code: Number,
    price:Number,
    stock : Number,
    category: String
})

// compilo y exporto el modelo
export const productsModel = mongoose.model(productsCollection, productsSchema)

