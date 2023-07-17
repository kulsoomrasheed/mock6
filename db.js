const mongoose= require('mongoose')
const connection = mongoose.connect("mongodb+srv://kulsoom:rasheed@cluster0.uypmrfo.mongodb.net/mock6?retryWrites=true&w=majority")
module.exports ={
    connection
}