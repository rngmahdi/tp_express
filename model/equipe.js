const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const EquipeSchema=new Schema(
 {
  name:{
   type:String,
   required:true
  },
   country:{
   type:String,
   required:true
  }

 }
);
module.exports=mongoose.model('Equipe',EquipeSchema);