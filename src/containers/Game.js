import Board from "../components/Board.js";
import Header from "../components/GameHeader.js";
import './Game.css';

export default function (props)
{
		const { game, onClick, onPlayAgain } = props;

		return <>

		<Header players={game.players} current={game.currentPlayerIndex} status={game.status} onPlayAgain={onPlayAgain} />
		<Board  squares={game.squares} onClick={onClick} />

		</>;
}