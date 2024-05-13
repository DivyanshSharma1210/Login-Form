const express=require('express')
const mongoose=require('mongoose')
const path=require('path')
const bodyParser = require('body-parser');
// const { stringify } = require('querystring')
const port=3018

const app=express()
app.use(express.static(__dirname));
// app.use(express.urlencoded({extended:true}))
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/students')
const db=mongoose.connection

db.once('open',()=>{
    console.log("Mongodb Connection Successful");
})

const userSchema = new mongoose.Schema({
        name:String,
        Mobile:Number,
        DOB:String,
        Username:String,
        Password:String
        
},{timestamps:true})

const users = mongoose.model("Userdetails",userSchema)



app.get('/',(req,res)=>
{
    res.sendFile(path.join(__dirname,'mainlogin.html'))
})

app.post('/post',async(req,res)=>{
    const {name,Mobile,DOB,Username,Password}= req.body;
   const user = new users({
        name,
        Mobile,
        DOB,
        Username,
        Password
       

   })
   await user.save()
    console.log(user)
    res.send("Form Submission Successful")
})
app.listen(port,()=>{
    console.log("Server Started");
})