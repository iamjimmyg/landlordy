import React, { Component } from 'react'
import OverDueTenants from './overview_components/OverDueTenants'
import PropertiesOverviewChart from './overview_components/PropertiesOverview'

import { graphql } from 'react-apollo'
import currentUserQuery from '../../queries/CurrentUser'

class Overview extends Component {
  constructor(props){
    super(props)
    this.state={}
  }

  render(){

    return (
      <div id='overview' className='container-fluid'>
        <div className='title-section'>
          <div className='row no-gutters'>
            <div className=''>
              <h4>Overview</h4>
            </div>
            <div className='currency-conversion'>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">$</span>
                  <span className="input-group-text">1.00</span>
                </div>
                <i className="material-icons right-arrow">arrow_right_alt</i>
                <div className="input-group-prepend">
                  <span className="input-group-text">₡</span>
                  <span className="input-group-text">{this.props.conversionRate.USD_CRC.toFixed(2)}</span>
                </div>
              </div>
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
