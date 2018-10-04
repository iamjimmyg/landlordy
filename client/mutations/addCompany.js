import gql from 'graphql-tag'

export default gql`
  mutation addCompany($name: String!, $userId: String!){
    addCompany(name: $name, userId: $userId){
      id
      name
    }
  }
`
