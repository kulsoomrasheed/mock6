const express= require('express')
const cors= require('cors')
const app = express()
app.use(cors())
require('dotenv').config()
const { connection } = require('./db')
const { userRouter } = require('./routes/user.routes')
const {  docRouter } = require('./routes/employee.routes')


app.get("/",(req,res)=>{
    res.json({msg:"success"})
})
app.use(express.json())
app.use("/users",userRouter)
app.use("/appointments",docRouter)
app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log(`listening on port ${process.env.port}`);

    }catch(e){

    }
})