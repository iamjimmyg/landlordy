import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import currentUserQuery from '../../queries/CurrentUser'

class Overview extends Component {

  render(){

    return (
      <div id='overview' className='container-fluid'>
        <h4 className=''>Overview</h4>
      </div>
    )
  }
}

export default graphql(currentUserQuery)(Overview)
