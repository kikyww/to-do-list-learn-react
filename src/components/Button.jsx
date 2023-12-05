const Button = ({ onButtonClick}) => {
	return(
		<div className="flex justify-end">
			<button className="bg-red-500 text-white px-3 py-2 rounded-full text-center hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:bg-red-600" onClick={onButtonClick}>Clear</button>	
		</div>
	)

}

export default Button