import React from "react";
import './GameHeader.css';


const hidden = { visibility: "hidden" };

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
		const row = `${2 * i + 1} / span 2`;
		children.push(<span key={key}     className="name"  style={{ gridRow: row, color: p.color }}>{p.name}</span>);
		children.push(<span key={key + 1} className="score" style={{ gridRow: row }} >{p.score}</span>);
	}

	const bulletIndicator = <img key="bullet" className="bullet" alt="current player" />;
	children.push(bulletIndicator);

	//

	return (
	
		<div className="GameHeader" >
			<div className={`players animate fast row${current + 1}`} >
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