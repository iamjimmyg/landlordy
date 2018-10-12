import gql from 'graphql-tag'

export default gql`
  mutation Signup($fullName: String!,$email: String!, $password: String!){
    signup(fullName: $fullName, email: $email, password: $password){
      id
      fullName
      email
    }
  }
`
