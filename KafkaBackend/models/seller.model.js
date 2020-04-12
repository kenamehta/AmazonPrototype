const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sellerProfile = new Schema({
  emailId:{type:String,required:true},
  name:{type:String,required:true},
  phone:{type:String,required:true},
  profilePictureUrl:{type:String,default:"default.png"},
  street:{type:String,required:true},
  city:{type:String,required:true},
  state:{type:String,required:true},
  country:{type:String,required:true},
  zipcode:{type:String,required:true}
},{
  timestamps:true
});

module.exports = mongoose.model('seller',sellerProfile);