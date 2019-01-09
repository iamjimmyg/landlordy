import React, { Component } from 'react'
import AddPropertyForm from '../forms/AddPropertyForm'
import PropertiesListView from './PropertiesListView'
import PropertiesBoxedView from './PropertiesBoxedView'

import {Motion, spring} from 'react-motion'

class Properties extends Component {
  constructor(props){
    super(props)
    this.state = {
      editPropertySelect: '',
      view: 'list',
      addPropertyDisplay: false,
      width: window.innerWidth,
    }
    this.editPropertySelect = this.editPropertySelect.bind(this)
  }
  componentWillUpdate(nextProps){
    if(this.props.data.user !== nextProps.data.user){
      this.setState({ addPropertyDisplay: false })
    }
  }

  addPropertyDisplay(){

    this.setState({ addPropertyDisplay: !this.state.addPropertyDisplay, })
  }

  editPropertySelect(property){
    this.setState({ editPropertySelect: property })
  }

  render(){
    const { loading, user } = this.props.data
    let properties;

    if(loading){
      properties = <div>loading...</div>
    }else if(user) {
      if(user.company.properties === undefined || user.company.properties.length === 0){
        properties = <div className='no-properties-yet'>No properties yet</div>
      }else if(user.company.properties.length !== 0){
        let companyId = user.company.id
        properties = user.company.properties.map((property, i) => {
          if(this.state.view === 'list'){
            return <Motion key={i} defaultStyle={{x: -25, o: 0}} style={{x: spring(0), o: spring(1, {stiffness: 50})}}>
              {value => <div className="" style={{top: value.x, opacity: value.o, position: 'relative', width: '100%'}}>
              <PropertiesListView
                i={i}
                editPropertySelect={this.editPropertySelect}
                selectEditProperty={this.state.editPropertySelect}
                property={property}
                viewProperty={this.props.viewProperty}
              />
              </div>}
            </Motion>
          }else if(this.state.view === 'module'){
            return <Motion key={i} defaultStyle={{x: -25, o: 0}} style={{x: spring(0), o: spring(1)}}>
                {value => <div className="col-xl-4 col-md-6" style={{top: value.x, opacity: value.o, position: 'relative', width: '100%'}}>
                  <PropertiesBoxedView
                i={i}
                editPropertySelect={this.editPropertySelect}
                selectEditProperty={this.state.editPropertySelect}
                key={i}
                property={property}
                viewProperty={this.props.viewProperty}
              />
            </div>}
          </Motion>
          }
        })
      }
    }

    return (

          <div id='properties' className='container-fluid'>
            <div className='title-section'>
              <div className='row no-gutters'>
                <div className=''>
                  <h4>Properties</h4>
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

              <i className="material-icons float-right add-property-icon"
                onClick={() => {
                  this.addPropertyDisplay.bind(this)
                }}
                data-toggle="modal"
                data-target="#AddProperty">add_circle_outline
              </i>

              <div className="modal fade" id="AddProperty" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalCenterTitle">Add Property</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <AddPropertyForm
                        companyId={user ? this.props.data.user.company.id : ''}
                      />
                    </div>
                  </div>
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
