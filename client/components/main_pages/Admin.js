import React, { Component } from 'react'
import SignUpAssistant from '../forms/SignUpAssistant'
import Assistants from './admin_components/Assistants'

class Admin extends Component {


  render(){
    const companyName = this.props.data.user.company.companyName
    // console.log(this.props)
    return (
      <div id='admin' className='container-fluid'>
        <div className='title-section'>
          <div className='row no-gutters'>
            <div className=''>
              <h4>{companyName.toUpperCase()} Admin</h4>
            </div>
          </div>
        </div>

        <div className='row'>

          <div className='col-md-8'>
            <SignUpAssistant {...this.props}/>
          </div>
          <div className='col-md-4'>
            <Assistants {...this.props}/>
          </div>
        </div>

      </div>
    )
  }
}

export default Admin
