const {Router}=require('express');
const userModel = require('../models/userModel');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const auth = require('../authMiddleware');
const postModel = require('../models/postModel');

const postRoute=Router();



postRoute.post('/posts/post',auth,async(req,res)=>{
try {
   const post={
    title:req.body.title,
    body:req.body.body,
    device:req.body.device,
    userId:"neo@",
    pass:"neo123"
   }
  
   const appe=await postModel(post);
   await appe.save();
   res.status(200).send({msg:'posted',post:appe});

} catch (error) {
    res.status(500).send({msg:"error"});
}
})

postRoute.get('/posts',auth,async(req,res)=>{
    try {
        const posts=await postModel.find({userId:req.userId},{pass:req.pass});
           res.status(200).send({data:posts});
    } catch (error) {
        res.status(500).send({msg:"error"});
    }
})

postRoute.delete('/posts/delete',auth,async(req,res)=>{
    const {id}=req.body;
    try {
       const post=await postModel.deleteOne({id:id});
       await post.save()
       res.status(200).send({msg:"deleted",post})
    } catch (error) {
        res.status(500).send({msg:"error"});
    }
})


module.exports=postRoute;