import React, { Component } from 'react'
import { dateAndDueInfo } from '../../../helpers/DateHelper'

class OverDueTenants extends Component {

  render(){
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]
    let date = new Date()
    let currentMonth = date.getMonth()
    let currentDay = date.getDate()
    let currentYear = date.getFullYear()

    const { loading, user } = this.props.data
    let overDueTenantsArray = []
    let overDuePropertiesArray = []
    user.company.properties.forEach(property => {
      property.units.forEach(unit => {
        if(!unit.paidStatus) {
          overDueTenantsArray.push(unit)
          overDuePropertiesArray.push(property)
        }
      })
    })

    let overDueTenants = overDueTenantsArray.map((unit, i) => {
      let dateAndOverDue = dateAndDueInfo(unit)
      return <tr className='row no-gutters' key={unit.id}>
        <td className='col'>{unit.tenantName}</td>
        <td className='col'>{overDuePropertiesArray[i].propertyName}</td>
        <td className='col d-none d-sm-block'>{months[dateAndOverDue.monthDue]} {unit.dueDate}, {dateAndOverDue.yearDue}</td>
        <td className='col'>{unit.currency === 'Dollars'?'$':'₡'}{unit.amountOwed.toLocaleString()}</td>
      </tr>
    })

    return (
      <div className='col-xl-6'>
        <div className='overdue-section'>
          <h5 className=''>Overdue Tenants</h5>
          <table>
            <thead>
              <tr className='row no-gutters'>
                <td className='small-text col'>Tenant: </td>
                <td className='small-text col'>Property: </td>
                <td className='small-text col d-none d-sm-block'>Due Date: </td>
                <td className='small-text col'>Amount Owed: </td>
              </tr>
            </thead>
            <tbody>
              {overDueTenants}
            </tbody>
          </table>
        </div>
      </div>

    )
  }
}

export default OverDueTenants
