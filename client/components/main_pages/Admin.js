import React, { Component } from 'react'
import SignUpAssistant from '../forms/SignUpAssistant'
import Assistants from './admin_components/Assistants'

import {Motion, spring} from 'react-motion';

class Admin extends Component {


  render(){
    const companyName = this.props.data.user.company.companyName

    return (

          <div id='admin' className='container-fluid'>
            <div className='title-section'>
              <div className='row no-gutters'>
                <div className=''>
                  <h4>{companyName.toUpperCase()} Admin</h4>
                  Assistants are able to edit tenant info with the exception of adjusting money owed.
                </div>
              </div>
            </div>

            <Motion defaultStyle={{x: -25, o: 0}} style={{x: spring(0), o: spring(1, {stiffness: 50})}}>
              {value => <div className="" style={{top: value.x, opacity: value.o, position: 'relative'}}>
                <div className='row'>

                  <div className='col-md-8'>
                    <SignUpAssistant {...this.props}/>
                  </div>
                  <div className='col-md-4'>
                    <Assistants {...this.props}/>
                  </div>
                </div>
              </div>}
            </Motion>
          </div>

    )
  }
}

export default Admin
