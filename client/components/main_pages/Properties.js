import React, { Component } from 'react'
import { Link } from 'react-router'
import {Modal, Button, Icon} from 'react-materialize'

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
  }

  render(){
    const { loading, user } = this.props.data
    let properties;
    if(loading){
      properties = <div>loading...</div>
    }else if(user) {
      properties = this.props.data.user.company.properties.map(property => {
        return <div key={property.id} className='overview-component'>
          {property.propertyName}
        </div>
      })
    }
    return (
      <div id='properties'>
        <h4>Properties page</h4>
        <Link to='/dashboard' className="waves-effect waves-light btn-small">
          <i className="material-icons left">arrow_back</i>
        </Link>

        {/* <a onClick={this.updateModalDisplay.bind(this)}
          className="btn-floating btn waves-effect waves-light red right modal-trigger"
          href="#properties/add-property">
          <i className="material-icons">add</i>
        </a>

        <div id="properties/add-property" className="modal" style={{display: `${this.state.modalDisplay}`}}>
          <div className="modal-content">
            <h4>Modal Header</h4>
            <p>A bunch of text</p>
          </div>
          <div className="modal-footer">
            <a href="#properties" className="modal-close waves-effect waves-green btn-flat">Submit</a>
            <a onClick={this.updateModalDisplay.bind(this)} href="#properties" className="modal-close waves-effect waves-green btn-flat">Cancel</a>
          </div>
        </div> */}
        {/* <Modal
          header='Modal Header'
          trigger={<Button waves='light'>OR ME!<Icon right>insert_chart</Icon></Button>}>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.</p>
        </Modal> */}
        {properties}
      </div>
    )
  }
}

export default Properties
