import React, { Component } from 'react'
import AddUnitForm from '../forms/AddUnitForm'
import EditUnitForm from '../forms/EditUnitForm'

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
      console.log('oh hiiiii')
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
    const { loading, user } = this.props.data

    let units
    let property
    if(loading){
      units = <div>loading...</div>
    }
    else if(user) {
      property = user.company.properties.filter(prop => {
        if(prop.id === this.props.propertyId) return prop
      })
      units = property[0].units.map(unit => {
        return <div key={unit.id} className='col-lg-6 col-xl-4'>
          <div className='unit-section '>
            <i className="material-icons float-right"
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


            {unit.tenantName}
            <br/>
            {unit.cellNumber}
            <br/>
            {unit.email}
            <br/>
            {unit.dueDate}
            <br/>
            {unit.rentAmount}
          </div>

        </div>
      })

    }

    return (
      <div id='property' className='container-fluid'>
        <div className='title-section'>
          <h4>{this.state.propertyName}</h4>
          <div className='small-text'>{this.state.address}</div>
          <i className="material-icons float-right add-unit-icon"
            onClick={this.addUnitDisplay.bind(this)}
            >
            add_circle_outline
          </i>
          <div
            style={{ position: 'relative',
            width: '100%',
            transition: 'all ease-in-out .15s',
            maxHeight:`${ this.state.addUnitDisplay ? (this.state.width < 768 ? '550px' : '360px') : '0px' }`,
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
