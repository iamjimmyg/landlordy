import React, { Component } from 'react'
import { Link } from 'react-router'

class Tenants extends Component {

  render(){
    // let units = []
    // const { loading, user } = this.props.data
    // let tenants;
    // if(loading){
    //   tenants = <div>loading...</div>
    // }else if(user) {
    //   this.props.data.user.company.properties.forEach(property => {
    //     property.units.forEach(unit => {
    //       units.push(unit)
    //     })
    //   })
    //   tenants = units.map(unit => {
    //     return <div className='overview-component' key={unit.id}>{unit.tenantName}</div>
    //   })
    // }

    return (
      <div id='tenants' className='container-fluid'>
        <h4>Tenants</h4>
      </div>
    )
  }
}

export default Tenants
