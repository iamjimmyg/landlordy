import React, { Component } from 'react'
import { Link } from 'react-router'

class PropertiesOverview extends Component {

  render(){
    let properties = this.props.data.user.company.properties.map(property => {
      return <div key={property.id} className='overview-list'>
        {property.propertyName}
      </div>
    })

    let seeAllOrAddLink = this.props.data.user.company.properties.length !== 0 ? (<div className='overview-list'>
      <Link to='/properties'>See All</Link>
    </div>) : (<div className='overview-list'>
      <Link to='/properties'>Add Property</Link>
    </div>)

    return (
      <div className='overview-component'>
        <div className='overview-list title'>
          <div className=''>PROPERTIES</div>
          <div className='right'>
            {this.props.data.user.company.properties.length}
          </div>
        </div>
        {properties}


        {seeAllOrAddLink}
      </div>
    )
  }
}

export default PropertiesOverview
