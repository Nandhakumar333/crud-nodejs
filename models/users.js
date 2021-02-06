const mongoose=require('mongoose');

const UsersymSchema=new mongoose.Schema({
    name:{
      type:String,
      required:true,
    },
    symptom:{
      type:String,
      required:true
    },
    doctor_name:{
      type:String,
      required:true
    },
    time:{
      type:String,
      required:true
    },
    email:{
      type:String,
      required:true,
      unique:true
    },
    dob:{
      type:Date,
    },
    gender:{
      type:String
    },
    date:{
      type:String
    }
  })

  const usersymSchema=mongoose.model('symtomsbaseduser',UsersymSchema);
  
  module.exports=usersymSchema;