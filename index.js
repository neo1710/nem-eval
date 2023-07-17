const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const userRoute = require('./routes/userRoutes');
const postModel = require('./models/postModel');
const postRoute = require('./routes/postRoute');
require('dotenv').config();

const app=express();
app.use(express.json());
app.use(cors());

app.use('/users',userRoute)
app.use(postRoute)

app.get('/',(req,res)=>{
res.send('homepage');
});

app.listen(process.env.PORT,async()=>{
    await mongoose.connect(process.env.URL);
    console.log('connect');
    console.log(process.env.PORT);
})
