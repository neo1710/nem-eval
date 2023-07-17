const jwt=require('jsonwebtoken');
const bkModel = require('./models/bkModel');

const auth=async(req,res,next)=>{
const token=req.headers?.authorization.split(" ")[1];

try {
 const check= await bkModel.findOne({token});
 if(check){
    res.status(400).send({msg:"login again"}); 
 }
    if(!token){
        res.status(400).send({msg:"no token provided"}); 
    }else if(token){
        const decoded=jwt.verify(token,'neo');
        if(!decoded){
     res.status(400).send({msg:"not logged in"});
        }else{
            req.userId=decoded.email;
            req.pass=decoded.password;
            next();
        }
     } 
} catch (error) {
    res.status(500).send({msg:"autherror"});
}
  
   
}

module.exports=auth;

// {
//     "title":"greet",
//     "body":"hey",
//     "device":"pc"
//     }