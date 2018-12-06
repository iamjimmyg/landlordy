import React, { Component } from 'react'

class Admin extends Component {


  render(){
    const companyName = this.props.data.user.company.companyName
    console.log(this.props)
    return (
      <div id='admin' className='container-fluid'>
        <div className='title-section'>
          <div className='row no-gutters'>
            <div className=''>
              <h4>{companyName.toUpperCase()} Admin</h4>
            </div>
          </div>
        </div>

        <div>

        </div>


      </div>
    )
  }
}

export default Admin
