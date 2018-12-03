import React, { Component } from 'react'
import AddPropertyForm from '../forms/AddPropertyForm'
import PropertiesListView from './PropertiesListView'
import PropertiesBoxedView from './PropertiesBoxedView'

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
    this.setState({ addPropertyDisplay: !this.state.addPropertyDisplay })
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
        properties = <div>No properties yet</div>
      }else if(user.company.properties.length !== 0){
        let companyId = user.company.id
        properties = user.company.properties.map((property, i) => {
          if(this.state.view === 'list'){
            return <PropertiesListView
              i={i}
              editPropertySelect={this.editPropertySelect}
              selectEditProperty={this.state.editPropertySelect}
              key={i}
              property={property}
              viewProperty={this.props.viewProperty}
            />
          }else if(this.state.view === 'module'){
            return <PropertiesBoxedView
              i={i}
              editPropertySelect={this.editPropertySelect}
              selectEditProperty={this.state.editPropertySelect}
              key={i}
              property={property}
              viewProperty={this.props.viewProperty}
            />
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
            onClick={this.addPropertyDisplay.bind(this)}>
            add_circle_outline
          </i>
          <div
            style={{ position: 'relative',
            width: '100%',
            transition: 'all ease-in-out .15s',
            height:`${ this.state.addPropertyDisplay ? (window.innerWidth < 768 ? '245px' : '158px') : '0px' }`,
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
