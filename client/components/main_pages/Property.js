import React, { Component } from 'react'

class Property extends Component {

  render(){
    console.log(this.props)
    return (
      <div id='tenants' className='container-fluid'>
        <h4>Property</h4>
      </div>
    )
  }
}

export default Property
