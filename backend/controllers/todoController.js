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
    console.log(req.params)
      let todo= await Todos.findById(req.params.id)
      res.status(200).json(todo)
    }catch(err){
        console.log('in the show function in the todoController:', err.message)
    }
}
async function update(req,res){
    try{
        let updatedTodo= await Todos.findByIdAndUpdate({ _id: req.params.id},req.body)
        console.log(updatedTodo)
        res.status(200).json(updatedTodo)
    }catch(err){
        console.log('in the update function in the todoController:', err.message)
    }
}
async function destroy(req,res){
    try{
    await Todos.findByIdAndDelete({_id:req.params.id})
    }catch(err){
        console.log('in the delete function in the todoController:', err.message)
    }
}
// induces
module.exports={
    index,
    destroy,
    update,
    create,
    show
}