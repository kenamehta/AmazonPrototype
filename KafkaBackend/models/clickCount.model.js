const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clickCount = new Schema({
  productId:{type: mongoose.Schema.Types.ObjectId, ref: "product"},
  productName:{type:String,required:true},
  lastViewedCustomDate:{type:String,default:""},
  count:{type:Number,default:0}
},{
  timestamps:true
});

module.exports = mongoose.model('clickCount',clickCount);