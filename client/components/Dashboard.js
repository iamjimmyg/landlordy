import React, { Component } from 'react'
import Header from './Header'
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
const mql = window.matchMedia(`(min-width: 1200px)`);
const mqlMed = window.matchMedia(`(min-width: 767px)`);

import { Router, hashHistory, Route, Link } from 'react-router'
import Overview from './main_pages/Overview'
import Properties from './main_pages/Properties'
import Tenants from './main_pages/Tenants'

class Dashboard extends Component {
  constructor(props){
    super(props)
    this.state = {
      errors: [],
      expanded: mql.matches,
      selected: 'overview',
      hamburgerMenu: false,
      mediumView: mqlMed.matches
    }
    this.hamburgerClick = this.hamburgerClick.bind(this)
    this.onToggle = this.onToggle.bind(this)
    this.onSelect = this.onSelect.bind(this)
    this.mountComponent = this.mountComponent.bind(this)
  }

  componentDidMount(){
    const checkWindow = () =>{
      if(window.innerWidth < 1200) this.setState({ expanded: false, mobileView: false })
      else this.setState({ expanded: true, mobileView: false })
      if(window.innerWidth < 502) this.setState({ hamburgerMenu: false, expanded: true, mobileView: true })
    }
    checkWindow()
    window.onresize=()=>{
      checkWindow()
    }
    if(this.props.location.pathname === '/dashboard/overview' || this.props.location.pathname === '/dashboard'){
      this.setState({ selectedComponent: <Overview />, selected: 'overview' })
    }else if(this.props.location.pathname === '/dashboard/properties'){
      this.setState({ selectedComponent: <Properties mediumView={this.state.mediumView}/>, selected: 'properties' })
    }else if(this.props.location.pathname === '/dashboard/tenants'){
      this.setState({ selectedComponent: <Tenants />, selected: 'tenants' })
    }
  }


  mountComponent(selected){
    const { loading, user } = this.props.data
    if(!loading){
      if(selected === 'overview') this.setState({ selectedComponent: <Overview {...this.props}/> })
      if(selected === 'properties') this.setState({ selectedComponent: <Properties {...this.props} mediumView={this.state.mediumView}/> })
      if(selected === 'tenants') this.setState({ selectedComponent: <Tenants {...this.props}/> })
    }
  }

  onToggle(){
    this.setState({ expanded: !this.state.expanded })
  }

  onSelect(selected){
    this.setState({ selected: selected });
    this.props.router.push(`/dashboard/${selected}`)
    this.mountComponent(selected)
    if(this.state.mobileView) this.setState({ hamburgerMenu: false })
  }

  hamburgerClick(event) {
    event.preventDefault()
    if(this.state.hamburgerMenu === false){
      this.setState({ hamburgerMenu: true})
    }else if(this.state.hamburgerMenu === true) {
      this.setState({ hamburgerMenu: false})
    }
  }

  render(){
    const { loading, user } = this.props.data
    return (
      <div className=''>
        <button onClick={this.hamburgerClick} className="navbar-toggler sidebar-button" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded='false' aria-label="Toggle navigation">
          <div
            className={`${this.state.hamburgerMenu === true ? 'open navbar-toggler-icon' : 'navbar-toggler-icon'}`}
            >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
        <SideNav
          style={{left: `${(this.state.mobileView === false) ? '0' : (this.state.hamburgerMenu === false ? '-240' : '0')}px`}}
          className='sidebar'
          expanded={this.state.expanded}
          onToggle={()=>{this.onToggle()}}
          onSelect={(selected) => {
            this.onSelect(selected)
          }}>
          <SideNav.Toggle className='toggle-button'/>
          <SideNav.Nav selected={this.state.selected}>
              <NavItem eventKey="overview" >
                <NavIcon>
                  <i className="material-icons" style={{ fontSize: '1.75em', top: '8px', position: 'relative' }} >desktop_windows</i>
                </NavIcon>
                <NavText>
                  OVERVIEW
                </NavText>
              </NavItem>
              <NavItem eventKey="properties">
                <NavIcon>
                  <i className="material-icons" style={{ fontSize: '1.75em', top: '8px', position: 'relative' }} >store_mall_directory</i>
                </NavIcon>
                <NavText>
                  PROPERTIES
                </NavText>
              </NavItem>
              <NavItem eventKey="tenants">
                <NavIcon>
                  <i className="material-icons" style={{ fontSize: '1.75em', top: '8px', position: 'relative' }} >group</i>
                </NavIcon>
                <NavText>
                  TENANTS
                </NavText>
              </NavItem>
          </SideNav.Nav>
        </SideNav>

        <main className=''
          style={{
          height: 'calc(100vh - 58px)',
          overflow: 'auto',
          marginLeft: `${(this.state.mobileView) ? '0' : (this.state.expanded === true ? '238' : '64')}px`,
          position: 'relative',
          transition: 'all .15s'
        }}>
          { !user ? <div>
            loading
          </div> :  <div>
            {this.state.selectedComponent}
          </div>  }
        </main>
      </div>
    )
  }
}

export default Dashboard
