const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const savedProduct = new Schema({
  productId:{type:String,required:true},
  sellerEmailId:{type:String,required:true},
  quantity:{type:number,required:true},
},{
  timestamps:true
});

const cartProduct = new Schema({
  productId:{type:String,required:true},
  sellerEmailId:{type:String,required:true},
  quantity:{type:number,required:true},
  giftFlag:{type:String,default:"false"},
  giftMessage:{type:String,default:""}
},{
  timestamps:true
});

const address = new Schema({
  addressName:{type:String,required:true},
  street:{type:String,required:true},
  city:{type:String,required:true},
  state:{type:String,required:true},
  country:{type:String,required:true},
  zipcode:{type:String,required:true},
  phone:{type:String,required:true}
},{
  timestamps:true
});

const card = new Schema({
  cardName:{type:String,required:true},
  cardNumber:{type:String,required:true},
  expirationDate:{type:String,required:true},
  cvv:{type:String,required:true}
},{
  timestamps:true
});

const customerProfile = new Schema({
  emailId:{type:String,required:true},
  name:{type:String,required:true},
  phone:{type:String,default:""},
  profilePictureUrl:{type:String,default:"default.png"},
  savedProducts:[savedProduct],
  cartProducts:[cartProduct],
  addresses:[address],
  paymentCards:[card]
},{
  timestamps:true
});

module.exports = mongoose.model('customer', customerProfile);