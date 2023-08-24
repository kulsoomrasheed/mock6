const express= require('express')
const { DocModel } = require('../model/user.model')
const { auth } = require('../middlewares/auth.middleware')
const docRouter = express.Router()
docRouter.use(auth)

docRouter.get("/",async(req,res)=>{
    try {
        const doctors = await DocModel.find();
        res.json({doctors});
      } catch (error) {
        console.error('Error fetching doctors:', error);
        res.status(500).json({ error: 'An error occurred while fetching doctors' });
      }
})

docRouter.post("/",async(req,res)=>{
    const { name,fee,location,image,date,specialization,experience,slots}= req.body
    try{
    const employee= new DocModel({ name,fee,location,image,date,specialization,experience,slots})
    await employee.save()
    res.json({msg:"A new doctor has been added"})
    }catch{
        res.json({msg:"Error saving doctor"})

    }
})


docRouter.patch("/edit/:id",async(req,res)=>{
        let ID=req.params.id
        let payload=req.body
        let data =await DocModel.findOne({_id:ID})
        let userID_post=data.userID
        let userID_req=req.body.userID
        try {
                 if((userID_post==userID_req)){
                    await DocModel.findByIdAndUpdate({
                     _id:ID
                },payload)
                res.send(`doctor with ${ID} is updated`)
            }else{
                res.send("Not authorized")
            }
            
        } catch (error) {
            res.send(error)
        }
    })
    docRouter.delete("/delete/:id",async(req,res)=>{
        let ID=req.params.id
        let data =await DocModel.findOne({_id:ID})
        let userID_post=data.userID
        let userID_req=req.body.userID
        try {
            
                 if((userID_post==userID_req)){
                    await DocModel.findByIdAndDelete({
                     _id:ID
                })
                res.send(`doctor with ${ID} is deleted`)
            }else{
                res.send("Not authorized")
            }
            
        } catch (error) {
            res.send(error)
        }
    })
module.exports={
    docRouter
}