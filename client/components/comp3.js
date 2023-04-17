import { use, useRef, useState } from "react"
import Tsne from './tsne'


export default function Comp3({model}){

	const inputRef = useRef()
	const [loading,setLoading] = useState("")
	const [open,setOpen] = useState(false)
	const [wordClusters, setWordClusters] = useState([]);
	const [embeddingClusters, setEmbeddingClusters] = useState([]);

	function multiSimilarWords(){

		setLoading("Loading...")

		console.log("model sent",model)
		const words = inputRef.current.value.split(",")
		console.log(words)

		const reqOptions = {
			method:"POST",
			headers: {
				'Content-Type':'application/json'
			},
			body:JSON.stringify({
				words:words,
				model:model
			})
		}

		fetch(`http://127.0.0.1:5000/multi_words`,reqOptions)
		.then(res=>res.json())
		.then(data=>{
			console.log(data)
			if(data.status=="ok"){
				console.log(data.result)
				let tempWordClusters = []
				data.result.word_clusters.forEach(wc=>{
					wc.forEach(el=>{
						tempWordClusters.push(el)
					})
				})
				console.log(tempWordClusters)
				setWordClusters(tempWordClusters);
        		setEmbeddingClusters(data.result.embedding_clusters);
			}
			setLoading("Loaded!")
		})
		.catch((err)=>{
			console.log("Server error! ",err)
			setLoading("Error occured!")
		})
	}

	const scatterData = [];

	if (embeddingClusters.length > 0) {

		// wordClusters.forEach((word_clus,i)=>{
		// 	word_clus.forEach((word,j)=>{

		// 	})
		// })

		for (let i = 0; i < wordClusters.length; i++) {
			const clusterData = [];
			for (let j = 0; j < wordClusters[i].length; j++) {
			  const word = wordClusters[i][j];
			  const embedding = embeddingClusters[i][j];
			  clusterData.push({ x: embedding, word: word });
			}
			scatterData.push(clusterData);
		  }
	}

	return (
		<div className="w-full h-[400px] box flex flex-col lg:col-span-2 gap-4 p-4">
			<h2 className="text-3xl font-semibold">Graph Visualization</h2>
			<p>Write the multiple words separated by comma</p>

			<div className="w-full">
				<div className="flex gap-4">
					<input ref={inputRef} className="flex-grow" type="text" placeholder="Example car,water,sky etc." />
					<button onClick={multiSimilarWords}>Submit</button>
				</div>
			</div>

			{
				loading&&<div>
					{loading}
				</div>
			}

			<div className="cursor-pointer underline font-semibold" onClick={()=>setOpen(true)}>
				Show graph
			</div>

			{open && <Tsne setOpen={setOpen} embeddingClusters={embeddingClusters} wordClusters={wordClusters} />}

		</div>
	)
}