
const List = ({item, onDeleteItem, onToggleItem}) => {

	return(
		<>	
			<li key={item.id}>
				<div className="flex justify-between mb-2 ml-2 gap-4 items-center">
					<div className="flex items-center">
						<input className="mr-8 rounded-full bg-red-500 w-4 h-4" type="checkbox" checked={item.checked} onChange={() => onToggleItem(item.id)} />
							<span className="lg:w-[240px] w-[70px] font-semibold text-md" style={ item.checked ? { textDecoration: 'line-through', overflowWrap: 'break-word' } : {overflowWrap: 'break-word'} }>
								{item.task}
							</span>
					</div>	
					<span className="text-end ml-6 font-semibold">{item.time}</span>
					<button className="bg-red-500 text-center w-6 h-6 rounded-full text-center ml-3 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:bg-red-600 mr-5" onClick={() => onDeleteItem(item.id)}>x</button>
				</div>
			</li>
		</>
	)
}

export default List