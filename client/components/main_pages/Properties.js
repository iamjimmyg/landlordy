import React, { Component } from 'react'
import AddPropertyForm from '../forms/AddPropertyForm'

import { graphql } from 'react-apollo'
import query from '../../queries/CurrentUser'

class Properties extends Component {
  constructor(props){
    super(props)
    this.state = {
      addPropertyDisplay: false,
      width: window.innerWidth
    }
    this.updateDimensions = this.updateDimensions.bind(this);
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

  render(){
    const { loading, user } = this.props.data
    let properties;

    if(loading){
      properties = <div>loading...</div>
    }else if(user) {
      properties = user.company.properties.map(property => {
        let units = property.units.map(unit => {
          return <div key={unit.id} className='overview-unit'>
            {unit.tenantName}
          </div>
        })
        return <div key={property.id} className='overview-component'>
          <div className='overview-list title'>
            <div>{property.propertyName}</div>
            <div className='right floating' style={{top: '-23px'}}>{property.address}</div>
          </div>

        </div>
      })
    }

    return (
      <div id='properties' className='container-fluid'>
        <div className='section-card'>
            <h4 className=''>Properties</h4>
            <i className="material-icons float-right"
              onClick={this.addPropertyDisplay.bind(this)}>
              add_circle_outline
            </i>
            <div className={this.state.addPropertyDisplay ? 'show-content' : 'hide-content'}
              id='collapse-content'
              style={{ position: 'relative',
              transition: 'all ease-in-out .15s',
              height:`${ this.state.addPropertyDisplay ? (this.state.width < 768 ? '220px' : '130px') : '0px' }`,
              overflow: `${this.state.addPropertyDisplay ? (()=>{setTimeout(function(){return ''}), 100}) : 'hidden'}`
             }}
              >
              <div className="" >
                <AddPropertyForm
                  companyId={user ? this.props.data.user.company.id : ''}
                />
              </div>
            </div>
        </div>

         {properties}
      </div>
    )
  }
}

export default graphql(query)(Properties)
