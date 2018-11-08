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
      currency: '',
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
        currency: nextProps.unit.currency,
        rentAmount: nextProps.unit.rentAmount,
        dueDate: nextProps.unit.dueDate,

      })
    }
  }

  deleteUnit(event){
    event.preventDefault()
    if(confirm('Are you sure you want to delete this unit?')){
      console.log('delete')
      const unitId = this.props.unit.id
      const propertyId = this.props.propertyId
      this.props.deleteUnit({
        variables: { unitId, propertyId },
        refetchQueries: [{query}]
      }).then(res=>{
        this.setState({ tenantName: '', cellNumber: '', email: '', currency: '', rentAmount: '', dueDate: '', errors: [] })
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
    const currency = this.state.currency
    const dueDate = this.state.dueDate

    this.props.updateUnit({
      variables: { unitId, propertyId, tenantName, cellNumber, email, currency, rentAmount, dueDate },
    }).then(res=>{
      this.setState({ tenantName: '', cellNumber: '', email: '', currency: '', rentAmount: '', dueDate: '', errors: [] })
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
              <label htmlFor="Email">Email</label>
              <input type=""
                className="form-control"
                id="email"
                value={this.state.email}
                onChange={e => this.setState({ email: e.target.value })}
                placeholder="Enter email" />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="currency">Currency</label>
              <select className="form-control"
                value={this.state.currency}
                onChange={e => this.setState({ currency: e.target.value })}
                placeholder="Select currency"
                id="currency">
                <option>Colones</option>
                <option>Dollars</option>
              </select>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="rentAmount">Rent Amount</label>
              <input type=""
                className="form-control"
                id="rentAmount"
                value={this.state.rentAmount}
                onChange={e => this.setState({ rentAmount: e.target.value })}
                placeholder="Enter rent amount" />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="dueDate">Due Date</label>
              <select className="form-control"
                value={this.state.dueDate}
                onChange={e => this.setState({ dueDate: e.target.value })}
                placeholder="Select due date"
                id="dueDate">
                <option>1</option><option>2</option><option>3</option><option>4</option>
                <option>5</option><option>6</option><option>7</option><option>8</option>
                <option>9</option><option>10</option><option>11</option><option>12</option>
                <option>13</option><option>14</option><option>15</option><option>16</option>
                <option>17</option><option>18</option><option>19</option><option>20</option>
                <option>21</option><option>22</option><option>23</option><option>24</option>
                <option>25</option><option>26</option><option>27</option><option>28</option>
                <option>29</option><option>30</option>
              </select>
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
