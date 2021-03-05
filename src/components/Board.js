import Square from './Square.js';
import './Board.css';

export default function (props)
{
	const { squares, onClick } = props;

	return (

	<div className="Board" >
		{squares.map((e, i) => <Square key={i} index={i} value={e} onClick={onClick} />)}
	</div>

	);
}