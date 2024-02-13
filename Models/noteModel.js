const mongoose = require("mongoose")
const {Schema} = mongoose

const noteSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    }
},{timestamps:true})

const Note = mongoose.model("Note",noteSchema)

module.exports = Note