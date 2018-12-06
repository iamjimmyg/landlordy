import React, { Component } from 'react'
import EditUnitForm from '../forms/EditUnitForm'
import UnitPaidForm from '../forms/UnitPaidForm'
import EditPropertyForm from '../forms/EditPropertyForm'

import { dateAndDueInfo } from '../../helpers/DateHelper'

import { Link } from 'react-router'

class TenantsBoxedView extends Component {
  constructor(props){
    super(props)
  }

  render(){
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let unit = this.props.unit
    let dateAndOverDue = this.props.dateAndOverDue
    let property = this.props.property
    return (
      <div className='col-xl-4 col-md-6 ' key={unit.id}>
        <div className='tenant-section'>


          <i className="material-icons edit-tenant-icon"
            onClick={()=>{
              this.props.editTenantSelect(unit)
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
                  <EditUnitForm unit={this.props.selectEditTenant} propertyId={property.id} />
                </div>

              </div>
            </div>
          </div>

          <div className='title'>
            <h5>{unit.tenantName}</h5>
            {unit.amountOwed !== 0 ? <span className="badge badge-danger overdue">-{unit.currency === 'Dollars' ? '$' : '₡'}{unit.amountOwed.toLocaleString()}</span> : ''}
          </div>
          <div className='small-text'>
            Property:
          </div>
          <div className='view-property-button' onClick={()=>{console.log('view property')}}>{this.props.property.propertyName}</div>
          <div className='btn show-info' data-toggle="collapse" data-target={`#collapsed-${unit.id}`} aria-expanded="false">
            <i className="material-icons">arrow_drop_down</i><div className='small-text'></div>
          </div>
          <div className="collapse" id={`collapsed-${unit.id}`}>
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


          {this.props.isAdmin ? <div>
              <hr style={{marginTop: '8px'}}/>
              <UnitPaidForm collapseId={`collapseUnit-${unit.id}`} unit={unit} propertyId={this.props.property.id} isAdmin={this.props.isAdmin}/>
            </div> : ''
          }
        </div>
      </div>
    )
  }
}

export default TenantsBoxedView
