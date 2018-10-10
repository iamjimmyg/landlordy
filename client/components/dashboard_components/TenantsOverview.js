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

    let listUnits = units.map((unit, i) => {
      if(i < 5){
        return <div key={unit.id} className='overview-list'>{unit.tenantName}</div>
      }
    })

    let seeAllOrNone = units.length === 0 ? (<div className='overview-list'>
      None</div>) : ( <div className='overview-list'>
      <Link to='/tenants'>See All</Link>
    </div>)

    return (
      <div className='overview-component'>
        <div className='overview-list title'>
          <div className=''>TENANTS</div>
          <div className='right'>{units.length}</div>
        </div>
        {listUnits}

        {seeAllOrNone}
      </div>
    )
  }
}

export default TenantsOverview
