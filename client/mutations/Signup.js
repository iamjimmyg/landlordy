import gql from 'graphql-tag'

export default gql`
  mutation Signup($fullName: String!,$email: String!, $companyName: String!, $password: String!){
    signup(fullName: $fullName, email: $email, companyName: $companyName, password: $password){
      id
      fullName
      email
      companyName
    }
  }
`
