const {Router}=require('express');
const userModel = require('../models/userModel');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const bkModel = require('../models/bkModel');

const userRoute=Router();

userRoute.post('/register',async(req,res)=>{
   const {gender,email,password,name}=req.body;
    try {
        let check=await userModel.findOne({email,password});
        if(check){
            res.status(201).send({msg:'user already exist'});
        }else{
        const hashedPass=await bcrypt.hash(password,10);
        console.log(hashedPass);
        const user=await userModel({
        name:name,
        gender:gender,
        email:email,
        password:hashedPass
        });
        await user.save();
        res.status(200).send({msg:'user registered',user});
    }
    } catch (error) {
        res.status(500).send({msg:'error'});
    }
})

userRoute.post('/login',async (req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await userModel.findOne({email},{password});
        if(user){
          const token=jwt.sign({email,password},'neo');
          const decoded=jwt.verify(token,'neo');
          console.log(decoded);
          res.status(200).send({msg:'user logged in',token})
        }else{
            res.status(400).send({msg:'wrong credentials'});
        }

    } catch (error) {
        res.status(500).send({msg:'error'});
    }
})

userRoute.get('/logout',async(req,res)=>{
    const token=req.headers.authorization.split(" ")[1];
    try {
      
        const check= await bkModel.findOne({token:token});
        if(check){
           res.status(400).send({msg:"login again"}); 
        }else{
            const bk=await bkModel({token});
            await bk.save();
            res.status(200).send({msg:"logged out"});
        }
      
    } catch (error) {
        res.status(500).send({msg:'error'});
    }
})

module.exports=userRoute;