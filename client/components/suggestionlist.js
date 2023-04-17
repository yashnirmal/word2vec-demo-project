import { useEffect, useState } from "react"

export default function SuggestionList({word,setWord,model}){

    const [list,setList] = useState([])

    function findSuggestionList(){
		fetch(`http://127.0.0.1:5000/nearest_words?model=${model}&word=${word}`)
		.then(res=>res.json())
		.then(data=>{
			console.log(data)
			if(data.status=="ok"){
				setList(data.result)
			}
		})
		.catch((err)=>{
			console.log("Server error! ",err)
		})
	}

    useEffect(()=>{
        findSuggestionList()
    },[word])

    function listItemClicked(e,w){
        setWord(w)
    }

    return (
        <div className="min-h-10 w-full border-2 absolute translate-x-1/1 rounded-lg bg-white p-2">
            {
                list.map(el=>(
                    <p className="p-1 hover:bg-gray-200 rounded-md" onMouseDown={(e)=>listItemClicked(e,el[0])}>{el[0]}</p>
                ))
            }
        </div>
    )
}