import React from 'react'
import Header from './Header'


const App = (props) => {
  return (
    <div>
      <Header {...props}/>
      {props.children}
    </div>
  )
}

export default App
