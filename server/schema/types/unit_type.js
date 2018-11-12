const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLBoolean
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
    currency: { type: GraphQLString },
    paidStatus: { type: GraphQLBoolean },
    amountOwed: { type: GraphQLInt },
  })
});

module.exports = UnitType;
