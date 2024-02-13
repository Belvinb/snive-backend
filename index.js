const express = require("express")
const connectDB = require("./utils/db")
const cookieParser = require('cookie-parser');
require('dotenv').config()
const cors = require('cors');
const userRoutes = require("./Routes/userRoutes")
const noteRoutes = require("./Routes/noteRoutes")
const app = express()
app.use(cors());


app.use(express.json())
app.use(cookieParser());

app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Origin",
      "https://vercel.com/belvinb/snive-frontend"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
  });

app.use("/api/user",userRoutes)
app.use("/api/note",noteRoutes)

connectDB().then(()=>{

    app.listen(5000,()=>{
        console.log("connected to backend")
    })
})