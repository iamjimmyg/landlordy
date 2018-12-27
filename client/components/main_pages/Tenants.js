import React, { Component } from 'react'
import TenantsBoxedView from './TenantsBoxedView'
import TenantsListView from './TenantsListView'

import { Link, Redirect } from 'react-router'
import { dateAndDueInfo } from '../../helpers/DateHelper'

import {Motion, spring} from 'react-motion';

class Tenants extends Component {
  constructor(props){
    super(props)
    this.state = {
      editTenantSelect: '',
      view: 'list',
    }
    //this.viewProperty = this.viewProperty.bind(this)
    this.editTenantSelect = this.editTenantSelect.bind(this)
  }

  editTenantSelect(unit){
    this.setState({ editTenantSelect: unit })
  }

  // viewProperty(property){
  //   this.props.viewProperty(property)
  // }

  render(){
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let date = new Date()
    let currentMonth = date.getMonth()
    let currentDay = date.getDate()
    let currentYear = date.getFullYear()

    let units = []
    let properties = []
    let tenants
    const { loading, user } = this.props.data
    if(loading){
      tenants = <div>loading...</div>
    }else if(user) {
      this.props.data.user.company.properties.forEach(property => {
        property.units.forEach(unit => {
          properties.push(property)
          units.push(unit)
        })
      })
      tenants = units.map((unit, i) => {
        let dateAndOverDue = dateAndDueInfo(unit)
        return <TenantsBoxedView
            editTenantSelect={this.editTenantSelect}
            selectEditTenant={this.state.editTenantSelect}
            key={unit.id} unit={unit}
            dateAndOverDue={dateAndOverDue}
            //viewProperty={this.props.viewProperty}
            property={properties[i]}
            isAdmin={user.isAdmin}
          />


      })
    }

    return (
            <div id='tenants' className='container-fluid'>
              <div className='title-section'>
                <div className='row no-gutters'>
                  <div className=''>
                    <h4>Tenants</h4>
                  </div>
                  <form className='select-view-button'>
                    <div className="btn-group btn-group-toggle" data-toggle="buttons" >
                      <label className={`btn btn-secondary ${this.state.view === 'list' ? 'active' : ''}`}
                        onClick={()=>{this.setState({ view: 'list' })}}>
                        <i className="material-icons">list</i>
                        <input type="radio"/>
                      </label>
                      <label className={`btn btn-secondary ${this.state.view === 'module' ? 'active' : ''}`}
                        onClick={()=>{this.setState({ view: 'module' })}}>
                        <i className="material-icons">view_module</i>
                        <input type="radio" />
                      </label>
                    </div>
                  </form>
                </div>
              </div>

              <Motion defaultStyle={{x: -25, o: 0}} style={{x: spring(0), o: spring(1, {stiffness: 50})}}>
                {value => <div className="" style={{top: value.x, opacity: value.o, position: 'relative'}}>
                    {this.state.view === 'list' ? <TenantsListView
                        {...this.props}
                      /> : <div className='row'>
                        {tenants}
                      </div>
                    }
                  </div>}
              </Motion>
            </div>

    )
  }
}

export default Tenants
