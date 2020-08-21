var mongoose=require('mongoose');
var Schema=mongoose.Schema;
const listSchema=mongoose.Schema({
    priority:{
        type:Number,
        required:true
    },
    title:{
       type:String,
        required:true
    },
    task:String
    });
var lists=mongoose.model('list',listSchema);
module.exports=lists;