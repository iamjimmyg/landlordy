const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID } = graphql;



const UserType = require('./user_type')
const CompanyType = require('./company_type')
const Company = require("../../models/company")

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, args, req){
        //console.log(req.user)
        return req.user;
      }
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, args, req){
        return Company.findById(args.id)
      }
    }
  })

});

module.exports = RootQueryType;
