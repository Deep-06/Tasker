const {UserModel}=require("../models/user.model")
const express=require("express")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const userRouter=express.Router();


userRouter.post("/register",async(req,res)=>{
    const {username,email,password}=req.body
    try{
        bcrypt.hash(password, 4, async(err, hash) =>{
         if(err){
            res.status(200).send({"error":err})
         }else{
            const user=new UserModel({username,email,password:hash})
            await user.save()
            res.status(200).send({"msg":"The new user has been registered","registeredUser":req.body})
         }
        });
    }catch(err){
        res.status(400).send({"error":err})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try{
     const user= await UserModel.findOne({email})
     if(user){
        bcrypt.compare(password, user.password, (err, result) =>{
            if(result){
                const token=jwt.sign({userID:user._id,username:user.username}, process.env.SECRET_KEY)
                res.status(200).send({"msg":"Login successful!", "token":token})
            }else{
                res.status(201).send({"msg":"Wrong Credentials"})
            }
        })
     }
    }catch(err){
        res.status(400).send({"error":err}) 
    }
})


module.exports={
    userRouter
}