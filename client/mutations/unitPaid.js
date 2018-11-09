import gql from 'graphql-tag'

export default gql`
  mutation unitPaid($unitId: String!, $propertyId: String!, $paidStatus: Boolean){
    updateUnit(unitId: $unitId, propertyId: $propertyId, paidStatus: $paidStatus){
      id
      paidStatus
    }
  }
`
