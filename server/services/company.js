const mongoose = require('mongoose');

const Company = mongoose.model('company');
const User = mongoose.model('user')

// function updateCompanyRequest(){
//   Company.findById(id, (err, company) => {
//     done(err, company);
//   });
// }

function updateUser(company){
  return User.findById(company.userId)
    .then(user => {
      user.companyId = company.id
      user.save(function(err){
        if(err) throw new Error('user did not update companyId')
      })
    })
}

function addCompany({name, userId, req} ) {
  if(!name) {
    throw new Error('You must provide a company name.');
  }
  //check if company exists, if it doesnt, create a new one and save to db
  return Company.findOne({name})
    .then(company => {

      if(company === null){
        const newCompany = new Company({name, userId})

        newCompany.save(function (err){
          if(err) throw new Error('Company did not save')
        })
        updateUser(newCompany)
        return newCompany
        // return new Promise((resolve, reject) => {
        //   resolve(newCompany);
        // });
      }else if(company.name === name) {
        throw new Error('This company already exists')
      }
    })
}



module.exports = { addCompany };
