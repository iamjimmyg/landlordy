import React, { Component } from 'react'
import AddPropertyForm from '../forms/AddPropertyForm'
import { Link } from 'react-router'

import mutation from '../../mutations/addProperty'
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
    if(this.state.modalDisplay === 'none') this.setState({ modalDisplay: 'block' })
    else if(this.state.modalDisplay === 'block') this.setState({ modalDisplay: 'none' })
    this.props.router.push('/properties')
  }

  onSubmit({propertyName, address}){
    const companyId = this.props.data.user.company.id
    this.props.mutate({
      variables: { propertyName, address, companyId },
      refetchQueries: [{query}]
    }).catch(res => {
      const errors = res.graphQLErrors.map(error => error.message)
      this.setState({ errors })
    })
    this.setState({ modalDisplay: 'none' })
  }

  render(){
    const { loading, user } = this.props.data
    let properties;
    if(loading){
      properties = <div>loading...</div>
    }else if(user) {
      properties = this.props.data.user.company.properties.map(property => {
        return <div key={property.id} className='overview-component'>
          <div className='overview-list title'>{property.propertyName}</div>
          <div className='overview-list'>{property.address}</div>
        </div>
      })
    }
    return (
      <div id='properties'>
        <h4 className='center'>Properties page</h4>
        <Link to='/dashboard' className="waves-effect waves-light btn-small">
          <i className="material-icons left">arrow_back</i>
        </Link>

        <Link to='/properties/add-property'><button onClick={this.updateModalDisplay.bind(this)}
          className="btn-floating btn waves-effect waves-light red right modal-trigger">

          <i className="material-icons">add</i>
        </button></Link>
        <AddPropertyForm
          modalDisplay={this.state.modalDisplay}
          updateModalDisplay={this.updateModalDisplay.bind(this)}
          onSubmit={this.onSubmit.bind(this)}
        />

        <div onClick={this.updateModalDisplay.bind(this)} className="modal-overlay" style={{ display: `${this.state.modalDisplay}`, zIndex: '1001', opacity: '0.5'}}></div>

        {properties}
      </div>
    )
  }
}

export default graphql(query)(
  graphql(mutation)(Properties)
)
