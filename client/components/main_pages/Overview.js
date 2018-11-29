import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import currentUserQuery from '../../queries/CurrentUser'

class Overview extends Component {

  render(){

    return (
      <div id='overview' className='container-fluid'>
        <div className='title-section'>
          <div className='row no-gutters'>
            <div className=''>
              <h4>Overview</h4>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default graphql(currentUserQuery)(Overview)
