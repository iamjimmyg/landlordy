import gql from 'graphql-tag'

export default gql`
  mutation addCompany($companyName: String!, $userId: String!){
    addCompany(companyName: $companyName, userId: $userId){
      id
      companyName
    }
  }
`
