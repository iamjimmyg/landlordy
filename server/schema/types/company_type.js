const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList
} = graphql;

const UserType = require('./user_type')
const passport = require('passport');
const User = require("../../models/user")


const CompanyType = new GraphQLObjectType({
  name: 'CompanyType',
  fields: () => ({
    id: {type: GraphQLID },
    name: { type: GraphQLString },
    user: {
      type: GraphQLID,
      resolve(parent, args, req){
        console.log(User)
        return parent.userId
      }
    }
  })
});

module.exports = CompanyType;
