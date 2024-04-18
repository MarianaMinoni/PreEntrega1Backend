import mongoose from "mongoose";

//llamo a la coleccion que quiero usar
const messagesCollection = "messages";

//creo el modelo de datos
const messagesSchema = new mongoose.Schema({
  user: {
    type: String,
    require: true,
  },
  message: {
    type: String,
    require: true,
  },
});

// compilo y exporto el modelo
export const messagesModel = mongoose.model(messagesCollection, messagesSchema);
