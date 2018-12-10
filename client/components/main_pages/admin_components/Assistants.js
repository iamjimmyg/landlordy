import React, { Component } from 'react'

class Assistants extends Component {
  render(){
    let assistants = this.props.data.user.company.assistants.split(',').map((assistant, i) => {
      if(assistant !== ''){
        return <tr key={i}>
          <td>{assistant}</td>
        </tr>
      }
    })
    return (
      <div className='assistants'>
        <table>
          <thead>
            <tr>
              <td className='small-text'>Assistants: </td>
            </tr>
          </thead>
          <tbody>
            {assistants}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Assistants
