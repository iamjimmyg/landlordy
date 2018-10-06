const mongoose = require('mongoose');

const Company = mongoose.model('company');
const User = mongoose.model('user')

function updateUser(company){
  return User.findById(company.userId)
    .then(user => {
      user.companyId = company.id
      user.save(function(err){
        if(err) throw new Error('user did not update companyId')
      })
    })
}

function addCompany({companyName, userId, req} ) {
  if(!companyName) {
    throw new Error('You must provide a company name.');
  }
  //check if company exists, if it doesnt, create a new one and save to db
  return Company.findOne({companyName})
    .then(company => {

      if(company === null){
        const newCompany = new Company({companyName, userId})

        newCompany.save(function (err){
          if(err) throw new Error('Company did not save')
        })
        updateUser(newCompany)
        return newCompany

      }else if(company.companyName === companyName) {
        throw new Error('This company already exists')
      }
    })
}

// function addProperty({name, address, companyId, req}){
//   console.log('add property function ------->')
//   console.log([name, address, companyId])
//
//   return Company.findById(companyId)
//     .then(company => {
//       console.log(company)
//       // company.properties = []
//       return { name, address, companyId }
//     })
//
//   //
// }

module.exports = { addCompany };
