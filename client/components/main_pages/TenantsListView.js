import React, { Component } from 'react'
import EditUnitForm from '../forms/EditUnitForm'
import UnitPaidForm from '../forms/UnitPaidForm'
import EditPropertyForm from '../forms/EditPropertyForm'
import AmountOwedForm from '../forms/AmountOwedForm'

import mutation from '../../mutations/unitPaid'
import { graphql } from 'react-apollo'
import query from '../../queries/CurrentUser'

import { dateAndDueInfo } from '../../helpers/DateHelper'

import { Link } from 'react-router'

class TenantsListView extends Component {
  constructor(props){
    super(props)
    this.onSelect = this.onSelect.bind(this)
    this.viewProperty = this.viewProperty.bind(this)
  }

  onSelect(boo, unitId, propertyId, rentAmount){
    const paidStatus = boo
    const amountOwed = paidStatus === true ? 0 : rentAmount

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

  viewProperty(property){
    this.props.viewProperty(property)
  }

  render(){

    let units = []
    let properties =[]
    this.props.data.user.company.properties.forEach(property => {
      property.units.forEach(unit => {
        properties.push(property)
        units.push(unit)
      })
    })

    let tenants = units.map((unit, i) => {
      return <tr className='row no-gutters' key={unit.id}>
        <td className='col'>{unit.tenantName}</td>
        <td className='col d-none d-sm-block'>
          <button type=""
            onClick={()=>{this.viewProperty(properties[i])}}
            className='view-property-button'>
            {properties[i].propertyName}
          </button>
        </td>
        <td className='col d-none d-lg-block'>{unit.cellNumber}</td>
        <td className='col-3 d-none d-xl-block'>{unit.email}</td>
        <td className='col d-none d-lg-block'>{unit.currency === 'Dollars'?'$':'₡'}{unit.rentAmount.toLocaleString()}</td>
        <td className='col'>
          {this.props.data.user.isAdmin ? <div className="btn-group" role="group" aria-label="Basic example">
            <button type="button" className={`overdue btn btn-secondary ${unit.paidStatus ? '' : 'active'}`}
              onClick={()=>{this.onSelect(false, unit.id, properties[i].id, unit.rentAmount)}}
              >Due</button>
            <button type="button" className={`paid btn btn-secondary ${unit.paidStatus ? 'active' : ''}`}
              onClick={()=>{this.onSelect(true, unit.id, properties[i].id)}}
              >Paid</button>
          </div> : (unit.paidStatus ? 'Paid' : 'Due')}
        </td>
        <td className='col'>{this.props.data.user.isAdmin ? <AmountOwedForm propertyId={properties[i].id} unit={unit}/> :
          <div>{unit.currency === 'Dollars' ? '$' : '₡'}{unit.amountOwed.toLocaleString()}</div>
          }
        </td>

      </tr>
    })


    return (
      <div className='list-view'>
        <table>
          <thead>
            <tr className='row no-gutters'>
              <td className='small-text col'>Tenant: </td>
              <td className='small-text col d-none d-sm-block'>Property: </td>
              <td className='small-text col d-none d-lg-block'>Cell Number: </td>
              <td className='small-text col-3 d-none d-xl-block'>Email: </td>
              <td className='small-text col d-none d-lg-block'>Rent Amount: </td>
              <td className='small-text col'>Status: </td>
              <td className='small-text col'>Amount Owed: </td>
            </tr>
          </thead>
          <tbody>
            {tenants}
          </tbody>
        </table>
      </div>
    )
  }
}

export default graphql(query)(
  graphql(mutation)(TenantsListView)
)
