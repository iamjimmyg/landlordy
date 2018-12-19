import React, { Component } from 'react'
//import EditUnitForm from '../forms/EditUnitForm'
import EditPropertyForm from '../forms/EditPropertyForm'

import { dateAndDueInfo } from '../../helpers/DateHelper'

import { Link } from 'react-router'

class PropertiesBoxedView extends Component {
  constructor(props){
    super(props)
    this.viewProperty = this.viewProperty.bind(this)
  }

  viewProperty(property){
    this.props.viewProperty(property)
  }

  render(){
    let i = this.props.i
    let property = this.props.property
    let propertyTotalColones = 0
    let propertyTotalOwedColones = 0
    let propertyTotalDollars = 0
    let propertyTotalOwedDollars = 0
    let units
    if(property.units.length === 0){
      console.log('ukmmmm hello')
    }else {
      units = property.units.map((unit, j) => {

        let dateAndOverDue = dateAndDueInfo(unit)
        if(unit.currency === 'Colones'){
          propertyTotalColones = propertyTotalColones + unit.rentAmount
          propertyTotalOwedColones = propertyTotalOwedColones + unit.amountOwed
        }else if(unit.currency === 'Dollars'){
          propertyTotalDollars = propertyTotalDollars + unit.rentAmount
          propertyTotalOwedDollars = propertyTotalOwedDollars + unit.amountOwed
        }

        return <div key={unit.id} className='tenants'>
          {unit.tenantName}
          {dateAndOverDue.overDue ? <span className="badge badge-danger overdue">-{unit.currency === 'Dollars' ? '$' : '₡'}{unit.amountOwed.toLocaleString()}</span> : ''}
        </div>
      })
    }

    return (
      <div key={property.id} className='col-xl-4 col-md-6'>
        <div  className='property-section'>
          <div className='row'>
            <div className='col-12'>

              <i className="material-icons float-right edit-property-icon"
                onClick={() => {this.props.editPropertySelect(property)}}
                data-toggle="modal"
                data-target="#editProperty">edit
              </i>


              <div className="modal fade" id="editProperty" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalCenterTitle">Edit Property</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <EditPropertyForm property={this.props.selectEditProperty} />
                    </div>

                  </div>
                </div>
              </div>

              <div className='row no-gutters'>
                <button type="button"
                  onClick={()=>{this.viewProperty(property)}}
                  className='view-property-button'>
                  {property.propertyName}
                </button>
                {/* <h5  onClick={()=>{ this.viewProperty(property) }}>{property.propertyName}</h5> */}
                <div className='small-text unit-amount'>({property.units.length} Units)</div>
              </div>

              <div className='small-text'>{property.address}</div>
            </div>
          </div>

          <hr />

          <div className='small-text text-center' style={{ marginBottom: '10px' }}>Income this month: </div>

          <div className='row progress-bars'>
            {propertyTotalColones === 0 ? <div className='no-properties col-12'>No Colones income</div> : <div className='col-12'>
              <div className=''>Colones:  ‎</div>

              <div className='float-right'
                style={{position: 'absolute', right: '16px', top: '0px'}}>
                ‎₡{(propertyTotalColones - propertyTotalOwedColones).toLocaleString()}/{(propertyTotalColones).toLocaleString()}</div>
              <div className="progress" style={{width: '100%', height: '20px'}}>
                <div className="progress-bar small-text"
                  role="progressbar"
                  style={{ width: `${((propertyTotalColones - propertyTotalOwedColones) / propertyTotalColones ) * 100}%`, color: 'white' }}
                  aria-valuemin="0" aria-valuemax="100">{Math.round(((propertyTotalColones - propertyTotalOwedColones) / propertyTotalColones ) * 100)}%</div>
              </div>

            </div>}

            {propertyTotalDollars === 0 ? <div className='no-properties col-12'>No Dollar income<br/> </div>: <div className='col-12'>
              <div className=''>Dollars: </div>
              <div className='float-right'
                style={{position: 'absolute', right: '16px', top: '0px'}}>
                ‎${(propertyTotalDollars - propertyTotalOwedDollars).toLocaleString()}/{(propertyTotalDollars).toLocaleString()}</div>
              <div className="progress" style={{width: '100%', height: '20px'}}>
                <div className="progress-bar small-text"
                  role="progressbar"
                  style={{ width: `${((propertyTotalDollars - propertyTotalOwedDollars) / propertyTotalDollars ) * 100}%`, color: 'white' }}
                  aria-valuemin="0" aria-valuemax="100">{Math.round(((propertyTotalDollars - propertyTotalOwedDollars) / propertyTotalDollars ) * 100)}%</div>
              </div>
            </div>}


          </div>

          <hr />

          <div className='row no-gutters tenants-dropdown'>
            <div className='col-12'>
              <div style={{fontWeight: 'bold' }}>
                Tenants:
              </div>
              <div className='btn show-info' data-toggle="collapse" data-target={`#collapsed-${i}`} aria-expanded="false">
                <i className="material-icons">arrow_drop_down</i><div className='small-text'></div>
              </div>
            </div>

          </div>

          <div className="collapse" id={`collapsed-${i}`}>
            {units}
          </div>
        </div>
      </div>
    )
  }
}

export default PropertiesBoxedView
