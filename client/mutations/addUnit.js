import gql from 'graphql-tag'

export default gql`
  mutation addUnit($propertyId: String!, $tenantName: String, $cellNumber: String, $email: String, $rentAmount: Int, $currency: String, $dueDate: Int, $paidStatus: Boolean){
    addUnit(propertyId: $propertyId, tenantName: $tenantName, cellNumber: $cellNumber, email: $email, rentAmount: $rentAmount, currency: $currency, dueDate: $dueDate, paidStatus: $paidStatus){
      id
      tenantName
      cellNumber
      email
      rentAmount
      currency
      dueDate
      paidStatus
    }
  }
`
