// import user model
const Users=require('../models/userModel')

// import bcrypt to encrypt password
const bcrypt=require('bcrypt')

// import jsonwebtoken to create token
const jwt= require('jsonwebtoken')

// function takes user and makes token
function generateToken(user){
    const payload ={id:user._id, username:user.username}
    const token= jwt.sign(payload, process.env.JWT_SECRET,{expiresIn:'1h'})
    return token
} 

async function signUp(req,res){
    try{
        const foundUser= await Users.findOne({username: req.body.username})
        if(foundUser){
            return res.status(404).json({error:'Username is already taken'})
        }
        const encryptedPassword= await bcrypt.hash(req.body.password, Number(process.env.SALT_ROUNDS))
        const newUser= await Users.create({...req.body, password:encryptedPassword})
        const token= generateToken(newUser)
        res.status(200).json({token})

    }catch(err){
        console.log('in the signUP function, in the authController=>'+err.message)
    }
}
async function login(req,res){
    try{
    let foundUser= await Users.findOne({username:req.body.username})
    if(!foundUser){
        return res.status(404).json({error:'No user exists with that username'})
    }
    const vaildPass= await bcrypt.compare(req.body.password, foundUser.password)
    if (!vaildPass){
        return res.status(404).json({error:'invaild password!'})
    }
    const token= generateToken(foundUser)
    res.status(200).json({token})
    }catch(err){
        console.log('in the login function, in the authController=>'+err.message)
    }
}

module.exports={
    signUp,
    login
}