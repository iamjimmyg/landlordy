import React, { Component } from 'react'

class AddCompanyForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      userId: this.props.data.user.id
    }
  }

  onSubmit(event){
    event.preventDefault()
    this.props.onSubmit(this.state)
  }

  render(){

    return (
      <div className='row'>
        <h5>What is your company's name?</h5>
        <form
          onSubmit={this.onSubmit.bind(this)}
          className='col s4'>
          <div className='input-field'>
            <input
              placeholder='Company Name'
              value={this.state.name}
              onChange={e => this.setState({ name: e.target.value })}
            />
          </div>
          <div style={{color: 'red', marginBottom: '7px'}}>
            {this.props.errors.map(error => <div key={error}>{error}</div>)}
          </div>
          <button className='btn'>Submit</button>
        </form>
      </div>
    )
  }
}

export default AddCompanyForm
