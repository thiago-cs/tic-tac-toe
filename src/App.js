import { Component } from 'react';
import TicTacToeGame from './model/TicTacToeGame.js';
import Game from './containers/Game.js';
import Confetti from './components/Confetti.js';
import EndGameOverlay from './containers/EndGameOverlay.js';
import SettingsOverlay from './containers/SettingsOverlay.js';
import './App.css';

export default class App extends Component
{
	constructor(props)
	{
		super(props);

		//
		this._game = new TicTacToeGame();
		this._game.players[0].color = "#9ACD32";	// YellowGreen
		this._game.players[1].color = "#6A5ACD";	// SlateBlue

		this._confettiController = { };

		this._isSettingsOverlayVisible = true;

		// Binding our callbacks...
		this.handleClick = this.handleClick.bind(this);
		this.start = this.start.bind(this);
		this.reset = this.reset.bind(this);
	}

	start({ players, indexFirstPlayer })
	{
		const game = this._game;

		for (let i = 0; i < players.length; i++)
		{
			const newPlayer = players[i];
			const realPlayer = game.players[i];

			realPlayer.name = newPlayer.name;
			realPlayer.symbol = newPlayer.symbol;
			realPlayer.color = newPlayer.color;
		}

		game._currentPlayerIndex = indexFirstPlayer; // I know, I know.

		this._isSettingsOverlayVisible = false;
		this.reset();
	}

	reset()
	{
		this.stopConfetti();
		this._game.reset();
		this.setState({});
	}

	startConfetti()
	{
		this._confettiController.current.start();
	}

	stopConfetti()
	{
		this._confettiController.current.stop();
	}

	handleClick(index)
	{
		// 1. Computes this app's new state.
		const prevStatus = this._game.status;
		try
		{
			this._game.playerMove(index);
		}
		catch (error)
		{
			console.log(error.message);
			return;
		}

		// 2. Compares statuses.
		if (prevStatus !== this._game.status)
			if (this._game.status === "win")
				this.startConfetti();
			else
				this.stopConfetti();

		// 3.
		this.setState({});
	}

	render()
	{
		return (

		<div className="App" >
			<Game game={this._game} onClick={this.handleClick} />
			<Confetti controller={this._confettiController} count={250} />
			<EndGameOverlay game={this._game} onPlayAgain={this.reset} />
			<SettingsOverlay game={this._game} isVisible={this._isSettingsOverlayVisible} onStartClick={this.start} />
		</div>

		);
	}
}
/**

["Arrow, music, play, arrows, audio, sound icon"](https://www.iconfinder.com/icons/1564490/arrow_music_play_arrows_audio_sound_icon) by [Artyom Khamitov](www.iconfinder.com/Kh.Artyom) is licensed under [Creative Commons (Attribution 3.0 Unported)](http://creativecommons.org/licenses/by/3.0/).

 */