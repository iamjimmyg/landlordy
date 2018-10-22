import React, { Component } from 'react'
import AddPropertyForm from '../forms/AddPropertyForm'

import { graphql } from 'react-apollo'
import query from '../../queries/CurrentUser'

class Properties extends Component {
  constructor(props){
    super(props)
    this.state = {
      addPropertyDisplay: false,
      width: window.innerWidth,
      collapsedProperties: {}

    }
    this.updateDimensions = this.updateDimensions.bind(this);
    this.mapPropertiesToState = this.mapPropertiesToState.bind(this)
    this.collapseProperty = this.collapseProperty.bind(this)
  }
  componentWillUpdate(nextProps){
    if(this.props.data.user !== nextProps.data.user){
      this.setState({ addPropertyDisplay: false })
      this.mapPropertiesToState()
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
    if(this.props.data.user.company.properties){
      this.mapPropertiesToState()
    }
  }

  mapPropertiesToState(){
    const properties = {}
    this.props.data.user.company.properties.forEach(prop =>{
      properties[prop.propertyName] = false
    })
    this.setState({ collapsedProperties: properties })
  }

  collapseProperty(property){
    let collapsedProperties = this.state.collapsedProperties
    collapsedProperties[property] = !collapsedProperties[property]
    this.setState({ collapsedProperties: collapsedProperties })
  }

  updateDimensions() {
    this.setState({
      width: window.innerWidth
    });
  }

  addPropertyDisplay(){
    this.setState({ addPropertyDisplay: !this.state.addPropertyDisplay })
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

        properties = user.company.properties.map(property => {
          let propertyTotal = 0
          let units = property.units.map(unit => {
            propertyTotal = propertyTotal + unit.rentAmount
            return <div key={unit.id} className=''>
              {unit.tenantName}
            </div>
          })

          return <div key={property.id} className='col-lg-6 col-xl-4'>
            <div  className='property-section'>
              <div className='row no-gutters'>
                <div className='col-12'>
                  <h5>{property.propertyName}</h5>
                  {property.address}
                </div>
              </div>

              <hr />
              <div className='row no-gutters'>
                <div className='col-3 text-center'>
                  <div className='small-text'>Units</div>


                  <div className='units-icon rounded-circle'>
                    <div className='icon-count rounded-circle'>
                      <div className='number'>{property.units.length}</div>
                    </div>
                    <i className='material-icons'>home</i>
                  </div>

                </div>

                <div className='col-6 text-center'>
                  <div className='small-text'>Possible Monthly Total</div>
                  <h4 className='align-top'>₡{propertyTotal.toLocaleString()}</h4>
                </div>

              </div>
              <button type="button" className='view-property-button'>View Property</button>


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
            //id='collapse-content'
            style={{ position: 'relative',
            width: '100%',
            transition: 'all ease-in-out .15s',
            height:`${ this.state.addPropertyDisplay ? (this.state.width < 768 ? '220px' : '130px') : '0px' }`,
            overflow: `${this.state.addPropertyDisplay ? (()=>{setTimeout(function(){return ''}), 100}) : 'hidden'}`
           }}
            >
            <div >
              <AddPropertyForm
                companyId={user ? this.props.data.user.company.id : ''}
              />
            </div>
          </div>
        </div>
        <div className=''>
          <div className='row gutter-2'>
            {properties}
          </div>

        </div>

      </div>
    )
  }
}

export default graphql(query)(Properties)
