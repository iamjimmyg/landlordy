const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList
} = graphql;
const PropertyType = require('./property_type')
//const UserType = require('./user_type')
// const passport = require('passport');
// const User = require('../../models/user')
const Company = require('../../models/company')

const CompanyType = new GraphQLObjectType({
  name: 'CompanyType',
  fields: () => ({
    id: {type: GraphQLID },
    companyName: { type: GraphQLString },
    user: {
      type: GraphQLID,
      resolve(parent, args, req){
        return parent.userId
      }
    },
    properties: {
      type: new GraphQLList(PropertyType),
      resolve(parent, args, req){
        console.log("in company type-->property resolver :",parent)
      }
    }
  })
});

module.exports = CompanyType;
