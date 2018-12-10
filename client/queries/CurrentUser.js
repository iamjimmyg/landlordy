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
        users
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
