const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const dataModel=require("./models/data");

const app=express();
app.use(cors());
app.use(express.json());
 
mongoose.connect("mongodb://localhost:27017/todoList")
.then(()=>{console.log("database is connected")})
.catch(()=>{console.log("database is not connected")})

app.post("/add", async (req,res)=>{
   const {data}=req.body; 
   console.log(data)
   if(data.length==0){
     return  res.status(400).json("data not found")     
   }
 else{
   const newData= new dataModel({
              data:data
   })
      await newData.save();
      console.log(newData);
      res.status(200).json(newData);
}
})

app.get("/get", async(req,res)=>{
   try{
             const data= await dataModel.find();
              // console.log(data);
              res.status(200).json(data)
   }
   catch(err){
     console.log(err)
   }
})

app.put("/update:id", async(req,res)=>{
              const {id}=req.params;
              console.log(id)
              dataModel.findByIdAndUpdate({_id:id},{done:true})
              .then(result=>{res.status(200).json(result)})
              .catch(err=>{res.status(400).json(err)})
})

app.delete("/delete:id", async(req,res)=>{
 const {id}=req.params;
 console.log(id)
 dataModel.findByIdAndDelete({_id:id})
 .then(result=>{res.status(200).json(result)})
 .catch(err=>{res.status(400).json(err)})
})

const port=3001;
app.listen(port,()=>{
 console.log(`http://localhost:${port}`)
})