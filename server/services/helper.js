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
  if(!propertyName) throw new Error('You must provide a property name')
  if(!address) throw new Error('You must provide an address')

  return Company.findById(companyId)
    .then(company => {
      company.properties.forEach(prop => {
        if(prop.propertyName === propertyName){
          throw new Error('This property name already exists')
        }
      })
      company.properties.push({propertyName: propertyName, address: address})
      company.save()
      let property = company.properties.find(prop => {return prop.propertyName === propertyName})
      return property
    })
}

function updateProperty({propertyName, address, companyId, propertyId}){
  return Company.findById(companyId)
    .then(company => {
      company.properties.forEach(prop => {
        if(prop.id === propertyId){
          prop.propertyName = propertyName === undefined ? prop.propertyName : propertyName
          prop.address = address === undefined ? prop.address : address
        }
      })
      company.save()
      let property = company.properties.find(prop => {return prop.id === propertyId})
      return property
    })
}

function deleteProperty({ companyId, propertyId }){
  return Company.findById(companyId)
    .then(company => {
      var propertyIndex;
      company.properties.forEach((prop, i) => {
        if(prop.id === propertyId){
          propertyIndex = i
        }
      })
      let property = company.properties.splice(propertyIndex, 1)
      company.save()

      return property[0]
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

function updateUnit({ unitId, propertyId, tenantName, cellNumber, email, rentAmount, dueDate, paidStatus, companyId }){
  return Company.findById(companyId)
    .then(company => {
      company.properties.forEach(property => {
        if(property.id === propertyId){
          property.units.forEach(unit => {
            if(unit.id === unitId){
              unit.tenantName = tenantName === undefined ? unit.tenantName : tenantName
              unit.cellNumber = cellNumber === undefined ? unit.cellNumber : cellNumber
              unit.email      = email === undefined ? unit.email : email
              unit.rentAmount = rentAmount === undefined ? unit.rentAmount : rentAmount
              unit.dueDate    = dueDate === undefined ? unit.dueDate : dueDate
              unit.paidStatus = paidStatus === undefined ? unit.paidStatus : paidStatus
            }
          })
        }
      })
      company.save()
      let findUnit;
      company.properties.forEach(property => {
        if(property.id === propertyId){
          property.units.forEach(unit => {
            if(unit.id === unitId){
              findUnit = unit
            }
          })
        }
      })
      return findUnit
    })
}

function deleteUnit({ unitId, propertyId, companyId }){
  return Company.findById(companyId)
    .then(company => {
      let unitIndex;
      company.properties.forEach(property => {
        if(property.id === propertyId){
          property.units.forEach((unit, i) => {
            if(unit.id === unitId){
              unitIndex = i
            }
          })

        }
      })
      let returnUnit;
      company.properties.forEach(property => {
        if(property.id === propertyId){
          returnUnit = property.units.splice(unitIndex, 1)
        }
      })
      company.save()

      return returnUnit[0]
    })
}

module.exports = { addCompany, addProperty, updateProperty, deleteProperty, addUnit, updateUnit, deleteUnit };
