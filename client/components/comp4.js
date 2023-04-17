import { useState } from "react"

export default function Comp3({model}){

	const [word1,setWord1] = useState("")
	const [word2,setWord2] = useState("")
	const [word3,setWord3] = useState("")

	function findAnalogousWord(){
		fetch(`http://127.0.0.1:5000/word_analogy?model=${model}&word1=${word1}&word2=${word2}&word3=${word3}`)
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
			<h2 className="text-3xl font-semibold">Word analogy</h2>
			<p>This demo computes word analogy: the first word is to the second word like the third word is to which word? Try for example air - bird - water which would expect to return fish</p>

			<div className="w-full">
				<div className="flex flex-wrap gap-4">
					<input className="flex-grow" type="text" placeholder="Enter a word" value={word1} onChange={(e)=>setWord1(e.target.value)} />
					<input className="flex-grow" type="text" placeholder="Enter a word" value={word2} onChange={(e)=>setWord2(e.target.value)} />
					<input className="flex-grow" type="text" placeholder="Enter a word" value={word3} onChange={(e)=>setWord3(e.target.value)} />
					<button onClick={findAnalogousWord}>Submit</button>
				</div>
			</div>
		</div>
	) 
}