import React, { Component } from 'react'

import updateProperty from '../../mutations/updateProperty'
import deleteProperty from '../../mutations/deleteProperty'
import { graphql } from 'react-apollo'
import query from '../../queries/CurrentUser'

class EditPropertyForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      propertyName: '',
      address: '',
      errors: []
    }
  }

  componentWillUpdate(nextProps){
    if(nextProps.property !== this.props.property){
      this.setState({
        propertyName: nextProps.property.propertyName,
        address: nextProps.property.address
      })
    }
  }

  deleteProperty(event){
    event.preventDefault()
    if(confirm('Are you sure you want to delete this property and all of its tenant\'s info?')){
      console.log('delete')
      const propertyId = this.props.property.id
      this.props.deleteProperty({
        variables: { propertyId },
        refetchQueries: [{query}]
      }).then(res=>{
        this.setState({ propertyName: '', address: '', errors: [] })
      }).catch(res => {
        const errors = res.graphQLErrors.map(error => error.message)
        alert(errors[0])
        this.setState({ errors })
      })
    }
  }

  updateProperty(event){
    event.preventDefault()
    const propertyId = this.props.property.id
    console.log(propertyId)
    const propertyName = this.state.propertyName
    const address = this.state.address

    this.props.updateProperty({
      variables: { propertyId, propertyName, address },
    }).then(res=>{
      this.setState({ propertyName: '', address: '', errors: [] })
    }).catch(res => {
      const errors = res.graphQLErrors.map(error => error.message)
      alert(errors[0])
      this.setState({ errors })
    })
  }

  render(){

    return (
      <div className='delete-save'>
        <form>
          <div className='row'>
            <div className="form-group col-md-6">
              <label htmlFor="propertyName">Property Name</label>
              <input type=""
                className="form-control"
                id="propertyName"
                value={this.state.propertyName}
                onChange={e => this.setState({ propertyName: e.target.value })}
                placeholder='Enter property name'
               />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="address">Address</label>
              <input type=""
                className="form-control"
                id="address"
                value={this.state.address}
                onChange={e => this.setState({ address: e.target.value })}
                placeholder='Enter address'
              />
            </div>
          </div>

        </form>


        <div className="modal-footer">
          <button
            data-dismiss="modal"
            onClick={this.deleteProperty.bind(this)}
            className="btn btn-danger">Delete
          </button>
          <button
            data-dismiss="modal"
            onClick={this.updateProperty.bind(this)}
            className="btn btn-primary">Save
          </button>
        </div>

      </div>

    )
  }
}

const ComponentWithMutations = graphql(updateProperty, {name: 'updateProperty'})(
  graphql(deleteProperty, {name: 'deleteProperty'})(EditPropertyForm)
)

export default ComponentWithMutations
