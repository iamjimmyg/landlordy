import React, { Component } from 'react'
import { dateAndDueInfo } from '../../../helpers/DateHelper'
import { HorizontalBar } from 'react-chartjs-2'

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
      // console.log([propertyOwedColones, propertyTotalColones])
    })


    return (
      <div className='col-xl-6'>
        <div className='properties-overview-section'>
          <HorizontalBar
            data={{
              labels: propertyNames,
              datasets: [
                {
                  label: 'Dollars',
                  data: [6,0,0,0],
                  backgroundColor: 'rgba(90, 144, 144, 1)',
                  borderColor: 'rgba(90, 144, 144, 1)',
                  borderWidth: 1,
                },
                {
                  label: 'Colones',
                  data: [5,0,0,0],
                  backgroundColor: 'rgba(90, 144, 144, 1)',
                  borderColor: 'rgba(90, 144, 144, 1)',
                  borderWidth: 1,
                },
                {
                  label: 'Total',
                  data: [11,0,0,0],
                  backgroundColor: 'rgba(90, 144, 144, 1)',
                  borderColor: 'rgba(90, 144, 144, 1)',
                  borderWidth: 1,
                },
              ],
            }}
            type='horizontalBar'
            options={{
              scales: {
                yAxes: [{
                  stacked: true,
                }],
                xAxes: [{
                  stacked: true
                }]
              }
            }}
          />
        </div>
      </div>

    )
  }
}

export default PropertiesOverview
