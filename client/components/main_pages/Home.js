import React, { Component } from 'react'

class Home extends Component {
  render(){
    return (
      <div id='home' className=''>
        {/* <div className='background-div' >
        </div> */}
        <div className='landing'>
        </div>

        <div className='title-section row'>
          {/* <div className='col-2'>
            <i className='material-icons'>home</i>
          </div> */}
          <div className='col-10'>
            <h1>MyProperties.me</h1>
            <h3>MyProperties.me is a property management app for landlords in a digital world.</h3>
          </div>

        </div>

        <div className='features-section'>
          <ul>
            <li>
              <i className='material-icons'>check</i>
              <h5>Awesome feature</h5>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Home
