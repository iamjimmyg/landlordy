import React, { Component } from 'react'
import mutation from '../../mutations/unitPaid'

import { graphql } from 'react-apollo'
import query from '../../queries/CurrentUser'

class UnitPaidForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      paidStatus: ''
    }
    this.onSelect = this.onSelect.bind(this)
  }

  componentWillMount(){
    this.setState({
      paidStatus: this.props.unit.paidStatus,
    })
  }

  onSelect(boolean){
    event.preventDefault()
    const unitId = this.props.unit.id
    const propertyId = this.props.propertyId
    const paidStatus = boolean

    this.props.mutate({
      variables: { unitId, propertyId, paidStatus },
      refetchQueries: [{query}]
    }).then(res => {
      this.setState({ paidStatus: paidStatus, errors: [] })
    }).catch(res => {
      const errors = res.graphQLErrors.map(error => error.message)
      alert(errors[0])
      this.setState({ errors })
    })
  }

  render(){

    return (
      <div className='unit-paid-buttons'>
        <form >
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

      </div>

    )
  }
}

export default graphql(query)(
  graphql(mutation)(UnitPaidForm)
)
