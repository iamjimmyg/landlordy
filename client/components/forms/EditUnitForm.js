import React, { Component } from 'react'
import { Link } from 'react-router'

import updateUnit from '../../mutations/updateUnit'
import deleteUnit from '../../mutations/deleteUnit'
import { graphql } from 'react-apollo'
import query from '../../queries/CurrentUser'

class EditUnitForm extends Component {
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

  componentWillUpdate(nextProps){
    if(nextProps.unit !== this.props.unit){
      this.setState({
        tenantName: nextProps.unit.tenantName,
        cellNumber: nextProps.unit.cellNumber,
        email: nextProps.unit.email,
        rentAmount: nextProps.unit.rentAmount,
        dueDate: nextProps.unit.dueDate,

      })
    }
  }

  deleteUnit(event){
    console.log('delete')
    event.preventDefault()
    if(confirm('Are you sure you want to delete this unit?')){
      const unitId = this.props.unit.id
      const propertyId = this.props.propertyId
      this.props.deleteUnit({
        variables: { unitId, propertyId },
        refetchQueries: [{query}]
      }).then(res=>{
        this.setState({ tenantName: '', cellNumber: '', email: '', rentAmount: '', dueDate: '', errors: [] })
      }).catch(res => {
        const errors = res.graphQLErrors.map(error => error.message)
        alert(errors[0])
        this.setState({ errors })
      })
    }
  }

  onSubmit(event){
    console.log('submit')
    event.preventDefault()
    const unitId = this.props.unit.id
    const propertyId = this.props.propertyId
    const tenantName = this.state.tenantName
    const cellNumber = this.state.cellNumber
    const email = this.state.email
    const rentAmount = this.state.rentAmount
    const dueDate = this.state.dueDate

    this.props.updateUnit({
      variables: { unitId, propertyId, tenantName, cellNumber, email, rentAmount, dueDate },
      //refetchQueries: [{query}]
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


        <div className="modal-footer">
          <button
            data-dismiss="modal"
            onClick={this.deleteUnit.bind(this)}
            className="btn btn-danger">Delete
          </button>
          <button
            data-dismiss="modal"
            onClick={this.onSubmit.bind(this)}
            className="btn btn-primary">Save
          </button>
        </div>

      </div>

    )
  }
}

const ComponentWithMutations = graphql(updateUnit, {name: 'updateUnit'})(
  graphql(deleteUnit, {name: 'deleteUnit'})(EditUnitForm)
)

export default ComponentWithMutations
