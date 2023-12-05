import { useState } from 'react'

const Input = ({ onAddItem }) => {
	const [taskName, setTaskName] = useState('')
	const [taskTime, setTaskTime] = useState('')

	const handleSubmit = (e) => {
		e.preventDefault()
		if(!taskName) return

		const newItem = {
			id : Date.now(),
			task : taskName,
			time : taskTime,
			checked : false,
			alarm : false,
		}

		onAddItem(newItem)
		setTaskName('')
		setTaskTime('')
	}

	return(
		<>
			<form onSubmit={handleSubmit}>
				<div className="flex lg:flex-row flex-col items-center gap-2">
					<label className="text-xl font-semibold">Task</label>
					<input className="bg-violet-300 focus:bg-violet-500 focus:text-white px-4 py-1 rounded-full text-black border-2 border-violet-700 focus:border-violet-800 focus:outline-none" type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
					<div className="flex gap-2">
					<input className="bg-violet-300 focus:bg-violet-500 focus:text-white px-4 py-1 rounded-full text-black border-2 border-violet-700 w-32 lg:w-[113px] focus:border-violet-800 focus:outline-none" type="time" value={taskTime} onChange={(e) => setTaskTime(e.target.value)} />
					<button className="bg-violet-600 h-max py-2 px-4 rounded-full text-white hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:bg-violet-700">Add</button>
					</div>
				</div>
			</form>
		</>
	)
}

export default Input