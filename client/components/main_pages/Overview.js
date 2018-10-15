import React, { Component } from 'react'

class Overview extends Component {

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
      <div id='overview'>
        {/* <h4>Overview page</h4>

        <Link to='/dashboard' className="waves-effect waves-light btn-medium">
          <i className="material-icons left">arrow_back</i>
        </Link>

        {tenants} */}
        overview
      </div>
    )
  }
}

export default Overview
