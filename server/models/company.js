const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  name: String,
  userId: String,
  
});

module.exports = mongoose.model('company', CompanySchema);
