import React, { Component } from 'react'
import unitPaid from '../../mutations/unitPaid'
import changeAmountOwed from '../../mutations/changeAmountOwed'

import { graphql } from 'react-apollo'
import query from '../../queries/CurrentUser'

class UnitPaidForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      paidStatus: '',
      amountOwed: '',
    }
    this.onSelect = this.onSelect.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillMount(){
    this.setState({
      paidStatus: this.props.unit.paidStatus,
      amountOwed: this.props.unit.amountOwed,
    })
  }

  onSelect(boolean){
    const unitId = this.props.unit.id
    const propertyId = this.props.propertyId
    const paidStatus = boolean
    const amountOwed = paidStatus === true ? 0 : this.props.unit.rentAmount

    this.props.unitPaid({
      variables: { unitId, propertyId, paidStatus, amountOwed },
      refetchQueries: [{query}]
    }).then(res => {
      this.setState({ paidStatus: paidStatus, amountOwed: amountOwed, errors: [] })
    }).catch(res => {
      const errors = res.graphQLErrors.map(error => error.message)
      alert(errors[0])
      this.setState({ errors })
    })
  }

  onSubmit(amountOwed){
    const unitId = this.props.unit.id
    const propertyId = this.props.propertyId
    const paidStatus = amountOwed === 0 ? true : false

    this.props.unitPaid({
      variables: { unitId, propertyId, paidStatus, amountOwed },
      refetchQueries: [{query}]
    }).then(res => {
      this.setState({ paidStatus: paidStatus, amountOwed: amountOwed, errors: [] })
    }).catch(res => {
      const errors = res.graphQLErrors.map(error => error.message)
      alert(errors[0])
      this.setState({ errors })
    })
  }

  render(){
    return (
      <div className='unit-paid-buttons'>
        <button className="btn btn-primary" type="button" data-toggle="collapse" data-target={`#${this.props.collapseId}`} aria-expanded="false">
          Change Total Amount Owed
        </button>

        <form className='unit-paid-button'>
          <div className="btn-group btn-group-toggle" data-toggle="buttons" >
            <label className={`overdue btn btn-secondary ${this.state.paidStatus ? '' : 'active'}`}
              onClick={()=>{this.onSelect(false)}}>
              Over Due
              <input type="radio"/>
            </label>
            <label className={`paid btn btn-secondary ${this.state.paidStatus ? 'active' : ''}`}
              onClick={()=>{this.onSelect(true)}}>
              Paid
              <input type="radio" />
            </label>
          </div>
        </form>


        <div className="collapse" id={this.props.collapseId}>
          <div className="card card-body">
            <form className='d-inline-flex'>

              <div className='currency'>{this.props.unit.currency === 'Dollars' ? '$' : '₡'}</div>
              <label>
                <input className='form-control'
                  value={this.state.amountOwed}
                  onChange={e => this.setState({ amountOwed: e.target.value })}
                  placeholder={this.state.amountOwed.toLocaleString()}/>
              </label>
              <button className='btn'
                onClick={()=>{this.onSubmit(this.state.amountOwed)}}
                >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>

    )
  }
}


const ComponentWithMutations = graphql(unitPaid, { name: 'unitPaid' })(
  graphql(changeAmountOwed, {name: 'changeAmountOwed'})(UnitPaidForm)
)

export default ComponentWithMutations
