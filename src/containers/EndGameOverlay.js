import React, { Component } from 'react';
import './EndGameOverlay.css';

export default class Overlay extends Component
{
	constructor(props)
	{
		super(props);

		this._playAgainRef = React.createRef();

		this.onMouseDown = this.onMouseDown.bind(this);
		this.onMouseUp = this.onMouseUp.bind(this);
	}

	render ()
	{
		const { game, onPlayAgain } = this.props;

		const style = { };
		let p1;
		let topColor;
		let bottomColor;

		switch (game.status)
		{
			case "running":
				style.visibility = "hidden";
				break;

			case "tie":
				topColor = game.players[0].color;
				bottomColor = game.players[1].color;

				p1 = <span>Game drawn</span>;

				break;

			case "win":
				const winner = game.currentPlayer;

				topColor = winner.color;
				bottomColor = winner.color;

				p1 = 
				<>
					<span style={{ color: winner.color, fontSize: "180%" }}>{winner.name}</span>
					<br/>
					<span>wins!</span>
				</>;
				break;
		}

		return (

		<div className="EndGame" style={style} >
			<div className="line" style={{ backgroundColor: topColor }} />
			<div className="wrapper" >
				<div className="game-result" >
					{p1}
				</div>
				<div className="play-again" >
					<span>Play again</span>

					<span ref={this._playAgainRef}
						className="icon animate fast"
						onClick={onPlayAgain}
						onMouseDown={this.onMouseDown}
						onMouseUp={this.onMouseUp} />
				</div>
			</div>
			<div className="line" style={{ backgroundColor: bottomColor }} />
		</div>

		);
	}

	onMouseDown()
	{
		this._playAgainRef.current.classList.remove("rotateOut");
		this._playAgainRef.current.classList.add("rotateIn");
	}

	onMouseUp()
	{
		this._playAgainRef.current.classList.remove("rotateIn");
		this._playAgainRef.current.classList.add("rotateOut");
	}
}