const jwt = require('jsonwebtoken');

const User = require("../Models/userModel");
const { generateAccessToken, generateRefreshToken } = require("../utils/generateToken");

module.exports = {
  //add new user
  registerUser: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const emailExits = await User.exists({ email: email });
      if (emailExits) {
        res.status(400).json({ message: "Email already registered !" });
      }

      const newUser = await User.create({
        username,
        email,
        password,
      });

      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      res.status(500);
    }
  },
  //login user
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      const isPasswordMatch = await user.matchpassword(password);

      if (!user || !isPasswordMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      res.cookie('refreshToken',generateRefreshToken(user._id),{httpOnly: true})
      res
        .status(200)
        .json({
          accessToken: generateAccessToken(user._id),
          // refreshToken: generateRefreshToken(user._id),
        });
    } catch (error) {}
  },

  refreshToken: async(req,res)=>{
    const {refreshToken} = req.cookies.refreshToken;
    if(!refreshToken){
        return res.status(400).json({message:"Refresh token is requried"})

    }

    try {
        const decoded  = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET)

       const user = await User.findById(decoded.id)
       if(!user){
        return res.status(401).json({message:"User not found"})
       }
       const accessToken  = generateAccessToken(decoded.id)
       res.status(200).json({accessToken})
    } catch (error) {
        return res.status(403).json({message:"Invalid refresh token"})
    }

  }
};
