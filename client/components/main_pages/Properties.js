import React, { Component } from 'react'
import AddPropertyForm from '../forms/AddPropertyForm'
import EditPropertyForm from '../forms/EditPropertyForm'

import { dateAndDueInfo } from '../../helpers/DateHelper'

class Properties extends Component {
  constructor(props){
    super(props)
    this.state = {
      editPropertySelect: '',
      addPropertyDisplay: false,
      width: window.innerWidth,
    }
    this.updateDimensions = this.updateDimensions.bind(this);
    this.viewProperty = this.viewProperty.bind(this)
  }
  componentWillUpdate(nextProps){
    if(this.props.data.user !== nextProps.data.user){
      this.setState({ addPropertyDisplay: false })
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }

  updateDimensions() {
    this.setState({
      width: window.innerWidth
    });
  }

  addPropertyDisplay(){
    this.setState({ addPropertyDisplay: !this.state.addPropertyDisplay })
  }

  viewProperty(property){
    this.props.viewProperty(property)
  }

  render(){
    const { loading, user } = this.props.data
    let properties;

    if(loading){
      properties = <div>loading...</div>
    }else if(user) {
      if(user.company.properties === undefined || user.company.properties.length === 0){
        properties = <div>No properties yet</div>
      }else if(user.company.properties.length !== 0){
        let companyId = user.company.id
        properties = user.company.properties.map((property, i) => {
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


          return <div key={property.id} className='col-xl-4 col-md-6'>
            <div  className='property-section'>
              <div className='row'>
                <div className='col-12'>

                  <i className="material-icons float-right edit-property-icon"
                    onClick={()=>{
                      this.setState({ editPropertySelect: property })
                    }}
                    data-toggle="modal"
                    data-target="#ModalCenter">edit
                  </i>

                  <div className="modal fade" id="ModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalCenterTitle">Edit Unit</h5>
                          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <EditPropertyForm property={this.state.editPropertySelect} />
                        </div>

                      </div>
                    </div>
                  </div>

                  <div className='row no-gutters'>
                    <h5 onClick={()=>{this.viewProperty(property)}}>{property.propertyName}</h5>
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
                      aria-valuemin="0" aria-valuemax="100">{((propertyTotalColones - propertyTotalOwedColones) / propertyTotalColones ) * 100}%</div>
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
                      aria-valuemin="0" aria-valuemax="100">{((propertyTotalDollars - propertyTotalOwedDollars) / propertyTotalDollars ) * 100}%</div>
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

              {/* <button type="button"
                onClick={()=>{this.viewProperty(property)}}
                className='view-property-button'>
                View Property
              </button> */}
            </div>
          </div>
        })
      }
    }

    return (
      <div id='properties' className='container-fluid'>
        <div className='title-section'>
          <h4>Properties</h4>
          <i className="material-icons float-right add-property-icon"
            onClick={this.addPropertyDisplay.bind(this)}>
            add_circle_outline
          </i>
          <div
            style={{ position: 'relative',
            width: '100%',
            transition: 'all ease-in-out .15s',
            height:`${ this.state.addPropertyDisplay ? (this.state.width < 768 ? '245px' : '158px') : '0px' }`,
            overflow: `${this.state.addPropertyDisplay ? (()=>{setTimeout(function(){return ''}), 100}) : 'hidden'}`
           }}
            >
            <hr style={{color: 'grey'}}/>
            <div >
              <AddPropertyForm
                companyId={user ? this.props.data.user.company.id : ''}
              />
            </div>
          </div>
        </div>
        <div className='row '>
          {properties}
        </div>
      </div>
    )
  }
}

export default Properties
