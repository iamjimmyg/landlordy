import React, { Component } from 'react'
import { Link } from 'react-router'

import mutation from '../../mutations/SignUpAssistant'
import { graphql } from 'react-apollo'
import query from '../../queries/CurrentUser'

class SignUpAssistant extends Component {
  constructor(props){
    super(props)
    this.state = {
      errors: [],
      fullName: '',
      email: '',
      password: '',
    }
  }

  onSubmit(event){
    const fullName = this.state.fullName
    const email = this.state.email
    const password = this.state.password
    const companyId = this.props.data.user.company.id

    this.props.mutate({
      variables: { fullName, email, password, companyId },
      refetchQueries: [{query}]
    }).then(res=>{
      this.setState({ fullName: '', email: '', password: '' })
    }).catch(res => {
      const errors = res.graphQLErrors.map(error => error.message)
      alert(errors[0])
      this.setState({ errors })
    })
  }

  render(){
    return (
      <div className='signup-assistant'>
        <h5>Sign Up Assistant</h5>
        <form>
          <div className='row'>
            <div className="form-group col-md-6">
              <label htmlFor="fullName">Full Name</label>
              <input type=""
                className="form-control"
                id="fullName"
                value={this.state.fullName}
                onChange={e => this.setState({ fullName: e.target.value })}
                placeholder="Enter full name" />
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="tenantName">Email</label>
              <input type=""
                className="form-control"
                id="email"
                value={this.state.email}
                onChange={e => this.setState({ email: e.target.value })}
                placeholder="Enter email" />
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="password">Password</label>
              <input type="password"
                className="form-control"
                id="password"
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}
                placeholder="Enter password" />
            </div>

          </div>

        </form>
          <button
            onClick={this.onSubmit.bind(this)}
            className="btn btn-primary">Submit
          </button>
      </div>

    )
  }
}

export default graphql(query)(
  graphql(mutation)(SignUpAssistant)
)
