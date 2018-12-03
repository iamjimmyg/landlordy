import React, { Component } from 'react'
import OverDueTenants from './overview_components/OverDueTenants'
import PropertiesOverviewChart from './overview_components/PropertiesOverview'

import { graphql } from 'react-apollo'
import currentUserQuery from '../../queries/CurrentUser'

class Overview extends Component {

  render(){
    console.log(this.props)
    return (
      <div id='overview' className='container-fluid'>
        <div className='title-section'>
          <div className='row no-gutters'>
            <div className=''>
              <h4>Overview</h4>
            </div>
          </div>
        </div>

        <div className='row'>
          <PropertiesOverviewChart  {...this.props}/>

          <OverDueTenants  {...this.props}/>
        </div>


      </div>
    )
  }
}

export default graphql(currentUserQuery)(Overview)
