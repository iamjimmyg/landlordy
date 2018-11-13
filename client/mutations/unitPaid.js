import gql from 'graphql-tag'

export default gql`
  mutation unitPaid($unitId: String!, $propertyId: String!, $paidStatus: Boolean, $amountOwed: Int){
    unitPaid(unitId: $unitId, propertyId: $propertyId, paidStatus: $paidStatus, amountOwed: $amountOwed){
      id
      paidStatus
      amountOwed
    }
  }
`
