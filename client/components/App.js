import React from 'react'
import Header from './Header'
import Home from './main_pages/Home'
require('../images/favicon.ico')

const App = (props) => {
  return (
    <div>
      <Header {...props}/>

      {props.location.pathname === '/' ? <Home /> : props.children}


    </div>
  )
}

export default App
