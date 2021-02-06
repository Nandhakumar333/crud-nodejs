require('dotenv').config();
const http=require('http');
const express = require('express');
const app=express();
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const ejs=require('ejs');
const morgon=require("morgan");
const flash=require('connect-flash');
const method=require('method-override');
const express_session=require("express-session");


app.use(express_session({ 
  secret:'geeksforgeeks', 
  saveUninitialized: true, 
  resave: true
})); 


app.use(method("_method"))
app.use(flash());

app.use(morgon("dev"));

const port = process.env.PORT || 5000



mongoose.connect('mongodb+srv://hacker:WbJgd0CKXjRNJJgC@test.dajmv.mongodb.net/OPD_USERS?retryWrites=true&w=majority',{useNewUrlParser: true,
useUnifiedTopology: true,useCreateIndex:true},()=>{
  console.log("MongoDB Connected")
})


app.set('view engine','ejs');
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());





app.use("/user",require("./routers/userroute"));





app.use((req,res,next)=>{
 const err=new Error("Not Found");
 err.status=404;
 next(err);

})

app.use((err,req,res,next)=>{
  res.status(err.status || 500);
  res.json({error:{
    status:err.status || 500,
    message:err.message
  }})
})




const server=http.createServer(app);
server.listen(port,()=>{
  console.log(`Server Running at ${port}`);
})