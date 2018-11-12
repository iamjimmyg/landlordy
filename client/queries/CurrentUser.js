import gql from 'graphql-tag'

export default gql`
  {
    user {
      id
      fullName
      email
      isAdmin
      company {
        id
        companyName
        properties{
          id
          propertyName
          address
          units {
            id
            tenantName
            cellNumber
            email
            rentAmount
            currency
            dueDate
            paidStatus
            amountOwed
          }
        }
      }
    }
  }
`
