const mongoose=require('mongoose')
const Schema=mongoose.Schema

const userSchema= new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    todos:[{
        type:mongoose.Types.ObjectId,
        ref:'todos'
    }]
})
const User=mongoose.model('users',userSchema)
module.exports= User
