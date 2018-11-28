import React, { Component } from 'react'

import mutation from '../../mutations/unitPaid'
import { graphql } from 'react-apollo'
import query from '../../queries/CurrentUser'

class AmountOwedForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      amountOwed: '',
      paidStatus: '',
      errors: []
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillMount(){
    this.setState({
      paidStatus: this.props.unit.paidStatus,
      amountOwed: this.props.unit.amountOwed,
    })
  }

  componentWillUpdate(nextProps){
    if(nextProps !== this.props){
      this.setState({
        paidStatus: this.props.unit.paidStatus,
        amountOwed: this.props.unit.amountOwed,
      })
    }
  }

  onSubmit(amount){

    const unitId = this.props.unit.id
    const propertyId = this.props.propertyId

    amount = amount.split(',').join()
    console.log(amount)
    const paidStatus = amount > 0 ? false : true
    const amountOwed = amount

    this.props.mutate({
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
      <div className="input-group input-group-sm">
        <div className="input-group-prepend">
          <span className="input-group-text" id="inputGroup-sizing-sm">{this.props.unit.currency === 'Dollars' ? '$' : '₡'}</span>
        </div>
        <input onChange={e => this.setState({ amountOwed: e.target.value })} type="text" className="form-control" value={this.state.amountOwed} />
        <div className="input-group-append">
          <button onClick={()=>{this.onSubmit(this.state.amountOwed)}} className="btn btn-outline-secondary" type="button"><i className="material-icons">check</i></button>
        </div>
      </div>

    )
  }
}

export default graphql(query)(
  graphql(mutation)(AmountOwedForm)
)
