import gql from 'graphql-tag'

export default gql`
  mutation deleteUnit($unitId: String!, $propertyId: String!){
    deleteUnit(unitId: $unitId, propertyId: $propertyId){
      id
      tenantName
      cellNumber
      email
      rentAmount
      dueDate
      paidStatus
    }
  }
`
