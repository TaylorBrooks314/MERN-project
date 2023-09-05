//import userModel
const Users=require('../models/userModel')

// no index because we only want to show one user
// no new/create becuase user is created in authController

// profile page-show loggedin users profile info
async function show(req, res){
    try{
        console.log(req.id)
        const foundUser= await Users.findById(req.id)
        res.json({
            username: foundUser.username,
            email: foundUser.email
        })
    }catch(err){
        console.log('in the show function in the userController:', err.message)
    }
}
// delete loggedin user
function destroy(){

}

// update password 
async function updatePassword(req, res){
    try{
        console.log('in the update password ',req.body, req.id)
        let updatedUser=await Users.findOneAndUpdate(req.id, req.body)
        res.status(200).json(updatedUser)
    }catch(err){
        console.log('in the password function in the userController: ',err.message)
    }

}
// update username
async function updateUsername(req, res){
    try{
        console.log('in the update username',req.body, req.id)
        let updatedUser=await Users.findOneAndUpdate({_id:req.id}, req.body)
        console.log(updatedUser)
        res.status(200).json(updatedUser)
    }catch(err){
        console.log('in the updateUsername function in the userController: ',err.message)
    }

}
module.exports={
    show,
    destroy,
    updatePassword,
    updateUsername
}
