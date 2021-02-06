const express=require('express');
const route=express.Router();
const usersymSchema=require("../models/users");
var moment = require('moment'); // require


route.get("/showusers",(req,res)=>{
  
  usersymSchema.find().then((data)=>{
     console.log(data);
     let addmessage={message:req.flash('new'),color:"alert-info"};
     let updatemessage={message:req.flash('info'),color:"alert-warning"};
     let deletemessage={message:req.flash('delete'),color:"alert-danger"};
     console.log(updatemessage.message || deletemessage.message);
     function getmessage(){
       if(updatemessage.message.length>0){
         return updatemessage;
       }else if(deletemessage.message.length>0){
         return deletemessage;
       }else{
         return addmessage;
       }
     }
     res.render("users",{data:{name:data},flash:getmessage()});
   })
   usersymSchema.aggregate([
     
     { $group: {
         _id: '$doctor_name',
        }
     }
     

]).exec(function ( e, d ) {
console.log( d )            
});

})


route.route("/")
  .get((req,res)=>{
    res.render("knowdoctor");
  
})


  .post((req,res)=>{
    const currentdate=moment().format("DD/MM/YYYY, h:mm:ss a");
    const newuser=new usersymSchema({
      name:req.body.name,
      symptom:req.body.symptoms,
      doctor_name:req.body.drname,
      time:req.body.time,
      email:req.body.email,
      dob:req.body.doc,
      gender:req.body.gender,
      date:currentdate
    })
    newuser.save().then((data)=>{
      console.log(data);
      console.log("Data Saved");
      req.flash('new',"Add New User");
      res.redirect("/user/showusers");
    }).catch((err)=>{
      console.log(err);
    })
})
  .put((req,res)=>{
  console.log(req.params.id);
  usersymSchema.updateOne({"_id":req.params.id},{name:req.body.name},(err,data)=>{
    if(err){
      console.log(err);
    }else{
      console.log("Data Updated");
    }
  })
})

  .patch((req,res)=>{
  console.log(req.params.id);
  usersymSchema.updateOne({"_id":req.params.id},{$set:{name:req.body.name}},(err,data)=>{
    if(err){
      console.log(err);
    }else{
      console.log("Data Modified");
    }
  })
})
  .delete((req,res)=>{
  console.log(req.params.id);
  usersymSchema.deleteOne({"_id":req.params.id},(err,data)=>{
    if(err){
      console.log(err);
    }else{
      console.log("Deleted Successfully");
    }
  })
});
route.route("/:id")
  .get((req,res)=>{
    usersymSchema.findOne({"_id":req.params.id},(err,data)=>{
      if(err){
        console.log(err);
      }
      else{
        res.render("update",{user:data});
      }
    })
    
  })
  .post((req,res)=>{
    console.log(req.params.id);
    let name=req.body.name;
    let email=req.body.email;
    let symptom=req.body.symptoms;
    let doctor=req.body.drname;
    let time=req.body.time;
    usersymSchema.updateOne({_id:req.params.id},{$set:{name:name,email:email,symptom:symptom,doctor_name:doctor,time:time}},(err,data)=>{
      if(err){
        console.log(err);
      }
      else{
        console.log("Update Success");
        req.flash("info","update");
        res.redirect('/user/showusers');
      }
    })
  })
  .delete((req,res)=>{
    console.log(req.params.id);
    usersymSchema.deleteOne({_id:req.params.id},(err,data)=>{
      if(err){
        console.log(err);
      }else{
        console.log("Data Deleted");
        req.flash("delete","Successfuly Delete")
        res.redirect("/user/showusers");
      }
    })
  })

module.exports=route;