import React, { Component } from 'react'
import { Link } from 'react-router'

class TenantsOverview extends Component {

  render(){
    let units = []
    this.props.data.user.company.properties.forEach(property => {
      property.units.forEach(unit => {
        units.push(unit)
      })
    })

    let listUnits = units.map(units => {
      return <div key={units.id} className='overview-list'>{units.tenantName}</div>
    })

    return (
      <div className='overview-component'>
        <div className='overview-list title'>
          <div className=''>TENANTS</div>
          <div className='right'>{units.length}</div>
        </div>
        {listUnits}
        <div className='overview-list'>
          <Link to='/tenants'>See All</Link>
        </div>
      </div>
    )
  }
}

export default TenantsOverview
