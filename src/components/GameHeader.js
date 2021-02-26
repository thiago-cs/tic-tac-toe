import './GameHeader.css';


const hidden = { display: "none" };

export default function (props)
{
	const { players, current, status, onPlayAgain } = props;

	//
	const children = [];

	for (let i = 0; i < players.length; i++)
	{
		const p = players[i];
		const key = children.length;
		children.push(<span key={key}     className="name"  style={{ color: p.color }}>{p.name}</span>);
		children.push(<span key={key + 1} className="score" >{p.score}</span>);
	}

	const bulletIndicator = 
		<img key="bullet"
			className="bullet" 
			alt="current player" 
			style={{ gridRowStart: current + 1 }} />;

	children.push(bulletIndicator);

	//

	return (
	
		<div className="game-header" >
			<div className="players" >
				{children}
			</div>
			<div className="play-again" style={ status === "running" ? hidden : undefined } >
				<span>play again</span>
				<span className="icon-again" onClick={onPlayAgain} />
			</div>
		</div>
	);
}