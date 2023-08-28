const mongoose=require('mongoose')
const Schema=mongoose.Schema

const todoSchema=new Schema({
  // time:{
     
  // },
  body:{
    type:String,
    required:true
  },
  completed:{
    type:Boolean,
    default:false
  }
})

const Todo= mongoose.model('todos',todoSchema)
module.exports= Todo