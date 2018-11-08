import gql from 'graphql-tag'

export default gql`
  mutation updateProperty($propertyId: String!, $propertyName: String!, $address: String!){
    updateProperty(propertyId: $propertyId, propertyName: $propertyName, address: $address){
      id
      address
      propertyName
    }
  }
`
