const express=require('express')
const router=express.Router()
const todoController=require('../controllers/todoController')

// index
router.get('/', todoController.index)

// create
router.post('/', todoController.create)

// update
router.put('/:id',todoController.update)

// delete
router.delete('/:id'.todoController.destroy)

//show
router.get('/:id',todoController.show)




 

module.exports=router