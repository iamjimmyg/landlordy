const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList
} = graphql;
const PropertyType = require('./property_type')

const CompanyType = new GraphQLObjectType({
  name: 'CompanyType',
  fields: () => ({
    id: {type: GraphQLID },
    companyName: { type: GraphQLString },
    users: {
      type: GraphQLID,
      resolve(parent, args, req){
        console.log('company type -> users resolve', parent)
        return parent.userId
      }
    },
    properties: {
      type: new GraphQLList(PropertyType),
      resolve(parent, args, req){
        return parent.properties
      }
    }
  })
});

module.exports = CompanyType;
