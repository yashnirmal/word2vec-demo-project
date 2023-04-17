import { useState } from "react"

export default function Comp2({model}){

	const [word1,setWord1] = useState("")
	const [word2,setWord2] = useState("")
	const [result,setResult] = useState()


	function findWordSimilarity(){
		fetch(`http://127.0.0.1:5000/words_similarity?model=${model}&word1=${word1}&word2=${word2}`)
		.then(res=>res.json())
		.then(data=>{
			console.log(data)
			if(data.status=="ok"){
				setResult(data.result)
			}
		})
		.catch((err)=>{
			console.log("Server error! ",err)
		})
	}

	return (
		<div className="w-full h-[400px] box flex flex-col gap-4 p-4">
			<h2 className="text-3xl font-semibold">Similarity between 2 Word</h2>
			<p>Given two words, this demo gives the similarity value between 0 and 1.</p>

			<div className="w-full">
				<div className="flex gap-4">
					<input className="flex-grow" type="text" value={word1} onChange={(e)=>setWord1(e.target.value)} placeholder="Enter first word" />
					<input className="flex-grow" type="text" value={word2} onChange={(e)=>setWord2(e.target.value)} placeholder="Enter second word" />
					<button onClick={findWordSimilarity}>Submit</button>
				</div>
			</div>

			{/* Result */}
			{
				result&&<div className="flex flex-col">
					<h2 className="text-xl font-semibold">Result</h2>
					<p>{result}</p>
				</div>
			}
		</div>
	)
}