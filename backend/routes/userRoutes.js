const express=require('express')
const router=express.Router()
const userContoller= require('../controllers/userController')

// INDUCES
// I
router.get('/',userContoller.show)
module.exports= router