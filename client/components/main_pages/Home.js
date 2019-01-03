import React, { Component } from 'react'

class Home extends Component {
  componentWillMount(){
    window.onresize=()=>{
      console.log(window.innerWidth)
    }
  }

  render(){
    return (
      <div id='home' className=''>
        {/* <div className='background-div' >
        </div> */}
        <div className='landing'>
        </div>

        <div className='title-section'>

          <div className='heading-text d-flex'>
            <i className='material-icons'>home</i>
            <h1 className='title'>MyProperties.me</h1>
          </div>
          <div className='description'>
            <h3>MyProperties.me is a property management app for landlords in a digital world.</h3>
          </div>
        </div>

        <div className='container-fluid'>
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


      </div>
    )
  }
}

export default Home
