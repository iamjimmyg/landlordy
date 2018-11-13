const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLList
} = graphql;

const UserType = require('./types/user_type');
const CompanyType = require('./types/company_type');
const PropertyType = require('./types/property_type');
const UnitType = require('./types/unit_type')

const mongoose = require('mongoose');
const Company = mongoose.model('company');

const AuthService = require('../services/auth');
const Helper = require('../services/helper');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signup: {
      type: UserType,
      args: {
        fullName: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        companyName: { type: new GraphQLNonNull(GraphQLString) },
        companyId: {type: GraphQLString }
      },
      resolve(parentValue, { fullName, email, password, companyName }, req){
        return AuthService.signup({ fullName, email, password, companyName, req})
      }
    },
    signupAssistant: {
      type: UserType,
      args: {
        fullName: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        companyId: {type: GraphQLString }
      },
      resolve(parent, { fullName, email, password, companyId}, req){
        return AuthService.signupAssistant({ email, password, companyId, req })
      }
    },
    logout: {
      type: UserType,
      resolve(parentValue, args, req){
        const { user } = req;
        req.logout();
        console.log(user)
        return user;
      }
    },
    login: {
      type: UserType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { email, password }, req){
        return AuthService.login({ email, password, req})
      }
    },
    addCompany: {
      type: CompanyType,
      args: {
        companyName: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { companyName, userId }, req) {

        return Helper.addCompany({companyName, userId, req});
      }
    },
    addProperty: {
      type: PropertyType,
      args: {
        companyId: { type: new GraphQLNonNull(GraphQLString) },
        propertyName: { type: new GraphQLNonNull(GraphQLString) },
        address: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, { propertyName, address }, req){
        return Helper.addProperty({propertyName, address, companyId: req.user.companyId})
      }
    },
    updateProperty: {
      type: PropertyType,
      args: {
        propertyId: { type: GraphQLString },
        propertyName: { type: GraphQLString },
        address: { type: GraphQLString },
      },
      resolve(parent, { propertyName, address, propertyId }, req){
        return Helper.updateProperty({ propertyName, address, companyId: req.user.companyId, propertyId })
      }
    },
    deleteProperty: {
      type: PropertyType,
      args: {
        propertyId: { type: GraphQLString }
      },
      resolve(parent, { propertyId }, req){
        return Helper.deleteProperty({ propertyId, companyId: req.user.companyId })
      }
    },
    addUnit: {
      type: UnitType,
      args: {
        propertyId: { type: GraphQLString },
        tenantName: { type: GraphQLString },
        cellNumber: { type: GraphQLString },
        email: { type: GraphQLString },
        rentAmount: { type: GraphQLInt },
        currency: { type: GraphQLString },
        dueDate:{ type: GraphQLInt },
        paidStatus: { type: GraphQLBoolean },
      },
      resolve(parent, { propertyId, tenantName, cellNumber, email, rentAmount, currency, dueDate, paidStatus }, req){
        return Helper.addUnit({ propertyId, tenantName, cellNumber, email, rentAmount, currency, dueDate, paidStatus, companyId: req.user.companyId })
      }
    },
    updateUnit: {
      type: UnitType,
      args: {
        unitId: { type: GraphQLString },
        propertyId: { type: GraphQLString },
        tenantName: { type: GraphQLString },
        cellNumber: { type: GraphQLString },
        email: { type: GraphQLString },
        rentAmount: { type: GraphQLInt },
        currency: { type: GraphQLString },
        dueDate:{ type: GraphQLInt },
        paidStatus: { type: GraphQLBoolean },
      },
      resolve(parent, { unitId, propertyId, tenantName, cellNumber, email, rentAmount, currency, dueDate, paidStatus }, req){
        return Helper.updateUnit({ unitId, propertyId, tenantName, cellNumber, email, rentAmount, currency, dueDate, paidStatus, companyId: req.user.companyId })
      }
    },
    deleteUnit: {
      type: UnitType,
      args: {
        unitId: { type: GraphQLString },
        propertyId: { type: GraphQLString },
      },
      resolve(parent, { unitId, propertyId }, req){
        return Helper.deleteUnit({ unitId, propertyId, companyId: req.user.companyId })
      }
    },
    unitPaid: {
      type: UnitType,
      args: {
        unitId: { type: GraphQLString },
        propertyId: { type: GraphQLString },
        paidStatus: { type: GraphQLBoolean },
        amountOwed: { type: GraphQLInt },
      },
      resolve(parent, { unitId, propertyId, paidStatus, amountOwed }, req){
        return Helper.unitPaid({ unitId, propertyId, paidStatus, amountOwed, companyId: req.user.companyId })
      }
    },
    changeAmountOwed: {
      type: UnitType,
      args: {
        unitId: { type: GraphQLString },
        propertyId: { type: GraphQLString },
        paidStatus: { type: GraphQLBoolean },
        amountOwed: { type: GraphQLInt },
      },
      resolve(parent, {  unitId, propertyId, paidStatus, amountOwed }, req){
        return Helper.changeAmountOwed({ unitId, propertyId, paidStatus, amountOwed, companyId: req.user.companyId })
      }
    }
  }
});

module.exports = mutation;
