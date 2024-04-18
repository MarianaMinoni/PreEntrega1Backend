

import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

//llamo a la coleccion que quiero usar
const productsCollection = "products"

//creo el modelo de datos
const productsSchema = new mongoose.Schema({
    title : {
        type: String,
        require : true,
        index : true
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
        require : true,
        index : true
    },
    status : {
        type: Boolean,
        require : false,
        default : true
    },
    stock : {
        type: Number,
        require : true,
        index : true
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


productsSchema.plugin(mongoosePaginate)
// compilo y exporto el modelo
export const productsModel = mongoose.model(productsCollection, productsSchema)

