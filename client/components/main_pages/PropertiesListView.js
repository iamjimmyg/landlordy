import React, { Component } from 'react'
import EditPropertyForm from '../forms/EditPropertyForm'
import AmountOwedForm from '../forms/AmountOwedForm'
import { dateAndDueInfo } from '../../helpers/DateHelper'

import { Link } from 'react-router'

import mutation from '../../mutations/unitPaid'
import { graphql } from 'react-apollo'
import query from '../../queries/CurrentUser'

class PropertiesListView extends Component {
  constructor(props){
    super(props)
    this.state = {
      amountOwed: '',
    }
    this.viewProperty = this.viewProperty.bind(this)
    this.onSelect = this.onSelect.bind(this)
  }

  viewProperty(property){
    this.props.viewProperty(property)
  }

  onSelect(boo, index){

    const unitId = this.props.property.units[index].id
    const propertyId = this.props.property.id
    const paidStatus = boo
    const amountOwed = paidStatus === true ? 0 : this.props.property.units[index].rentAmount

    this.props.mutate({
      variables: { unitId, propertyId, paidStatus, amountOwed },
      refetchQueries: [{query}]
    }).then(res => {
      this.setState({ paidStatus: paidStatus, amountOwed: amountOwed, errors: [] })
    }).catch(res => {
      const errors = res.graphQLErrors.map(error => error.message)
      alert(errors[0])
      this.setState({ errors })
    })
  }

  render(){
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]
    let i = this.props.i
    let property = this.props.property
    let propertyTotalColones = 0
    let propertyTotalOwedColones = 0
    let propertyTotalDollars = 0
    let propertyTotalOwedDollars = 0
    let units = property.units.map((unit, j) => {

      let dateAndOverDue = dateAndDueInfo(unit)
      if(unit.currency === 'Colones'){
        propertyTotalColones = propertyTotalColones + unit.rentAmount
        propertyTotalOwedColones = propertyTotalOwedColones + unit.amountOwed
      }else if(unit.currency === 'Dollars'){
        propertyTotalDollars = propertyTotalDollars + unit.rentAmount
        propertyTotalOwedDollars = propertyTotalOwedDollars + unit.amountOwed
      }

      return <tr className='row no-gutters' key={j}>
        <td className='col-1 d-none d-sm-block'>{j + 1}</td>
        <td className='col'>{unit.tenantName}</td>
        <td className='col-3 d-none d-xl-block'>{unit.email}</td>
        <td className='col d-none d-lg-block'>{unit.cellNumber}</td>
        <td className='col d-none d-lg-block'>{months[dateAndOverDue.monthDue]} {unit.dueDate}, {dateAndOverDue.yearDue}</td>
        <td className='col'>
          {this.props.data.user.isAdmin ? <div className="btn-group" role="group" aria-label="Basic example">
            <button type="button" className={`overdue btn btn-secondary ${unit.paidStatus ? '' : 'active'}`}
              onClick={()=>{this.onSelect(false, j)}}
              >Due</button>
            <button type="button" className={`paid btn btn-secondary ${unit.paidStatus ? 'active' : ''}`}
              onClick={()=>{this.onSelect(true, j)}}
              >Paid</button>
          </div> : (unit.paidStatus ? 'Paid' : 'Due')}

        </td>
        <td className='col'>
          {this.props.data.user.isAdmin ? <AmountOwedForm propertyId={property.id} unit={unit}/> :
            <div>{unit.currency === 'Dollars' ? '$' : '₡'}{unit.amountOwed.toLocaleString()}</div>
          }

        </td>
      </tr>
    })

    return (
      <div key={property.id} className='property-list-view'>
        <i className="material-icons float-right edit-property-icon"
          onClick={() => {this.props.editPropertySelect(property)}}
          data-toggle="modal"
          data-target="#ModalCenter">edit
        </i>


        <div className="modal fade" id="ModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
          <div className='small-text unit-amount'>({property.units.length} Units)</div>
        </div>

        <table>
          <thead>
            <tr className='row no-gutters'>
              <td className='small-text col-1 d-none d-sm-block'>Unit:</td>
              <td className='small-text col'>Tenant:</td>
              <td className='small-text col-3 d-none d-xl-block'>Email:</td>
              <td className='small-text col d-none d-lg-block'>Cell Number:</td>
              <td className='small-text col d-none d-lg-block'>Due Date:</td>
              <td className='small-text col'>Status:</td>
              <td className='small-text col'>Amount Owed:</td>
            </tr>
          </thead>
          <tbody>
            {units}
          </tbody>
        </table>
      </div>
    )
  }
}


export default graphql(query)(
  graphql(mutation)(PropertiesListView)
)
