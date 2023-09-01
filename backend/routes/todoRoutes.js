const express=require('express')
const router=express.Router()
const todoController=require('../controllers/todoController')

// index
router.get('/', todoController.index)

// create
router.post('/', todoController.create)

// delete
// router.delete('')

//show
router.get('/:id',todoController.show)




 

module.exports=router