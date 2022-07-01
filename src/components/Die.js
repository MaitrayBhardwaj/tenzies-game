export default function Die(props) {
	return (
		<div className={`die ${ props.isFrozen ? 'frozen' : '' }`}
			onClick={ () => props.toggleFrozen(props.id) }>
			{props.value}
		</div>
	)
}