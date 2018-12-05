import React, { Component } from 'react'

class AuthForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  onSubmit(event){
    event.preventDefault()
    this.props.onSubmit(this.state)
  }

  render(){

    return (
      <div className='row'>
        <form onSubmit={this.onSubmit.bind(this)} className='col'>
          <div className='input-field'>
            <input className='form-control'
              placeholder='Email or user ID'
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
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
          <div style={{position: 'relative'}}>
            <div style={{color: 'red', marginBottom: '7px', position: 'absolute', top: '-34px'}}>
              {this.props.errors.map(error => <div key={error}>{error}</div>)}
            </div>
          </div>


          <button className='btn auth-button'>
            <div><i className="material-icons">lock</i>Sign In</div>

          </button>
        </form>
      </div>

    )
  }
}

export default AuthForm
