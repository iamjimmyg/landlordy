import gql from 'graphql-tag'

export default gql`
  mutation updateUnit($unitId: String!, $propertyId: String!, $tenantName: String, $cellNumber: String, $email: String, $rentAmount: Int, $dueDate: Int, $paidStatus: Boolean){
    updateUnit(unitId: $unitId, propertyId: $propertyId, tenantName: $tenantName, cellNumber: $cellNumber, email: $email, rentAmount: $rentAmount, dueDate: $dueDate, paidStatus: $paidStatus){
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
