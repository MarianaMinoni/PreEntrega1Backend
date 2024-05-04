import mongoose from "mongoose";

//llamo a la coleccion que quiero usar
const userCollection = "users";

//creo el modelo de datos
const userSchema = new mongoose.Schema({
first_name:{
    type: String,
    minLength : 3,
    required: true,
},
last_name:{
    type: String,
    minLength : 3,
    required: true,
},
email:{
    type: String,
    required: true,
    minLength : 3,
    unique : true
},
age:{
    type: Number,
    required: true,
},
password:{
    type: String,
    minLength : 3,
    required: true,
}


});

const userModel = mongoose.model(userCollection, userSchema);
// compilo y exporto el modelo
export default userModel
