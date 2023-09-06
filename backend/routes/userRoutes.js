const express=require('express')
const router=express.Router()
const userContoller= require('../controllers/userController')

// INDUCES
// Show-profile page
router.get('/',userContoller.show)
// Update-password
router.put('/password', userContoller.updatePassword)
// Update-username
router.put('/username', userContoller.updateUsername)
// delete 
router.delete('/delete',userContoller.destroy)

module.exports= router