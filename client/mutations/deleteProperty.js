import gql from 'graphql-tag'

export default gql`
  mutation deleteProperty($propertyId: String!){
    deleteProperty(propertyId: $propertyId){
      id
      address
      propertyName
    }
  }
`
