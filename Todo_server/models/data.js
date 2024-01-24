const mongoose =require('mongoose');

const taskData=new mongoose.Schema({
     data:{
        type:String,
        require:true      
     },
     done:{
       type:Boolean,
       default:false
     }
})
const dataModel=mongoose.model("todo",taskData);

module.exports=dataModel