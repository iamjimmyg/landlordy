import React, { Component } from 'react'
import { dateAndDueInfo } from '../../../helpers/DateHelper'
import { Bar } from 'react-chartjs-2'

class PropertiesOverview extends Component {

  render(){
    const { loading, user } = this.props.data
    let propertyNames = []
    user.company.properties.forEach(property => {
      propertyNames.push(property.propertyName)
      let propertyTotalColones = 0
      let propertyTotalDollars = 0
      let propertyOwedColones = 0
      let propertyOwedDollars = 0
      property.units.forEach(unit => {
        if(unit.currency === 'Dollars'){
          propertyTotalDollars = propertyTotalDollars + unit.rentAmount
          propertyOwedDollars = propertyOwedDollars + unit.amountOwed
        }else {
          propertyTotalColones = propertyTotalColones + unit.rentAmount
          propertyOwedColones = propertyOwedColones + unit.amountOwed
        }
      })
      console.log([propertyOwedColones, propertyTotalColones])
    })

    const data = {
      labels: propertyNames
    }

    return (
      <div className='properties-overview-section'>
        <Bar
          type='horizontalBar'
          data={[3,4,2,4,5,6,4,3,2]}

        />
      </div>
    )
  }
}

export default PropertiesOverview
