const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList
} = graphql;

const UserType = require('./types/user_type');
const CompanyType = require('./types/company_type');
const PropertyType = require('./types/property_type');

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
        propertyName: { type: new GraphQLNonNull(GraphQLString) },
        address: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, { propertyName, address }, req){
        return Company.findById(req.user.companyId)
          .then(company => {
            company.properties.push({propertyName: propertyName, address: address})
            company.save()
            let property = company.properties.find(prop => {return prop.propertyName === propertyName})
            return property
          })

      }
    }
  }
});

module.exports = mutation;
