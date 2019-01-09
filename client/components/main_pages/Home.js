import React, { Component } from 'react'
import {Motion, spring} from 'react-motion'
import laptop from '../../images/macbook-flat.png'
import properties_view from '../../images/properties-view.png'
import dashboard_view from '../../images/dashboard-view.png'

class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      description: ''
    }
    this.handleDescription = this.handleDescription.bind(this)
  }

  handleDescription(){
    setTimeout(() => {
      this.setState({ description: <Motion defaultStyle={{x: -25, o: 0}} style={{x: spring(0), o: spring(1)}}>
        {value => <div className="" style={{top: value.x, opacity: value.o, position: 'relative'}}>
          <div className='description'>
            <h3>MyProperties.me is a property management app for landlords in a digital world.</h3>
          </div>
        </div>}
      </Motion> })
    }, 450)
  }

  render(){
    return (
      <div id='home' className=''>
        {/* <div className='background-div' >
        </div> */}
        <div className='landing'>
        </div>

        <div className='title-section'>
          <Motion defaultStyle={{x: -25, o: 0}} style={{x: spring(0), o: spring(1)}}>
            {value => <div className="" style={{top: value.x, opacity: value.o, position: 'relative'}}>
              <div className='heading-text d-flex'>
                <i className='material-icons'>home</i>
                <h1 className='title'>MyProperties.me</h1>
              </div>
            </div>}
          </Motion>
          {this.handleDescription()}
          {this.state.description}



        </div>

        <div className='container-fluid-fluid'>
          <div className='row features-and-coming-soon'>
            <div className='features-section col-md-6'>
              <h4>Features</h4>
              <ul>
                <li>
                  <i className='material-icons'>check</i>
                  <h5>Manage properties and tenants</h5>
                </li>
                <li>
                  <i className='material-icons'>check</i>
                  <h5>Track rent payments</h5>
                </li>
                <li>
                  <i className='material-icons'>check</i>
                  <h5>Get instant cash flow analysis</h5>
                </li>
                <li>
                  <i className='material-icons'>check</i>
                  <h5>Signup assistant with limited admin capabilites</h5>
                </li>
                <li>
                  <i className='material-icons'>check</i>
                  <h5>Get hourly updates on Costa Rican Colon currency conversion</h5>
                </li>
              </ul>
            </div>

            <div className='features-section col-md-6'>
              <h4>Coming Soon</h4>
              <ul>
                <li>
                  <i className='material-icons'>check</i>
                  <h5>Month by month income anaylsis</h5>
                </li>
                <li>
                  <i className='material-icons'>check</i>
                  <h5>Currency convertion between all currencies</h5>
                </li>
                <li>
                  <i className='material-icons'>check</i>
                  <h5>Automated email reminders for overdue tenants</h5>
                </li>
                <li>
                  <i className='material-icons'>check</i>
                  <h5>Integrated iPhone/iPad camera for tenant contract/reciept organization</h5>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div style={{borderTop: '1px solid lightgrey', background: '#f2f2f2', minHeight: '400px'}}>
          <div className=''>
            <div className='row more-info-section'>
              <div className='col-md-6 laptop-container'>
                <div className='laptop'>
                  <img  src={properties_view} />
                </div>
              </div>

              <div className='col-md-6 more-info-text'>
                <h4>Independent and organized</h4>
                <p>Manage your rental properties from anywhere. Have access to all information on your tenants in a easy to read and organized manner.</p>

                <h4>Keep track of tenant payments</h4>
                <p>Get a quick overview of tenants that are overdue and track rent payments on the go. MyProperties also supports partial payments.</p>

                <h4>Easily manage properties</h4>
                <p>Easily edit and manage property/tenant info and payments with the user friendly interface.</p>


              </div>
            </div>
          </div>
        </div>

        <div style={{borderTop: '1px solid lightgrey', background: 'white', minHeight: '400px'}}>
          <div className=''>
            <div className='row more-info-section'>


              <div className='col-md-6 order-md-2 laptop-container'>
                <div className='laptop'>
                  <img src={dashboard_view} />
                </div>
              </div>

              <div className='col-md-6 order-md-1 more-info-text'>
                <h4>Conversion rate analysis</h4>
                <p>Choose the currency your tenant pays in and get a conversion rate anaylsis with hourly updates on the curreny exchange.</p>

                <h4>Quick Overview</h4>
                <p>Get a quick overview on tenants that are overdue as well as income collected.</p>

                <h4>Signup Assisstant</h4>
                <p>Signup an assistant with ability to add/edit property information but is restricted on changing amount owed on tenants.</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
