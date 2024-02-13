const mongoose = require("mongoose")
const bcrypt = require("bcrypt")


const {Schema} = mongoose

const userSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true})

userSchema.pre("save",async function (next) {
    if(!this.isModified("password")){
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)

})

userSchema.methods.matchpassword = async function(userpassword){
    return await bcrypt.compare(userpassword,this.password)

}



const User = mongoose.model("User",userSchema)

module.exports = User