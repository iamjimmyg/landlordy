import React, { Component } from 'react'
import { dateAndDueInfo } from '../../../helpers/DateHelper'
import { HorizontalBar } from 'react-chartjs-2'

class PropertiesOverview extends Component {
  constructor(props){
    super(props)
    this.state = {}
    this.switchCurrency = this.switchCurrency.bind(this)
  }

  switchCurrency(){

  }

  render(){
    const { loading, user } = this.props.data
    let propertyNames = []
    let propertyAmounts = []
    user.company.properties.forEach(property => {
      propertyNames.push(property.propertyName)
      let totalDollarsToColonesConversion = 0

      let propertyTotalColones = 0
      let propertyTotalDollars = 0
      let propertyOwedColones = 0
      let propertyOwedDollars = 0
      property.units.forEach(unit => {
        if(unit.currency === 'Dollars'){


          propertyTotalDollars = propertyTotalDollars + unit.rentAmount
          propertyOwedDollars = propertyOwedDollars + unit.amountOwed

          //totalDollarsToColonesConversion = propertyOwedDollars * this.props.conversionRate.USD_CRC
        }else {
          propertyTotalColones = propertyTotalColones + unit.rentAmount
          propertyOwedColones = propertyOwedColones + unit.amountOwed
        }
      })

      propertyAmounts.push({
        totalColones: propertyTotalColones,
        totalDollars: propertyTotalDollars,
        owedColones: propertyOwedColones,
        owedDollars: propertyOwedDollars,
      })
    })

    console.log(propertyAmounts)

    let dollars = []
    let colones = []
    let colonesOwed = []
    let dollarsOwed = []

    propertyAmounts.forEach((amounts, i) => {
      for(var k in amounts){
        if(k === 'totalColones') colones.push(amounts[k])
        else if(k === 'totalDollars') dollars.push(Math.round(amounts[k] * this.props.conversionRate.USD_CRC))
        else if(k === 'owedColones') colonesOwed.push(amounts[k])
        else if(k === 'owedDollars') dollarsOwed.push(Math.round(amounts[k] * this.props.conversionRate.USD_CRC))
      }
    })

    console.log([dollars, colones, colonesOwed, dollarsOwed])


    let data = {
      labels: propertyNames,
      datasets: [
        {
          label: 'Dollars',
          data: dollars,
          backgroundColor: 'rgba(99,155,147, .8)',
          borderColor: 'rgba(99,155,147, 1)',
          borderWidth: 1,
        },
        {
          label: 'Colones',
          data: colones,
          backgroundColor: 'rgba(99,155,147, .6)',
          borderColor: 'rgba(99,155,147, 1)',
          borderWidth: 1,
        },
        {
          label: 'Dollars Owed',
          data: dollarsOwed,
          backgroundColor: 'rgba(155,99,107, .5)',
          borderColor: 'rgba(155,99,107, 1)',
          borderWidth: 1,
        },
        {
          label: 'Colones Owed',
          data: colonesOwed,
          backgroundColor:'rgba(155,99,107, .3)',
          borderColor: 'rgba(155,99,107, 1)',
          borderWidth: 1,
        },

      ],
    }

    return (
      <div className='col-xl-6'>
        <div className='properties-overview-section'>
          <h5 className='text-center'>Properties Overview</h5>
          <HorizontalBar
            data={data}
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
