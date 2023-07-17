const express= require('express')
const cors= require('cors')
const { connection } = require('./db')
const { boardRouter } = require('./routes/board.model')
const app = express()
app.use(cors())
app.get("/",(req,res)=>{
    res.json({msg:"success"})
})
app.use(express.json())
app.use("/boards",boardRouter)
app.listen(5000,async()=>{
    try{
        await connection
        console.log("listening on port 5000");

    }catch(e){
     console.log("Unable to connect");
    }
})