import React, { Component } from 'react'
import { dateAndDueInfo } from '../../../helpers/DateHelper'
import { Bar, HorizontalBar } from 'react-chartjs-2'

class PropertiesOverview extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  render(){
    const conversionRate = this.props.conversionRate ? this.props.conversionRate.USD_CRC.toFixed(2) : ''
    const { loading, user } = this.props.data
    let propertyNames = []
    let propertyAmounts = []
    user.company.properties.forEach(property => {
      propertyNames.push(property.propertyName)

      let propertyTotalColones = 0
      let propertyTotalDollars = 0
      let propertyOwedColones = 0
      let propertyOwedDollars = 0
      property.units.forEach(unit => {
        if(unit.currency === 'Dollars'){
          propertyOwedDollars = propertyOwedDollars + unit.amountOwed
          propertyTotalDollars = propertyTotalDollars + (unit.rentAmount - unit.amountOwed)
        }else {
          propertyOwedColones = propertyOwedColones + unit.amountOwed
          propertyTotalColones = propertyTotalColones + (unit.rentAmount - unit.amountOwed)

        }
      })

      propertyAmounts.push({
        totalColones: propertyTotalColones,
        totalDollars: propertyTotalDollars,
        owedColones: propertyOwedColones,
        owedDollars: propertyOwedDollars,
      })
    })

    let dollars = []
    let colones = []
    let colonesOwed = []
    let dollarsOwed = []

    propertyAmounts.forEach((amounts, i) => {
      for(var k in amounts){
        if(k === 'totalColones') colones.push(amounts[k])
        else if(k === 'totalDollars') dollars.push(Math.round(amounts[k] * conversionRate))
        else if(k === 'owedColones') colonesOwed.push(amounts[k])
        else if(k === 'owedDollars') dollarsOwed.push(Math.round(amounts[k] * conversionRate))
      }
    })

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
    var that = this

    return (

          <Bar
            data={data}
            options={{
              maintainAspectRatio: false,
              animation: {
                onProgress: function(animation) {
                  //console.log(animation)
                }
              },
              tooltips: {
                callbacks: {
                  label: function(tooltipItem, data) {
                    console.log(tooltipItem)
                    if(tooltipItem.datasetIndex === 0){
                      return '$' + (Math.round(tooltipItem.yLabel * that.props.conversionRate.CRC_USD).toLocaleString())
                    }
                    if(tooltipItem.datasetIndex === 1){
                      return '₡' + Math.round(tooltipItem.yLabel).toLocaleString()
                    }
                    if(tooltipItem.datasetIndex === 2){
                      return '$' + (Math.round(tooltipItem.yLabel * that.props.conversionRate.CRC_USD).toLocaleString())
                    }
                    if(tooltipItem.datasetIndex === 3){
                      return '₡' + Math.round(tooltipItem.yLabel).toLocaleString()
                    }
                  }
                }
              },
              scales: {
                xAxes: [{
                  stacked: true,
                }],
                yAxes: [{

                  ticks: {
                    callback: function(value){return '₡' + value.toLocaleString()}
                  },
                  stacked: true
                }]
              }
            }}
          />
    )
  }
}

export default PropertiesOverview
