const mongoose = require('mongoose');

const usersSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["admin","student","visitor"]
    },
})

module.exports =mongoose.model("users",usersSchema);