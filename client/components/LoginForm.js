import React, { Component } from 'react'
import AuthForm from './AuthForm'
import mutation from '../mutations/Login'
import { graphql } from 'react-apollo'
import query from '../queries/CurrentUser'
import { hashHistory } from 'react-router'

class LoginForm extends Component {
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

  onSubmit({ email,password }){
    this.props.mutate({
      variables: { email,password },
      refetchQueries: [{query}]
    }).catch(res => {
      const errors = res.graphQLErrors.map(error => error.message)
      this.setState({ errors })
    })
  }

  render(){
    return (
      <div className='container'>
        <div className='login-form'>
          <h5 className='text-center'>Login</h5>
          <AuthForm
            form='login'
            errors={this.state.errors}
            onSubmit={this.onSubmit.bind(this)}
          />
        </div>

      </div>
    )
  }
}

export default graphql(query)(
  graphql(mutation)(LoginForm)
)
