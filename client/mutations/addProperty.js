import gql from 'graphql-tag'

export default gql`
  mutation addProperty($companyId: String!, $propertyName: String!, $address: String!){
    addProperty(propertyName: $propertyName, address: $address, companyId: $companyId){
      id
      address
      propertyName
    }
  }
`
