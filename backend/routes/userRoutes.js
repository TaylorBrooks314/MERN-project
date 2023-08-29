const express=require('express')
const router=express.Router()
const userContoller= require('../controllers/userController')

// INDUCES
// Show-profile page
router.get('/',userContoller.show)
module.exports= router