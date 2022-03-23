function Button({ handleClick, id, digit, content, disabled }) {
	return (
		<button
			onClick={handleClick}
			id={id}
			disabled={disabled}
		>
			{content}
		</button>
	)
}

export default Button;