// setting up express
const express=require('express')
const app=express()
const port=3031

// dotenv for env. varibles
require('dotenv').config()

// import cors to allow access
const cors=require('cors')
// import authorize middleware
const {authorize}= require('./middleWare/authMiddleWare')
// import routes
const todoRoutes= require('./routes/todoRoutes')
const userRoutes= require('./routes/userRoutes')
const authRoutes= require('./routes/authRoutes')


// connecting database
const connectDB=require('./config')
connectDB()


//////////////MiddleWare////////////////////////
app.use(express.json())
app.use(cors())
app.use('/api/user',authorize, userRoutes)
app.use('/api/todo',todoRoutes)
app.use('/auth',authRoutes)
////////////////////////////////////////////////

app.get('/',(req,res)=>{
    res.send('hello World!')
})

app.listen(port, ()=>{
    console.log('listening on port: '+ port)
})
