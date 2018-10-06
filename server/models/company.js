const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  companyName: String,
  userId: String,
  properties: [{
    propertyName: String,
    address: String
  }]
}, {usePushEach: true});

module.exports = mongoose.model('company', CompanySchema);
