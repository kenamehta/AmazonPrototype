const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const category = new Schema({
  name:{type:String,required:true},
  productCount:{type:Number,default:0},
},{
  timestamps:true
});

module.exports = mongoose.model('category',category);