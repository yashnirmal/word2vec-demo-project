export default function Comp2({model}){
	return (
		<div className="w-full h-[400px] box flex flex-col gap-4 p-4">
			<h2 className="text-3xl font-semibold">Word analogy</h2>
			<p>This demo computes word analogy: the first word is to the second word like the third word is to which word? Try for example air - bird - water which would expect to return fish</p>

			<div className="w-full">
				<div className="flex flex-wrap gap-4">
					<input className="flex-grow" type="text" placeholder="Enter a word" />
					<input className="flex-grow" type="text" placeholder="Enter a word" />
					<input className="flex-grow" type="text" placeholder="Enter a word" />
					<button>Submit</button>
				</div>
			</div>
		</div>
	)
}