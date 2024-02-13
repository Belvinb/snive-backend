const express = require("express")
const connectDB = require("./utils/db")
const cookieParser = require('cookie-parser');
require('dotenv').config()
const cors = require('cors');
const userRoutes = require("./Routes/userRoutes")
const noteRoutes = require("./Routes/noteRoutes")
const app = express()
app.use(cors());
connectDB()

app.use(express.json())
app.use(cookieParser());

app.use("/api/user",userRoutes)
app.use("/api/note",noteRoutes)

app.listen(5000,()=>{
    console.log("connected to backend")
})