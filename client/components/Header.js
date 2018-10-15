import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { Link } from 'react-router'
import query from '../queries/CurrentUser'
import mutation from '../mutations/Logout'

class Header extends Component {
  onLogoutClick(){
    this.props.mutate({
      refetchQueries: [{ query }]
    })
  }

  renderButtons() {
    const { loading, user } = this.props.data

    if(loading) { return <div/> }

    if(user) {
      return (
        <li className='nav-item'><a href='#' className='nav-link' onClick={this.onLogoutClick.bind(this)}>Logout</a></li>
      )
    }else {
      return (
        <div className='nav'>
          <li className='nav-item'>
            <Link to='/signup' className='nav-link'>Signup</Link>
          </li>
          <li className='nav-item'>
            <Link to='/login' className='nav-link'>Login</Link>
          </li>
        </div>
      )
    }

  }
  render(){

    return (
      <nav className='navbar nav'>
        <div className='container-fluid'>
          <div className='sidebar-div'></div>
          <Link to='/' className='brand-logo left nav-link'>Home</Link>
          <div className=''>
            {this.renderButtons()}
          </div>
        </div>
      </nav>
    )
  }
}

export default graphql(mutation)(
  graphql(query)(Header)
)
