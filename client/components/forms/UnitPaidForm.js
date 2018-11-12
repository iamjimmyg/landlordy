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

    this.props.unitPaid({
      variables: { unitId, propertyId, paidStatus, },
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
            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
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
