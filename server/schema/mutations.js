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
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        companyId: {type: GraphQLString }
      },
      resolve(parentValue, { email, password }, req){
        return AuthService.signup({ email, password, req})
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
    addUnit: {
      type: UnitType,
      args: {
        propertyId: { type: GraphQLString },
        tenantName: { type: GraphQLString },
        cellNumber: { type: GraphQLString },
        email: { type: GraphQLString },
        rentAmount: { type: GraphQLInt },
        dueDate:{ type: GraphQLInt },
        paidStatus: { type: GraphQLBoolean },
      },
      resolve(parent, { propertyId, tenantName, cellNumber, email, rentAmount, dueDate, paidStatus }, req){
        return Helper.addUnit({ propertyId, tenantName, cellNumber, email, rentAmount, dueDate, paidStatus, companyId: req.user.companyId })
      }
    },
    signupAssistant: {
      type: UserType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        companyId: {type: GraphQLString }
      },
      resolve(parent, { email, password, companyId}, req){
        return AuthService.signupAssistant({ email, password, companyId, req })
      }
    }
  }
});

module.exports = mutation;
