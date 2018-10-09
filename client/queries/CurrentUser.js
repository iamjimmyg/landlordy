import gql from 'graphql-tag'

export default gql`
  {
    user {
      id
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
            dueDate
            paidStatus
          }
        }
      }
    }
  }
`
