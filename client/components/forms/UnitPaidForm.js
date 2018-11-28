import React, { Component } from 'react'
import unitPaid from '../../mutations/unitPaid'
import changeAmountOwed from '../../mutations/changeAmountOwed'
import AmountOwedForm from './AmountOwedForm'

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
      <div className='unit-paid-buttons row no-gutters'>
        <div className="btn-group col" role="group" aria-label="Basic example">
          <button type="button" className={`overdue btn btn-secondary ${this.props.unit.paidStatus ? '' : 'active'}`}
            onClick={()=>{this.onSelect(false)}}
            >Due</button>
          <button type="button" className={`paid btn btn-secondary ${this.props.unit.paidStatus ? 'active' : ''}`}
            onClick={()=>{this.onSelect(true)}}
            >Paid</button>
        </div>
        <div className='col'>
          <AmountOwedForm propertyId={this.props.propertyId} unit={this.props.unit}/>
        </div>

      </div>

    )
  }
}


const ComponentWithMutations = graphql(unitPaid, { name: 'unitPaid' })(
  graphql(changeAmountOwed, {name: 'changeAmountOwed'})(UnitPaidForm)
)

export default ComponentWithMutations
