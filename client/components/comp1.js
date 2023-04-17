import {useState} from "react"
import Modal from "./modal"
import SuggestionList from "./suggestionlist"

export default function Comp1({model}){

	const [word,setWord] = useState("")
	const [result,setResult] = useState()
	const [open,setOpen] = useState(false)
	const [suggestionOpen,setSuggestionOpen] = useState(false)

	function findNearestWords(){
		console.log("model sent",model)
		fetch(`http://127.0.0.1:5000/nearest_words?model=${model}&word=${word}`)
		.then(res=>res.json())
		.then(data=>{
			console.log(data)
			if(data.status=="ok"){
				console.log(data.result)
				setResult(data.result)
			}
		})
		.catch((err)=>{
			console.log("Server error! ",err)
		})
	}

	function resultClicked(w){
		setWord(w)
	}

	return (
		<div className="w-full h-[400px] box flex flex-col gap-4 p-4">
			<h2 className="text-3xl font-semibold">Nearest Words</h2>
			<p>Given a word, this demo shows a list of other words that are similar to it, i.e. nearby in the vector space.</p>

			<div className="w-full">
				<div className="flex gap-4">
					<div className="w-full relative">
						<input className="w-full flex-grow" type="text" onChange={(e)=>setWord(e.target.value)} value={word} placeholder="Enter a word" onFocus={()=>setSuggestionOpen(true)} onBlur={()=>setSuggestionOpen(false)} />
						{
							suggestionOpen && <SuggestionList model={model} word={word} setWord={setWord} />
						}
					</div>
					<button onClick={findNearestWords}>Submit</button>
					
				</div>
			</div>
			
			<div className="flex-grow h-full overflow-y-scroll">
				{
					result?.map((item,idx)=>(
						<div className="flex justify-between p-1" onClick={()=>resultClicked(item[0])}>
							<p className="cursor-pointer hover:underline">{idx+1}. {item[0]}</p>
							<p>{item[1]}</p>
						</div>
					))
				}
			</div>

			<div className="cursor-pointer underline font-semibold" onClick={()=>setOpen(true)}>
				Show graph
			</div>

			{open && <Modal setOpen={setOpen} result={result} />}
		</div>
	)
}