const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLString,
  GraphQLID,
  GraphQLList
} = graphql;
const CompanyType = require('./company_type')
const Company = require('../../models/company')

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    id: { type: GraphQLID },
    fullName: { type: GraphQLString },
    email: { type: GraphQLString },
    isAdmin: { type: GraphQLBoolean },
    company: {
      type: CompanyType,
      resolve(parent, args){
        return Company.findById(parent.companyId)
      }
    }
  })
});

module.exports = UserType;
