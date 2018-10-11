import React, { Component } from 'react'
import AuthForm from './AuthForm'
import { graphql } from 'react-apollo'
import mutation from '../mutations/Signup'
import query from '../queries/CurrentUser'
import { hashHistory } from 'react-router'

class SignupForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      errors: []
    }
  }

  componentWillUpdate(nextProps){
    if(!this.props.data.user && nextProps.data.user){
      console.log('logged in!')
      hashHistory.push('/dashboard')
    }
  }

  onSubmit({ email, password }){
    this.props.mutate({
      variables: { email, password },
      refetchQueries: [{query}]
    }).catch(res => {
      const errors = res.graphQLErrors.map(error => error.message)
      console.log(errors)
      this.setState({ errors })
    })

  }

  render(){
    return(
      <div>
        <h5>Sign Up</h5>
        <AuthForm
          errors={this.state.errors}
          onSubmit={this.onSubmit.bind(this)}
        />
      </div>
    )
  }
}


export default graphql(query)(
  graphql(mutation)(SignupForm)
)
