import { memo } from 'react';
import './Square.css';

export default memo(Render, AreEqual);

function Render(props)
{
	const { index, value, onClick } = props;
	const className = value == null ? "empty Square" : "filled Square";

	return (
		<button key={value} className={className} onClick={()=>onClick(index)}>
			{value}
		</button>);
}

function AreEqual(prevProps, nextProps)
{
	return prevProps.value === nextProps.value;
}