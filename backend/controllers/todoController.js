// import models
const Todos=require('../models/todoModel')
async function create(req,res){
    try{
        let newTodo= await Todos.create(req.body)
        res.status(200).json(newTodo)
    }catch(err){
        console.log('in the create function in the todoController:', err.message)
    }
}
async function index(req,res){
    try{
        let list= await Todos.find()
        res.status(200).json(list)
    }catch(err){
        console.log('in the index function in the todoController:', err.message)
    }
}
async function show(req,res){
    try{
    console.log(req.params.id)
      let todo= await Todos.findById(req.params.id)
      res.status(200).json(todo)
    }catch(err){
        console.log('in the show function in the todoController:', err.message)
    }
}

module.exports={
    index,
    create,
    show
}