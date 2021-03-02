import React from "react";
import './GameHeader.css';


const hidden = { display: "none" };

export default function (props)
{
	const { players, current, status, onPlayAgain } = props;
	const playAgainRef = React.createRef();

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
	
		<div className="GameHeader" >
			<div className="players" >
				{children}
			</div>
			<div className="play-again" style={ status === "running" ? hidden : undefined } >
				<span>play again</span>
				<span ref={playAgainRef} className="icon-again animate fast" onClick={onPlayAgain} onMouseDown={f} onMouseUp={g} />
			</div>
		</div>
	);
	
	function f() { playAgainRef.current.classList.remove("rotateOut"); playAgainRef.current.classList.add("rotateIn"); }
	function g() { playAgainRef.current.classList.remove("rotateIn"); playAgainRef.current.classList.add("rotateOut"); }
}