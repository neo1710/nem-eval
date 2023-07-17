const mongoose=require('mongoose');

const bkSchema=mongoose.Schema({
  token:String
})

const bkModel=mongoose.model('blacklist',bkSchema);

module.exports=bkModel;