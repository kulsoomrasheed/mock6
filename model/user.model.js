const mongoose= require('mongoose')
const userSchema=mongoose.Schema({
    email:String,
    pass:String,
    confirmPass:String,

},{
    versionKey:false}
    )
    const UserModel=mongoose.model('User',userSchema)


    const docSchema=mongoose.Schema({
        name:String,
        image:String,
        specialization:String,
        fee:Number,
        experience:Number,
        date : String,
        location:String,
        slots:Number
    },{
        versionKey:false}
        )
        const DocModel=mongoose.model('Doctor',docSchema)
        module.exports={
            UserModel,DocModel
        }