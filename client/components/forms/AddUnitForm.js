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
      currency: '',
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
    const currency = this.state.currency
    const rentAmount = this.state.rentAmount
    const dueDate = this.state.dueDate

    this.props.mutate({
      variables: { propertyId, tenantName, cellNumber, email, currency, rentAmount, dueDate },
      refetchQueries: [{query}]
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
              <label htmlFor="currency">Currency</label>
              <select className="form-control"
                value={this.state.currency}
                onChange={e => this.setState({ currency: e.target.value })}
                placeholder="Select currency"
                id="currency">
                <option selected>Select Currency</option>
                <option>Colones</option>
                <option>Dollars</option>
              </select>
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
              <label htmlFor="dueDate">Due Date</label>
              <select className="form-control"
                value={this.state.dueDate}
                onChange={e => this.setState({ dueDate: e.target.value })}
                placeholder="Select due date"
                id="dueDate">
                <option>Select date</option>
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
