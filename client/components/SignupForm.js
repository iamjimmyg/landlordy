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
      errors: [],
      fullName: '',
      email: '',
      companyName: '',
      password: '',
    }
  }

  componentWillUpdate(nextProps){
    if(!this.props.data.user && nextProps.data.user){
      console.log('logged in!')
      hashHistory.push('/dashboard')
    }
  }

  onSubmit(event){
    let fullName = this.state.fullName
    let email = this.state.email
    let companyName = this.state.companyName
    let password = this.state.password

    this.props.mutate({
      variables: { fullName, email, companyName, password },
      refetchQueries: [{query}]
    }).catch(res => {
      const errors = res.graphQLErrors.map(error => error.message)
      console.log(errors)
      this.setState({ errors })
    })

  }

  render(){
    return(
      <div className='container'>
        <div className='signup-form'>
          <h5 className='text-center'>Sign Up</h5>

          <div className='row'>
            <form onSubmit={this.onSubmit.bind(this)} className='col s4'>
              <div className='input-field'>
                <input className='form-control'
                  placeholder='Full Name'
                  value={this.state.fullName}
                  onChange={e => this.setState({ fullName: e.target.value })}
                />
              </div>
              <div className='input-field'>
                <input className='form-control'
                  placeholder='Email or user ID'
                  value={this.state.email}
                  onChange={e => this.setState({ email: e.target.value })}
                />
              </div>
              <div className='input-field'>
                <input className='form-control'
                  placeholder='Company Name'
                  value={this.state.companyName}
                  onChange={e => this.setState({ companyName: e.target.value })}
                />
              </div>
              <div className='input-field'>
                <input className='form-control'
                  placeholder='Password'
                  type='password'
                  value={this.state.password}
                  onChange={e => this.setState({ password: e.target.value })}
                />
              </div>
              <div style={{color: 'red', marginBottom: '7px'}}>
                {this.state.errors.map(error => <div key={error}>{error}</div>)}
              </div>

              <button className='btn'>Submit</button>
            </form>
          </div>

        </div>

      </div>
    )
  }
}


export default graphql(query)(
  graphql(mutation)(SignupForm)
)
