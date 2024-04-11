

import mongoose from "mongoose";

//llamo a la coleccion que quiero usar
const productsCollection = "products"

//creo el modelo de datos
const productsSchema = new mongoose.Schema({
    title : {
        type: String,
        require : true
    },
    description : {
        type: String,
        require : true
    },   
    code: {
        type: String,
        require : true
    },
    price:{
        type: Number,
        require : true
    },
    status : {
        type: Boolean,
        require : false,
        default : true
    },
    stock : {
        type: Number,
        require : true
    },
    category: {
        type: String,
        require : true
    },
    thumbnails : {
        type: Array,
        require : false,
        default : []

    },
})

// compilo y exporto el modelo
export const productsModel = mongoose.model(productsCollection, productsSchema)

