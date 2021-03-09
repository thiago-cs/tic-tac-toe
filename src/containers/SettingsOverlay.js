import React, { Component } from 'react';
import Player from '../model/Player.js';
import './SettingsOverlay.css';

export default class Overlay extends Component
{
	constructor(props)
	{
		super(props);

		const { game } = this.props;

		this._players = [];
		this._indexFirstPlayer = game.currentPlayerIndex === 1 ? 1 : 0;

		for (const p of game.players)
			this._players.push(new Player(p.name, p.symbol, p.color));

		this.onPlayerNameChanged = this.onPlayerNameChanged.bind(this);
		this.onPlayerColorChanged = this.onPlayerColorChanged.bind(this);
		this.onFirstPlayerSelected = this.onFirstPlayerSelected.bind(this);

		this.onStartClick = () => props.onStartClick({ players: this._players, indexFirstPlayer: this._indexFirstPlayer });
	}

	onPlayerNameChanged(e)
	{
		this._players[e.target.getAttribute("index")].name = e.target.value;
	}

	onPlayerColorChanged(e)
	{
		this._players[e.target.getAttribute("index")].color = e.target.value;
	}

	onFirstPlayerSelected(e)
	{
		this._indexFirstPlayer = e.target.getAttribute("index");
	}

	render ()
	{
		//
		const style = { };

		if (!this.props.isVisible)
			style.visibility = "hidden";

		//
		const inputControls = [];

		for (let i = 0; i < this._players.length; i++)
		{
			const player = this._players[i];

			inputControls.push(
				<input key={"name" + i}
					   index={i}
					   type="text"
					   placeholder={`Player ${i}`}
					   defaultValue={player.name}
					   onChange={this.onPlayerNameChanged} />);

			inputControls.push(
				<input key={"color" + i}
					   index={i}
					   type="color"
					   defaultValue={player.color}
					   onChange={this.onPlayerColorChanged} />);

			inputControls.push(
				<input key={"first" + i}
					   index={i}
					   type="radio"
					   name="first"
					   defaultChecked={this._indexFirstPlayer == i}
					   onChange={this.onFirstPlayerSelected} />);
		}


		//
		return (

		<div className="Settings" style={style} >
			<div className="wrapper" >
				<fieldset>
					<span className="header" >Name</span>
					<span className="header" >Color</span>
					<span className="header" >First?</span>
					{inputControls}

					<button onClick={this.onStartClick}>play</button>
				</fieldset>
			</div>
		</div>
		);
	}
}