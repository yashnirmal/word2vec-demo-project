import { useEffect, useState } from 'react'
import {Chart} from 'react-google-charts'

const data = [
    ['vehicle', 0.7821096181869507],
    ['cars', 0.7423831224441528],
    ['SUV', 0.7160962224006653],
    ['minivan', 0.6907036900520325],
    ['truck', 0.6735789775848389],
    ['Car', 0.6677608489990234],
    ['Ford_Focus', 0.667320191860199],
    ['Honda_Civic', 0.6626849174499512],
    ['Jeep', 0.651133120059967],
    ['pickup_truck', 0.6441438794136047]
]

export default function Modal({setOpen,scatterData}){

    useEffect(()=>{
        console.log(scatterData.flat())
    },[])

    return (
        <div className="w-full h-full fixed top-0 left-0 flex items-center justify-center bg-black/70">
            <div className="py-2 px-4 text-lg fixed top-2 right-2 bg-gray-300/70 rounded-full cursor-pointer" onClick={()=>setOpen(false)}>
                X
            </div>
            <div className="w-[70%] h-[70%] bg-white rounded-xl p-4 flex flex-col ">
                <h1 className="font-bold text-xl">Graph</h1>
                <div className="flex-grow">
                    <Chart
                        width='100%'
                        height='100%'
                        chartType="ScatterChart"
                        loader={<div>Loading Chart...</div>}
                        data={[['Embedding', 'Word'],
                            ...scatterData.flat().map((dataPoint) => [dataPoint.x,dataPoint.word.length]),
                        ]}
                        options={{
                            title: 'Word Clusters',
                            vAxis: { title: 'Embedding' },
                            legend: 'none',
                        }}
                        rootProps={{ 'data-testid': '1' }}
                    />                    
                </div>
            </div>
        </div>
    )
}