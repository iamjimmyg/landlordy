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
    }).then(res=>{
      this.setState({ propertyName: '', address: '' })
    }).catch(res => {
      const errors = res.graphQLErrors.map(error => error.message)
      alert(errors[0])
      this.setState({ errors })
    })
  }

  render(){
    return (
      <div className='add-property-form'>
        <form>
          <div className='row'>
            <div className="form-group col-md-6">
              <label htmlFor="propertyName">Property Name</label>
              <input type="email"
                className="form-control"
                id="propertyName"
                value={this.state.propertyName}
                onChange={e => this.setState({ propertyName: e.target.value })}
                placeholder="Enter property name" />
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="address">Address</label>
              <input type="email"
                className="form-control"
                id="address"
                value={this.state.address}
                onChange={e => this.setState({ address: e.target.value })}
                placeholder="Enter address" />
            </div>
          </div>
        </form>

          <button
            onClick={this.onSubmit.bind(this)}
            className="btn btn-primary">Submit
          </button>

      </div>

    )
  }
}

export default graphql(query)(
  graphql(mutation)(AddPropertyForm)
)
