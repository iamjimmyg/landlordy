import React, { Component } from 'react'
import { Link } from 'react-router'

import mutation from '../../mutations/addProperty'
import { graphql } from 'react-apollo'
import query from '../../queries/CurrentUser'

class AddPropertyForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      propertyName: '',
      address: '',
      errors: []
    }
  }

  onSubmit(event){
    event.preventDefault()
    const companyId = this.props.companyId
    const propertyName = this.state.propertyName
    const address = this.state.address
    this.props.mutate({
      variables: { companyId, propertyName, address },
      refetchQueries: [{query}]
    }).then(res => {
      this.props.updateModalDisplay()
    }).catch(res => {
      const errors = res.graphQLErrors.map(error => error.message)
      this.setState({ errors })
    })
  }

  updateModalDisplay(event){
    event.preventDefault()
    this.props.updateModalDisplay()
  }

  render(){
    return (
      <div className="modal" style={{display: `${this.props.modalDisplay}`, zIndex: '1002'}}>
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
          <div style={{color: 'red', marginBottom: '7px'}}>
            {this.state.errors.map(error => <div key={error}>{error}</div>)}
          </div>
        </div>
        <div className="modal-footer">
          <button
            onClick={this.onSubmit.bind(this)}
            className="modal-close waves-effect waves-green btn-flat">Submit
          </button>
          <button onClick={this.updateModalDisplay.bind(this)}
            className="modal-close waves-effect waves-green btn-flat">Cancel
          </button>
        </div>
      </div>

    )
  }
}

export default graphql(query)(
  graphql(mutation)(AddPropertyForm)
)
