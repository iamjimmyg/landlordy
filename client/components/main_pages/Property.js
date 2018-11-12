import React, { Component } from 'react'
import AddUnitForm from '../forms/AddUnitForm'
import EditUnitForm from '../forms/EditUnitForm'
import UnitPaidForm from '../forms/UnitPaidForm'

import { Link } from 'react-router'

class Property extends Component {
  constructor(props){
    super(props)
    this.state = {
      editUnitSelect: '',
      width: window.innerWidth,
      addUnitDisplay: false,
      propertyName: '',
      address: ''
    }
    this.mountProperty = this.mountProperty.bind(this)
    this.addUnitDisplay = this.addUnitDisplay.bind(this)
    this.updateDimensions = this.updateDimensions.bind(this)
    this.editUnitSelect = this.editUnitSelect.bind(this)
  }

  updateDimensions() {
    this.setState({
      width: window.innerWidth
    });
  }

  addUnitDisplay(){
    this.setState({ addUnitDisplay: !this.state.addUnitDisplay })
  }

  componentDidMount(){
    this.mountProperty()
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUpdate(nextProps){
    if(nextProps !== this.props){
      this.mountProperty()
      this.setState({ addUnitDisplay: !this.state.addUnitDisplay })
    }
    if(nextProps.data.user.company.properties !== this.props.data.user.company.properties){
      this.setState({ addUnitDisplay: false })
    }
  }

  mountProperty(){
    const { loading, user } = this.props.data
    let property
    if(user){
      property = user.company.properties.filter(prop => {
        if(prop.id === this.props.propertyId) return prop
      })
      this.setState({ propertyName: property[0].propertyName, address: property[0].address })
    }
  }

  editUnitSelect(unit){
    this.setState({
      editUnitSelect: unit
    })
  }

  render(){
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const { loading, user } = this.props.data
    let date = new Date()
    let currentMonth = date.getMonth()
    let currentDay = date.getDate()
    let currentYear = date.getFullYear()
    let units
    let property

    if(loading){
      units = <div>loading...</div>
    }else if(user) {
      property = user.company.properties.filter(prop => {
        if(prop.id === this.props.propertyId) return prop
      })

      units = property[0].units.map((unit, i) => {

        //TODO: separate from this file, unit paid logic

        let overDue = false
        let monthDue
        let yearDue = currentYear
        if(unit.dueDate < currentDay && unit.paidStatus === false){
          monthDue = currentMonth
          overDue = true
        }else if(unit.dueDate > currentDay){
          if(unit.paidStatus === false){
            monthDue = currentMonth - 1
            overDue = true
          }else if(unit.paidStatus === true){
            if(currentMonth === 11){
              monthDue = 0
              yearDue = yearDue + 1
            }
            monthDue = currentMonth
          }

        }else if(unit.dueDate < currentDay && unit.paidStatus === true){
          if(currentMonth === 11){
            monthDue = 0
            yearDue = yearDue + 1
          }
          monthDue = currentMonth + 1
        }

        return <div key={unit.id} className='col-xl-6'>
          <div className='unit-section '>

            <h5>Unit {i + 1}</h5>
            {overDue ? <span className="badge badge-danger">{unit.currency === 'Dollars' ? '$' : '₡'}{unit.amountOwed.toLocaleString()} Over Due!</span> : ''}
            <i className="material-icons edit-unit-icon"
              onClick={()=>{
                this.setState({ editUnitSelect: unit })
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
                    <EditUnitForm unit={this.state.editUnitSelect} propertyId={this.props.propertyId}/>
                  </div>

                </div>
              </div>
            </div>

            <table className='property-table'>
              <tbody>
                <tr className=''>
                  <td>Tenant: </td>
                  <td>{unit.tenantName}</td>
                </tr>
                <tr>
                  <td>Cell Number: </td>
                  <td>{unit.cellNumber}</td>
                </tr>
                <tr>
                  <td>Email: </td>
                  <td>{unit.email}</td>
                </tr>
                <tr>
                  <td>Rent Due: </td>
                  <td>{months[monthDue]} {unit.dueDate}, {yearDue}</td>
                </tr>
                <tr>
                  <td>Rent Amount: </td>
                  <td>{unit.currency === 'Dollars' ? '$' : '₡'}{unit.rentAmount.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
            {this.props.data.user.isAdmin ? <UnitPaidForm collapseId={`collapseUnit-${i}`} unit={unit} propertyId={this.props.propertyId} isAdmin={this.props.data.user.isAdmin}/> : ''}
          </div>

        </div>
      })

    }

    return (
      <div id='property' className='container-fluid'>
        <div className='title-section'>
          <div className='row'>
            <div>
              <Link to='/dashboard/properties'><i className="material-icons back-button">
                keyboard_backspace
              </i></Link>

            </div>
            <div style={{marginLeft: '15px'}}>
              <h4>{this.state.propertyName}</h4>
              <div className='small-text'>{this.state.address}</div>
            </div>
          </div>

          <i className="material-icons float-right add-unit-icon"
            onClick={this.addUnitDisplay.bind(this)}
            >
            add_circle_outline
          </i>
          <div
            style={{ position: 'relative',
            width: '100%',
            transition: 'all ease-in-out .15s',
            maxHeight:`${ this.state.addUnitDisplay ? (this.state.width < 768 ? '620px' : '360px') : '0px' }`,
            overflow: `${this.state.addUnitDisplay ? (()=>{setTimeout(function(){return ''}), 100}) : 'hidden'}`
           }}
            >
            <hr style={{color: 'grey'}}/>
            <div >
              <AddUnitForm
                propertyId={user ? this.props.propertyId : ''}
              />
            </div>
          </div>
        </div>

        <div className='row'>
          {units}
        </div>
      </div>
    )
  }
}

export default Property
