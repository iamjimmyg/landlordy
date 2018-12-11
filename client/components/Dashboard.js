import React, { Component } from 'react'
import Header from './Header'
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
const mql = window.matchMedia(`(min-width: 1200px)`);
const mqlMed = window.matchMedia(`(min-width: 767px)`);

import { BrowserRouter, Router, hashHistory, Route, Link } from 'react-router'
import Overview from './main_pages/Overview'
import Properties from './main_pages/Properties'
import Property from './main_pages/Property'
import Tenants from './main_pages/Tenants'
import Admin from './main_pages/Admin'

import Loader from './Loader'

import axios from 'axios'

class Dashboard extends Component {
  constructor(props){
    super(props)
    this.state = {
      errors: [],
      expanded: mql.matches,
      selected: 'overview',
      hamburgerMenu: false,
      mediumView: mqlMed.matches,
    }
    this.hamburgerClick = this.hamburgerClick.bind(this)
    this.onToggle = this.onToggle.bind(this)
    this.onSelect = this.onSelect.bind(this)
    this.mountComponent = this.mountComponent.bind(this)
    this.checkMount = this.checkMount.bind(this)
  }

  componentWillUpdate(nextProps){
    if(nextProps !== this.props) {
      if(nextProps.location.pathname === '/dashboard/overview' || nextProps.location.pathname === '/dashboard'){
        this.setState({ selectedComponent: <Overview {...nextProps} conversionRate={this.state.conversionRate}/>, selected: 'overview' })
      }else if(nextProps.location.pathname === '/dashboard/properties'){
        this.setState({ selectedComponent: <Properties viewProperty={this.viewProperty.bind(this)} mediumView={this.state.mediumView} {...nextProps}/>, selected: 'properties' })
      }else if(nextProps.location.pathname === '/dashboard/tenants'){
        this.setState({ selectedComponent: <Tenants viewProperty={this.viewProperty.bind(this)} {...nextProps}/>, selected: 'tenants' })
      }else if(nextProps.location.pathname === '/dashboard/admin'){
        this.setState({ selectedComponent: <Admin {...nextProps}/>, selected: 'admin' })
      }else {
        let path = nextProps.location.pathname.split('/')
        if(nextProps.location.pathname.includes('properties')){
          this.setState({ selectedComponent: <Property propertyId={path[3]} {...nextProps}/>, selected: 'properties' })
        }
      }
    }
  }

  componentDidMount(){

    const checkWindow = () =>{
      if(window.innerWidth < 1200) this.setState({ expanded: false, mobileView: false })
      else this.setState({ expanded: true, mobileView: false })
      if(window.innerWidth < 700) this.setState({ hamburgerMenu: false, expanded: true, mobileView: true })
    }
    checkWindow()
    window.onresize=()=>{
      checkWindow()
    }

    //// NOTE: find current exchange rate for dollars and colones and save to local storage
    // and update cache every hour
    const cachedConversionRate = localStorage.getItem('conversionRate')
    const cachedHour = JSON.parse(localStorage.getItem('cacheHour'))
    const cachedDay = JSON.parse(localStorage.getItem('cacheDay'))
    const date = new Date()

    const currentDay = date.getDate()
    const currentHour = date.getHours()

    const shouldCacheUpdate = currentDay !== cachedDay || currentHour !== cachedHour ? true : false
    if(!cachedConversionRate || shouldCacheUpdate) {
      const request = axios.get('http://free.currencyconverterapi.com/api/v6/convert?q=USD_CRC,CRC_USD&compact=ultra')

        .then(res => {
          let date = new Date()
          let hour = date.getHours()
          let day = date.getDate()
          localStorage.setItem('cacheHour', JSON.stringify(hour))
          localStorage.setItem('cacheDay', JSON.stringify(day))
          localStorage.setItem('conversionRate', JSON.stringify(res.data))
          this.setState({ conversionRate: res.data, cacheHour: hour, cacheDay: day }, function(){
            this.checkMount()
          })

         })
    }else {
      this.setState({ conversionRate: JSON.parse(cachedConversionRate), cacheHour: cachedHour, cacheDay: cachedDay }, function(){
        this.checkMount()
      })

    }

  }

  checkMount(){

    const { loading, user } = this.props.data
    if(!loading){
      if(this.props.location.pathname === '/dashboard/overview' || this.props.location.pathname === '/dashboard'){
        this.setState({ selectedComponent: <Overview {...this.props} conversionRate={this.state.conversionRate}/>, selected: 'overview' })
      }else if(this.props.location.pathname === '/dashboard/properties'){
        this.setState({ selectedComponent: <Properties viewProperty={this.viewProperty.bind(this)} mediumView={this.state.mediumView} {...this.props}/>, selected: 'properties' })
      }else if(this.props.location.pathname === '/dashboard/tenants'){
        this.setState({ selectedComponent: <Tenants viewProperty={this.viewProperty.bind(this)} {...this.props}/>, selected: 'tenants' })
      }else if(this.props.location.pathname === '/dashboard/admin'){
        this.setState({ selectedComponent: <Admin {...this.props}/>, selected: 'admin' })
      }else {
        let path = this.props.location.pathname.split('/')
        let property = this.props.data.user.company.properties.filter(prop => {
          if(prop.id === path[0]) console.log('ohhh sheet')
        })
        if(this.props.location.pathname.includes('properties')){
          this.setState({ selectedComponent: <Property propertyId={path[3]} {...this.props}/>, selected: 'properties' })
        }
      }
    }

  }

  viewProperty(property){
    this.setState({ selectedComponent: <Property propertyId={property.id} property={property} {...this.props} /> })
    this.props.router.push(`/dashboard/properties/${property.id}`)
  }


  mountComponent(selected){
    const { loading, user } = this.props.data
    if(!loading){
      if(selected === 'overview') this.setState({ selectedComponent: <Overview {...this.props} conversionRate={this.state.conversionRate}/> })
      if(selected === 'properties') this.setState({ selectedComponent: <Properties viewProperty={this.viewProperty.bind(this)} {...this.props} mediumView={this.state.mediumView}/> })
      if(selected === 'tenants') this.setState({ selectedComponent: <Tenants viewProperty={this.viewProperty.bind(this)} {...this.props}/> })
      if(selected === 'admin') this.setState({ selectedComponent: <Admin {...this.props}/> })
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

    if(loading) return <Loader />
    else return (
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
              {user.isAdmin ? <NavItem eventKey="admin">
                <NavIcon>
                  <i className="material-icons" style={{ fontSize: '1.75em', top: '8px', position: 'relative' }} >settings</i>
                </NavIcon>
                <NavText>
                  ADMIN
                </NavText>
              </NavItem> : ''}

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
