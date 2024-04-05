const jwt=require("jsonwebtoken")
const { BlackListModel } = require("../models/blacklist.model");

const auth=async(req,res,next)=>{
    try{
const token=req.headers.authorization?.split(" ")[1]

if(token){
    let existingToken = await BlackListModel.find({ token });

      if (existingToken.length > 0) {
        return res.status(400).send({ error: "Please Login Again!!" })
      }
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) =>{
 if(decoded){
     req.body.userID=decoded.userID
    // req.body.username=decoded.username
    next()
 }else{
    res.send({"msg":"You are not authorized",err})
 }
       
      })

}else{
    res.send({"msg":"Login"})
}
}catch(err){
    console.log(err)
    res.status(400).send(err);
}
}

module.exports={
    auth
}