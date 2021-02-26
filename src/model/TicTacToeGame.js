import Player from "./Player.js";

export default class TicTacToeGame
{
	constructor()
	{
		this._status = undefined;
		this._players = [ new Player("Player 1", "x"), new Player("Player 2", "o") ];
		this._currentPlayerIndex = 0;
		this._squares = new Int8Array(9);
		this._filledSquares = 1;

		this.reset();
	}


	get squares()
	{
		const squares = [];
		this._squares.forEach(e => squares.push( e === -1 ? null : this._players[e].symbol));

		return squares;
	}

	get players()
	{
		return this._players;
	}

	get currentPlayerIndex()
	{
		return this._currentPlayerIndex;
	}

	get currentPlayer()
	{
		return this._players[this._currentPlayerIndex];
	}

	get status()
	{
		return this._status;
	}

	get isRunning()
	{
		return this.status === "running";
	}


	_nextTurn()
	{
		this._currentPlayerIndex = this._currentPlayerIndex === 0 ? 1 : 0;
	}

	reset()
	{
		this._squares.fill(-1);
		this._filledSquares = 0;
		this._status = "running";
		this._nextTurn();
	}

	playerMove(index)
	{
		// 1. Checks for errors.
		if (!this.isRunning)
			throw new Error(`Ivalid operation. The game has finished (status: "${this.status}").`);

		if (this._squares[index] !== -1)
			throw new Error(`Invalid move. Square #${index + 1} is not empty.`);

		// 2.
		this._squares[index] = this._currentPlayerIndex;
		this._filledSquares++;

		if (5 <= this._filledSquares)
			this.updateStatus(index);

		if (this.isRunning)
			this._nextTurn();
		else if (this.status === "win")
			this.currentPlayer.win();
	}

	updateStatus(index)
	{
		if (this._filledSquares < 5)
		{
			this._status = "running";
			return;
		}

		// Row
		// const { symbol } = this.currentPlayer;
		const symbol = this._currentPlayerIndex;
		const row = Math.floor(index / 3);

		if ([0, 1, 2].every(j => this._squares[3 * row + j] === symbol))
		{
			this._status = "win";
			return;
		}

		// Column
		const column = Math.floor(index % 3);

		if ([0, 1, 2].every(j => this._squares[3 * j + column] === symbol))
		{
			this._status = "win";
			return;
		}

		// Diagonal 1
		if (row === column)
			if ([0, 1, 2].every(j => this._squares[4 * j] === symbol))
			{
				this._status = "win";
				return;
			}

		// Diagonal 2
		if (row + column === 2)
			if ([1, 2, 3].every(j => this._squares[2 * j] === symbol))
			{
				this._status = "win";
				return;
			}

		// All squares are filled.
		if (this._filledSquares === this._squares.length)
		{
			this._status = "tie";
			return;
		}
	}
}