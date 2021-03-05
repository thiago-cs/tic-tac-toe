import React, { Component } from 'react';
import './Overlay.css';

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

		switch (game.status)
		{
			case "running":
				style.visibility = "hidden";
				break;

			case "tie":
				break;

			case "win":
				break;
		}

		return (

		<div className="temp" style={style} >
			<div className="play-again" >
				<span>Play again</span>

				<span ref={this._playAgainRef}
					  className="icon-again animate fast"
					  onClick={onPlayAgain}
					  onMouseDown={this.onMouseDown}
					  onMouseUp={this.onMouseUp} />
			</div>
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