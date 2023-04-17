import { useEffect, useState } from 'react'
import {Chart} from 'react-google-charts'
import tsnejs from 'tsne';

export default function Modal({setOpen,embeddingClusters,wordClusters}){

   

    const [tsneEmbeddings,setTsneEmbeddings] = useState([])

    useEffect(()=>{
        console.log(embeddingClusters)

        const tsneOptions = {
            perplexity: 30,
            epsilon: 10,
            dim: 2
        }

        // Create a new t-SNE instance with the data matrix and configuration options
        let tsne = new tsnejs.tSNE(tsneOptions);
        tsne.initDataDist(embeddingClusters);

        // Run t-SNE for a specified number of iterations
        for (let i = 0; i < 100; i++) {
            tsne.step();
        }

        // Get the t-SNE embeddings
        let newEmbeddings = tsne.getSolution();

        console.log(newEmbeddings)

        newEmbeddings.forEach(em => {
            em[0]=em[0]*Math.pow(10,10)
            em[1]=em[1]*Math.pow(10,10)
        });

        let tempArr = []
        newEmbeddings.map((em,idx)=>{
            tempArr.push([em[0],em[1],wordClusters[idx]])
        })

        console.log("temp : ",tempArr)

        // Update the state with the new embeddings
        setTsneEmbeddings(tempArr);
    },[])

    return (
        <div className="w-full h-full fixed top-0 left-0 flex items-center justify-center bg-black/70">
            <div className="py-2 px-4 text-lg fixed top-2 right-2 bg-gray-300/70 rounded-full cursor-pointer" onClick={()=>setOpen(false)}>
                X
            </div>
            <div className="w-[70%] h-[70%] bg-white rounded-xl p-4 flex flex-col ">
                <h1 className="font-bold text-xl">TSNE Graph</h1>
                <div className="flex-grow">
                    <Chart
                        width='100%'
                        height='100%'
                        chartType="ScatterChart"
                        loader={<div>Loading Chart...</div>}
                        data={[['tsne-emb-1', 'tsne-emb-2', { type: 'string', role: 'tooltip' }],
                            ...tsneEmbeddings
                        ]}
                        options={{
                            title: 'TSNE embeddings for each word',
                            legend: 'none',
                            // tooltip: { isHtml: true },
                            explorer: {
                                actions: ['dragToZoom', 'rightClickToReset'],
                                axis: 'horizontal',
                                maxZoomIn: 8.0,
                                maxZoomOut: 0.5,
                              },
                        }}
                    />
                </div>
            </div>
        </div>
    )
}