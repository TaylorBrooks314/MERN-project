const mongoose=require('mongoose')
const Schema=mongoose.Schema

const todoSchema=new Schema({
  date:{
     type:String,
     required:true
  },
  title:{
    type:String,
    required:true
  },
  completed:{
    type:Boolean,
    default:false
  },
  location:{
    type:String
  },
  // startTime:{

  // },
  // endTime:{

  // },
  details:{

  }

})

const Todo= mongoose.model('todos',todoSchema)
module.exports= Todo