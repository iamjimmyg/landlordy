const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList
} = graphql;

const UnitType = require('./unit_type')

const PropertyType = new GraphQLObjectType({
  name: 'PropertyType',
  fields: () => ({
    id: {type: GraphQLID },
    propertyName: { type: GraphQLString },
    address: { type: GraphQLString },
    units: {
      type: new GraphQLList(UnitType),
      resolve(parent, args, req){
        return parent.units
      }
    }
  })
});

module.exports = PropertyType;
