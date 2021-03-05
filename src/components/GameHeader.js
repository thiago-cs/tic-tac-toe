import React from 'react';
import './GameHeader.css';

export default function (props)
{
	const { players, current, status, onPlayAgain } = props;

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
		</div>
	);
}