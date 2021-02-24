import { Component } from "react";
import TicTacToe from "./model/TicTacToe.js";
import Game from './containers/Game.js';
import Confetti from "./components/Confetti.js";
import './App.css';

export default class App extends Component
{
	constructor(props)
	{
		super(props);

		//
		this._game = new TicTacToe();
		this._game.players[0].color = "YellowGreen";
		this._game.players[1].color = "SlateBlue";

		this.state = this.gameState;

		// Binding our callbacks...
		this.handleClick = this.handleClick.bind(this);
		this.reset = this.reset.bind(this);
	}

	get gameState()
	{
		return { squares: this._game.squares, gameState: this._game.status };
	}

	reset()
	{
		this._game.reset();
		this.setState(this.gameState);
	}

	handleClick(index)
	{
		// 2. Computes this app's new state.
		try
		{
			this._game.playerMove(index);
		}
		catch (error)
		{
			console.error(error.message);
			return;
		}

		// 3.
		this.setState({ squares: this._game.squares, gameState: this._game.status });
	}

	render()
	{
		// Coming soon
		const confettiStyle = {};
		
		if (this._game.status !== "win")
		{
			confettiStyle.display = "none";
			//setTimeout(ShowConfetti, 0);
		}

		return (

		<div className="App">
			<Game game={this._game} onClick={this.handleClick} onPlayAgain={this.reset} />
			{/* <Confetti style={confettiStyle} /> */}
		</div>

		);
	}
}
/**

["Arrow, music, play, arrows, audio, sound icon"](https://www.iconfinder.com/icons/1564490/arrow_music_play_arrows_audio_sound_icon) by [Artyom Khamitov](www.iconfinder.com/Kh.Artyom) is licensed under [Creative Commons (Attribution 3.0 Unported)](http://creativecommons.org/licenses/by/3.0/).

 */