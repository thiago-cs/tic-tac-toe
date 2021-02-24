export default class Player
{
	constructor(name, symbol, color = "white")
	{
		this.name = name;
		this.score = 0;
		this.color = color;
		this.symbol = symbol;
	}

	win()
	{
		this.score++;
	}
}