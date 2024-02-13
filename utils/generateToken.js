const jwt = require("jsonwebtoken")

const generateAccessToken = (id) =>{
    return jwt.sign({id},process.env.ACCESS_TOKEN_SECRET)
}

const generateRefreshToken = (id) =>{
    return jwt.sign({id},process.env.REFRESH_TOKEN_SECRET)
}

module.exports ={
    generateAccessToken,
    generateRefreshToken
}