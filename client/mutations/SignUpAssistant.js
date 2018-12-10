import gql from 'graphql-tag'

export default gql`
  mutation signupAssistant($fullName: String!,$email: String!, $password: String!, $companyId: String!){
    signupAssistant(fullName: $fullName, email: $email, password: $password, companyId: $companyId){
      id
      fullName
      email
    }
  }
`
