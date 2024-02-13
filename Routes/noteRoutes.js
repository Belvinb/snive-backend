const express = require("express");
const jwt = require("jsonwebtoken")
const router = express.Router();
const noteController = require("../Controllers/noteController");

const verifyTokenMiddleware = async(req,res,next) =>{
  
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if(!token){
        return res.status(401).json({message:"Unauthorized"})
        
    }
 

    try {
        const decoded  = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    
        req.user_id = decoded.id
        next()
        
    } catch (error) {
        console.log(error)
        if(error.name === 'TokenExpiredError'){
           return res.status(401).json({message:"Token expired"}) 
        }else{
            return res.status(403).json({message:"Invalid token"})
        }
    }

    

}

router.get("/all-notes",verifyTokenMiddleware, noteController.getAllNotes);
router.get("/single-note/:id",verifyTokenMiddleware, noteController.getOneNote);
router.post("/new-note",verifyTokenMiddleware, noteController.addNote);
router.put("/edit-note/:id",verifyTokenMiddleware, noteController.updateNote);
router.delete("/delete-note/:id",verifyTokenMiddleware, noteController.deleteNote);

module.exports = router;
