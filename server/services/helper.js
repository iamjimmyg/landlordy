const mongoose = require('mongoose');

const Company = mongoose.model('company');
const User = mongoose.model('user')

function updateUser(company){

  return User.findById(company.users[0])
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
        newCompany.users.push(userId)
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

function addProperty({propertyName, address, companyId}){
  // if(!companyName) throw new Error('You must provide a property name')
  // if(!address) throw new Error('You must provide an address')

  return Company.findById(companyId)
    .then(company => {
      company.properties.push({propertyName: propertyName, address: address})
      company.save()
      let property = company.properties.find(prop => {return prop.propertyName === propertyName})
      return property
    })
}

function addUnit({ propertyId, tenantName, cellNumber, email, rentAmount, dueDate, paidStatus, companyId }){
  let newUnit = { tenantName, cellNumber, email, rentAmount, dueDate, paidStatus }
  return Company.findById(companyId)
    .then(company => {
      company.properties.forEach(property => {
        if(property.id === propertyId){
          property.units.forEach(unit => {
            if(unit.email === email && unit.tenantName === tenantName) throw new Error('This tenant already exists')
          })
          property.units.push(newUnit)
        }

      })
      company.save()
      let findUnit;
      company.properties.forEach(property => {
        if(property.id === propertyId){
          property.units.forEach(unit => {
            if(unit.email === email){
              findUnit = unit
            }
          })
        }
      })
      return findUnit
    })
}

module.exports = { addCompany, addProperty, addUnit };
