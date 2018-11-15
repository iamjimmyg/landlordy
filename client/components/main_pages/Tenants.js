import React, { Component } from 'react'
import UnitPaidForm from '../forms/UnitPaidForm'
import EditUnitForm from '../forms/EditUnitForm'

import { Link, Redirect } from 'react-router'
import { dateAndDueInfo } from '../../helpers/DateHelper'

class Tenants extends Component {
  constructor(props){
    super(props)
    this.state = {
      editTenantSelect: '',
    }
    this.viewProperty = this.viewProperty.bind(this)
  }

  viewProperty(property){
    this.props.viewProperty(property)
  }

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

        return <div className='col-xl-4 col-md-6 ' key={unit.id}>
          <div className='tenant-section'>


            <i className="material-icons edit-tenant-icon"
              onClick={()=>{
                this.setState({ editTenantSelect: unit })
              }}
              data-toggle="modal"
              data-target="#ModalCenter">edit
            </i>

            <div className="modal fade" id="ModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalCenterTitle">Edit Tenant/Unit</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <EditUnitForm unit={this.state.editTenantSelect} propertyId={properties[i].id} />
                  </div>

                </div>
              </div>
            </div>

            <div className='title'>
              <h5>{unit.tenantName}</h5>
              {dateAndOverDue.overDue ? <span className="badge badge-danger overdue">-{unit.currency === 'Dollars' ? '$' : '₡'}{unit.amountOwed.toLocaleString()}</span> : ''}
            </div>
            <div className='small-text'>
              Property:
            </div>
            <div className='view-property-button' onClick={()=>{this.viewProperty(properties[i])}}>{properties[i].propertyName}</div>
            <div className='btn show-info' data-toggle="collapse" data-target={`#collapsed-${i}`} aria-expanded="false">
              <i className="material-icons">arrow_drop_down</i><div className='small-text'></div>
            </div>
            <div className="collapse" id={`collapsed-${i}`}>
              <div>
                <div className='tenant-info'>
                  <div className='small-text'>Cell Number: </div>
                  <div>{unit.cellNumber}</div>
                </div>
                <div className='tenant-info'>
                  <div className='small-text'>Email: </div>
                  <div>{unit.email}</div>
                </div>
                <div className='tenant-info'>
                  <div className='small-text'>Rent Due: </div>
                  <div>{months[dateAndOverDue.monthDue]} {unit.dueDate}, {dateAndOverDue.yearDue}</div>
                </div>
                <div className='tenant-info'>
                  <div className='small-text'>Rent Amount: </div>
                  <div>{unit.currency === 'Dollars' ? '$' : '₡'}{unit.rentAmount.toLocaleString()}</div>
                </div>
              </div>

            </div>


            {this.props.data.user.isAdmin ? <UnitPaidForm collapseId={`collapseUnit-${i}`} unit={unit} propertyId={properties[i].id} isAdmin={this.props.data.user.isAdmin}/> : ''}

          </div>
        </div>
      })
    }

    return (
      <div id='tenants' className='container-fluid'>
        <div className='title-section'>
          <div className='row'>
            <div style={{marginLeft: '15px'}}>
              <h4>Tenants</h4>
            </div>
          </div>
        </div>

        <div className='row'>
          {tenants}
        </div>

      </div>
    )
  }
}

export default Tenants
