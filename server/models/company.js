const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  name: String,
  userId: String,
  properties: [{
    name: String,
    address: String
  }]
});

module.exports = mongoose.model('company', CompanySchema);
