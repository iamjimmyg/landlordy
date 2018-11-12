import gql from 'graphql-tag'

export default gql`
  mutation changeAmountOwed($unitId: String!, $propertyId: String!, $paidStatus: Boolean, $amountOwed: Int){
    updateUnit(unitId: $unitId, propertyId: $propertyId, paidStatus: $paidStatus, amountOwed: $amountOwed){
      id
      paidStatus
      amountOwed
    }
  }
`
