import React, { Component } from 'react'
import { Link } from 'react-router'

import mutation from '../../mutations/addUnit'
import { graphql } from 'react-apollo'
import query from '../../queries/CurrentUser'

class AddUnitForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      tenantName: '',
      cellNumber: '',
      email: '',
      rentAmount: '',
      dueDate: '',
      errors: []
    }
  }

  onSubmit(event){
    console.log('submit')
    event.preventDefault()
    const propertyId = this.props.propertyId
    const tenantName = this.state.tenantName
    const cellNumber = this.state.cellNumber
    const email = this.state.email
    const rentAmount = this.state.rentAmount
    const dueDate = this.state.dueDate

    this.props.mutate({
      variables: { propertyId, tenantName, cellNumber, email, rentAmount, dueDate },
      refetchQueries: [{query}]
    }).then(res=>{
      this.setState({ tenantName: '', cellNumber: '', email: '', rentAmount: '', dueDate: '', errors: [] })
    }).catch(res => {
      const errors = res.graphQLErrors.map(error => error.message)
      alert(errors[0])
      this.setState({ errors })
    })
  }

  render(){
    return (
      <div className=''>
        <h5>Add Unit</h5>
        <form>
          <div className='row'>
            <div className="form-group col-md-6">
              <label htmlFor="tenantName">Tenant Name</label>
              <input type=""
                className="form-control"
                id="tenantName"
                value={this.state.tenantName}
                onChange={e => this.setState({ tenantName: e.target.value })}
                placeholder="Enter tenant name" />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="tenantName">Cell Number</label>
              <input type=""
                className="form-control"
                id="cellNumber"
                value={this.state.cellNumber}
                onChange={e => this.setState({ cellNumber: e.target.value })}
                placeholder="Enter cell number" />
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
              <label htmlFor="tenantName">Rent Amount</label>
              <input type=""
                className="form-control"
                id="rentAmount"
                value={this.state.rentAmount}
                onChange={e => this.setState({ rentAmount: e.target.value })}
                placeholder="Enter rent amount" />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="tenantName">Due Date</label>
              <input type=""
                className="form-control"
                id="dueDate"
                value={this.state.dueDate}
                onChange={e => this.setState({ dueDate: e.target.value })}
                placeholder="Enter amount due" />
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
  graphql(mutation)(AddUnitForm)
)
