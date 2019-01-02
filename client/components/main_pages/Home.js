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
