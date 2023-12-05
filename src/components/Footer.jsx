const Footer = ({ itemsCounter, completedCounter, alarmOn }) => {
	return(
		<>
			<div className="font-semibold flex justify-between gap-2">
				<span className="p-1 w-[95px]">Notif : {alarmOn ? 'On!' : 'Off!'}</span> 
				<span className="p-1">Tasks : {itemsCounter}</span> 
				<span className="p-1">Completed : {completedCounter}</span> 
			</div>
				<p>*Note: We have a small bug on notification</p> 
		</>
	)
}

export default Footer