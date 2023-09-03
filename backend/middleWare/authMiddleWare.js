const jwt= require('jsonwebtoken')

function authorize(req, res, next){
    console.log('authorizing...')
    try{
        let token=req.header('Authorization')
        if(!token){
            return res.status(404).json({error:'No token was given'})
        }
        console.log(token)
        token= token.replace('Bearer ','')
        console.log(token)

        const payload= jwt.verify(token, process.env.JWT_SECRET)
        console.log(payload)
        if(payload.error){
            return res.status(403).json({error: payload.error})
        }
        req.id = payload.id
        req.username = payload.username
        next()
    }catch(err){
        console.log('in the authorize: ', err.message)
        res.status(403).json({error: err.message})
    }
}
module.exports={
    authorize
}