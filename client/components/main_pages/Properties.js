import React, { Component } from 'react'
import AddPropertyForm from '../forms/AddPropertyForm'
import { Link, Redirect } from 'react-router'
import { Collapsible, CollapsibleItem } from 'react-materialize'

import { graphql } from 'react-apollo'
import query from '../../queries/CurrentUser'


class Properties extends Component {
  constructor(props){
    super(props)
    this.state = {
      modalDisplay: 'none',
    }
  }

  componentWillMount(){
    if(this.props.location.pathname === '/properties/add-property'){
      this.setState({ modalDisplay: 'block' })
    }
  }

  updateModalDisplay(){
    if(this.state.modalDisplay === 'none') {
      this.setState({ modalDisplay: 'block' })
    }else if(this.state.modalDisplay === 'block'){
      this.setState({ modalDisplay: 'none' })
      this.props.router.push('/properties')
    }
  }

  render(){
    const { loading, user } = this.props.data
    let properties;
    if(loading){
      properties = <div>loading...</div>
    }else if(user) {
      properties = this.props.data.user.company.properties.map(property => {
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
          <Collapsible>
            <CollapsibleItem header={`Units (${property.units.length})`} icon='keyboard_arrow_down' >
              {units}
            </CollapsibleItem>
          </Collapsible>
        </div>
      })
    }

    return (
      <div id='properties'>
        <div className='row'>
          <Link to='/dashboard'
          className="col s2 waves-effect waves-light btn-small"
          style={{top: '21px'}}>
            <i className="material-icons left">arrow_back</i>
          </Link>
          <h4 className='center col s8'>Properties</h4>
          <Link to='/properties/add-property'
          className='col s2'
          style={{top: '21px', position: 'relative'}}>
            <button onClick={this.updateModalDisplay.bind(this)}
              className="btn-floating btn waves-effect waves-light red right modal-trigger"
              >
              <i className="material-icons">add</i>
            </button>
          </Link>
        </div>

        <AddPropertyForm
          companyId={user ? this.props.data.user.company.id : ''}
          errors={this.state.errors}
          modalDisplay={this.state.modalDisplay}
          updateModalDisplay={this.updateModalDisplay.bind(this)}
        />

        <div onClick={this.updateModalDisplay.bind(this)} className="modal-overlay" style={{ display: `${this.state.modalDisplay}`, zIndex: '1001', opacity: '0.5'}}></div>

        {properties}
      </div>
    )
  }
}

export default graphql(query)(Properties)
