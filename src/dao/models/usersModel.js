import mongoose  from "mongoose"

const userCollection = "users"

const usersSchema = mongoose.Schema({
    firstName:{
        type:String,
                    required:true
    },
    lasName: {
        type:String,
                    required:true
    },
    email : {
        type: String,
        required:true,
        unique:true

    },
    age :{
     type: String,
    required:true,
},
password: {
    type: String,
    required:true,

}

})

export  const usersModel = mongoose.model(userCollection, usersSchema)

