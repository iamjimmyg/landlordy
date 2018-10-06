import React, { Component } from 'react'
import AddCompanyForm from './AddCompanyForm'

import { graphql } from 'react-apollo'
import mutation from '../mutations/addCompany'
import query from '../queries/CurrentUser'

class Dashboard extends Component {
  constructor(props){
    super(props)
    this.state = {
      errors: [],
    }
  }

  onSubmit({companyName, userId}){
    this.props.mutate({
      variables: {
        companyName, userId
      },
      refetchQueries: [{query}]
    }).catch(res => {
      const errors = res.graphQLErrors.map(error => error.message)
      this.setState({ errors: errors })
    })
  }

  render(){
    const { loading, user } = this.props.data

    return (
      <div>
        { !user ? <div>
          loading
        </div> : ((user.company === null) ? <div>
          <AddCompanyForm
            onSubmit={this.onSubmit.bind(this)}
            errors={this.state.errors}
            {...this.props}/>
        </div> : <div>
          {`hello ${this.props.data.user.company.companyName}`}
        </div> ) }
      </div>


    )
  }
}

export default graphql(query)(
 graphql(mutation)(Dashboard)
)
