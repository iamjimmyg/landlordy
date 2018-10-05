const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList
} = graphql;
//const PropertyType = require('./property_type')
//const UserType = require('./user_type')
// const passport = require('passport');
// const User = require('../../models/user')


const PropertyType = new GraphQLObjectType({
  name: 'PropertyType',
  fields: () => ({
    id: {type: GraphQLID },
    name: { type: GraphQLString },
    address: { type: GraphQLString },
  })
});

module.exports = PropertyType;
