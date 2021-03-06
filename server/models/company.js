const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  companyName: String,
  users: [String],
  assistants: [String],
  properties: [{
    propertyName: String,
    address: String,
    units: [{
      tenantName: String,
      cellNumber: String,
      email: String,
      rentAmount: Number,
      dueDate: Number,
      currency: String,
      paidStatus: Boolean,
      amountOwed: Number,
    }]
  }]
}, {usePushEach: true});

module.exports = mongoose.model('company', CompanySchema);
