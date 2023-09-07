//import userModel
const Users=require('../models/userModel')
const Todos=require('../models/todoModel')
const bcrypt=require('bcrypt')
// no index because we only want to show one user
// no new/create becuase user is created in authController

// profile page-show loggedin users profile info
async function show(req, res){
    try{
        console.log(req.id)
        const foundUser= await Users.findById(req.id)
        if(!foundUser){
            return res.status(404).json({error:'No user exists with that username'})
        }
        res.json({
            username: foundUser.username,
            email: foundUser.email
        })
    }catch(err){
        console.log('in the show function in the userController:', err.message)
    }
}
// delete loggedin user
async function destroy(req,res){
    try{
        console.log(req.id)
        let foundUser= await Users.findById(req.id)
        if(!foundUser){
            return res.status(404).json({error:'No user exists with that username'})
        }
        console.log(req.body)
        const vaildPass= await bcrypt.compare(req.body, foundUser.password)
        if (!vaildPass){
            return res.status(404).json({error:'invaild password!'})
        } 
        const user= await Users.findByIdAndDelete(req.id)
        await Todos.deleteMany({ _id: {
            $in: user.comments   
        }})
        console.log('delete sucessful')
        res.status(200).json('delete sucessful')
    }catch(err){
        console.log('in the delete function in the userController: ',err.message)
    }
}

// update password 
async function updatePassword(req, res){
    try{
        console.log('in the update password ',req.body, req.id)
        let updatedUser=await Users.findOneAndUpdate({_id:req.id}, req.body)
        console.log(updatedUser)
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
    updateUsername,
    destroy
}
