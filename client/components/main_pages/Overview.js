import React, { Component } from 'react'
import OverDueTenants from './overview_components/OverDueTenants'
import PropertiesOverviewChart from './overview_components/PropertiesOverview'

import { graphql } from 'react-apollo'
import currentUserQuery from '../../queries/CurrentUser'
import Loader from '../Loader'

import {Motion, spring} from 'react-motion';

class Overview extends Component {
  constructor(props){
    super(props)
    this.state={}
    this.handleOverDue = this.handleOverDue.bind(this)
  }

  handleOverDue(){
    setTimeout(() => {
      this.setState({ overDue: <Motion defaultStyle={{x: -35, o: 0}} style={{x: spring(0), o: spring(1, {stiffness: 30})}}>
        {value => <div className="intro" style={{left: value.x, opacity: value.o, position: 'relative'}}>
            {this.props.data.loading !== true ? <OverDueTenants  {...this.props}/> : <Loader />}
          </div>}
      </Motion> })
    },200)
  }

  render(){
    const conversionRate = this.props.conversionRate ? this.props.conversionRate.USD_CRC.toFixed(2) : ''

    return (
      <Motion defaultStyle={{x: -25, o: 0}} style={{x: spring(0), o: spring(1, {stiffness: 50})}}>
        {value => <div className="" style={{top: value.x, opacity: value.o, position: 'relative'}}>

          <div id='overview' className='container-fluid'>
            <div className='title-section'>
              <div className=''>
                <div className=''>
                  <h4>Overview</h4>
                </div>
                <div className='currency-conversion'>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">$</span>
                      <span className="input-group-text">1.00</span>
                    </div>
                    <i className="material-icons right-arrow">arrow_right_alt</i>
                    <div className="input-group-prepend">
                      <span className="input-group-text">₡</span>
                      <span className="input-group-text">
                        {conversionRate}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='row'>
              <div className='col-xl-6'>
                <div className='properties-overview-section'>
                  <h5 className='text-center'>Properties Overview</h5>
                  {conversionRate && this.props.data.loading !== true ? <PropertiesOverviewChart conversionRate={conversionRate} {...this.props}/> : <Loader />}
                </div>
              </div>

              <div className='col-xl-6'>
                {conversionRate && this.props.data.loading !== true ? <OverDueTenants  {...this.props}/> : <Loader />}
              </div>

            </div>

          </div>

          </div>}
      </Motion>

    )
  }
}

export default graphql(currentUserQuery)(Overview)
