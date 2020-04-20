const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const comment = new Schema({
  customerId:{type:String,required:true},
  productId:{type:String,required:true},
  title:{type:String,required:true},
  comment:{type:String,required:true},
  rating:{type:Number,required:true}
},{
  timestamps:true
});

module.exports = mongoose.model('comment',comment);