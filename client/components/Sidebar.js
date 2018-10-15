import React from "react";
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

const mql = window.matchMedia(`(min-width: 1200px)`);

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: mql.matches,
    };
    this.onToggle = this.onToggle.bind(this)
  }

  componentDidMount(){
    window.onresize=()=>{
      if(window.innerWidth < 1200){
        this.setState({ expanded: false })
      }else {
        this.setState({ expanded: true })
      }

    }
  }

  onToggle(){
    this.setState({ expanded: !this.state.expanded })
  }

  render() {
    return (
      <SideNav
        className='sidebar'
        expanded={this.state.expanded}
        onToggle={()=>{this.onToggle()}}
        onSelect={(selected) => {
            // Add your code here
        }}>
        <SideNav.Toggle />
        <SideNav.Nav defaultSelected="overview">
            <NavItem eventKey="overview">
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
    );
  }
}

export default SideBar;
