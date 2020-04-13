const seller = require('../models/seller.model');
const customer = require('../models/customer.model');

function handle_request(msg, callback) {
  const { user_id, userRole } = msg;
  let modelToUse = '';
  if (userRole === 'seller') {
    modelToUse = seller;
  } else if (userRole === 'customer') {
    modelToUse = customer;
  } else return callback(null, false);
  modelToUse.findById(user_id, (err, results) => {
    if (err) {
      return callback(null, false);
    }
    if (results) {
      callback(null, results);
    } else {
      callback(null, false);
    }
  });
}

exports.handle_request = handle_request;
