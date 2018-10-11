import React, { Component } from 'react'
import { Link } from 'react-router'

class AddPropertyForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      propertyName: '',
      address: ''
    }
  }

  onSubmit(event){
    event.preventDefault()
    this.props.onSubmit(this.state)
  }

  updateModalDisplay(event){
    event.preventDefault()
    this.props.updateModalDisplay()
  }

  render(){
    return (
      <div
        // id="properties/add-property"
        className="modal" style={{display: `${this.props.modalDisplay}`, zIndex: '1002'}}>
        <div className="modal-content">
          <form>
            <div className="row">
              <div className="input-field">
                <input id="property_name"
                  type="text"
                  value={this.state.propertyName}
                  onChange={e => this.setState({ propertyName: e.target.value })}
                />
                <label htmlFor="property_name">Property Name</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field">
                <input id="address"
                  type="text"
                  className="validate"
                  value={this.state.address}
                  onChange={e => this.setState({ address: e.target.value })}
                />
                <label htmlFor="address">Address</label>
              </div>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button
             onClick={this.onSubmit.bind(this)}
            className="modal-close waves-effect waves-green btn-flat"
            >Submit</button>
          {/* <Link to='/properties'> */}
            <button onClick={this.updateModalDisplay.bind(this)} className="modal-close waves-effect waves-green btn-flat">Cancel</button>
          {/* </Link> */}
        </div>
      </div>

    )
  }
}

export default AddPropertyForm
