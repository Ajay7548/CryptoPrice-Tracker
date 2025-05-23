import React, { useEffect, useState } from 'react'
import Chart from 'react-google-charts'

const LineChart = ({historicalData}) => {

    const [data,setData] = useState([['Dates','Prices']])

    useEffect(()=>{
        let dataCopy = [['Date','Prices']]
        if(historicalData.prices){
            historicalData.prices.map((item)=>{
                dataCopy.push([`${new Date(item[0]).toLocaleDateString().slice(0,-5)}`,item[1]])
            })
            setData(dataCopy)
        }
    },[historicalData])//it will change chart currency price on chart

  return (
    <Chart
    chartType='LineChart'
    height='100%'
    data={data}
    legendToggle
    />
  )
}

export default LineChart