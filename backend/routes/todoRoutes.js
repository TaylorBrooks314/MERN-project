const express=require('express')
const router=express.Router()
const todoController=require('../controllers/todoController')

// create
// where to post since they will be sorted by the day
router.post('/', todoController.create)

// delete
// router.delete('')




 

module.exports=router