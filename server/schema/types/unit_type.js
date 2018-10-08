const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt
} = graphql;

const UnitType = new GraphQLObjectType({
  name: 'UnitType',
  fields: () => ({
    id: {type: GraphQLID },
    tenantName: { type: GraphQLString },
    cellNumber: { type: GraphQLString },
    email: { type: GraphQLString },
    rentAmount: { type: GraphQLInt },
    dueDate: { type: GraphQLInt },
    paidStatus: { type: GraphQLString },
  })
});

module.exports = UnitType;
