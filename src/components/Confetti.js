import React, { Component } from 'react';
import './Confetti.css';

export default class ConfettiComponent extends Component
{
	constructor(props)
	{
		super(props);

		// "private" properties.
		this._canvasRef = React.createRef();
		this._count = props.count || 250;
		this._stopped = true;
		this._stopRequested = false;
		this._colors = [ "85,71,156", "174,61,99", "219,56,83", "255,100,70", "255,192,60" ];

		// JS stuff.
		this.start = this.start.bind(this);
		this.stop  = this.stop.bind(this);
		this._step = this._step.bind(this);
		this.onWindowResized = this.onWindowResized.bind(this);

		// Exports a ref to this object.
		// todo: Does React support/provide a better way to achieve this?
		if (props.controller)
			props.controller.current = { start: this.start, stop: this.stop };

		window.requestAnimationFrame = (
			window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function (callback) { setTimeout(callback, 1000 / 60 ); }
		);
	}

	get randomColor()
	{
		return this._colors[~~randomBetween(0, this._colors.length)]
	}

	componentDidMount()
	{
		this._canvas = this._canvasRef.current;
		this._context = this._canvas.getContext("2d");
		
    	window.addEventListener('resize', this.onWindowResized, false);
		this.onWindowResized();
		// setTimeout(this.onWindowResized, 0);
	}

	render()
	{
		return "whatever is down below ↓",

		<canvas ref={this._canvasRef} className="Confetti" style={this.props.style} />
	}

	start()
	{
		if (!this._stopped)
			return;

		// Creates individual elements.
		this._confettiElements = [];

		for (let i = 0; i < this._count; i++)
			this._confettiElements.push(new FallingConfetti(this._canvas.width, this._canvas.height, this.randomColor));

		this._stopped = false;
		this._stopRequested = false;

		this._step();
	}

	stop()
	{
		this._stopRequested = true;
	}

	_step()
	{
		// Honors the command to stop.
		if (this._stopped)
		{
			this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
			return;
		}

		// Clears the canvas.
		requestAnimationFrame(this._step);
		this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);

		// Redraws every confetti.
		let anyRedraw = false;
		for (let i = 0; i < this._confettiElements.length; i++)
			if (this._confettiElements[i].draw(this._context, this._canvas.width, this._canvas.height, this._stopRequested))
				anyRedraw = true;

		// If none was redraw...
		if (!anyRedraw)
			this._stopped = true;
	}

	onWindowResized()
	{
		const parent = this._canvas.parentNode;

		if (parent === null)
			return;

		this._canvas.width = parent.clientWidth;
		this._canvas.height = parent.clientHeight;
	}
}


class FallingConfetti
{
	constructor(w, h, color)
	{
		this.rgb = "rgba(" + color;
		this.skipFrames = ~~randomBetween(0, 30);
		this.r = ~~randomBetween(2, 6);
		this.r2 = 2 * this.r;
		this.$0_7r = 0.7 * this.r;

		this._replace(w, h);
	}

	draw(context, w, h, stop)
	{
		//
		if (0 < this.skipFrames)
		{
			this.skipFrames--;
			return true;
		}

		//
		this.x += this.vx;
		this.y += this.vy;

		//
		if (stop)
		{
			if (0 < this.Δop)
				this.Δop *= -1;

			this.opacity += 3 * this.Δop;
		}
		else
			this.opacity += this.Δop;

		if (this.opacity < 0 || this.ymax < this.y)
		{
			if (stop)
				return false;

			this._replace(w, h);
		}
		else if (1 < this.opacity)
		{
			this.opacity = 1;
			this.Δop *= -1;
		}

		//
		if (this.x <= 0 || this.xmax <= this.x)
			this.x = (this.x + this.xmax) % this.xmax;

		// Draws a circle.
		context.beginPath();
		context.arc(~~this.x, ~~this.y, this.r, 0, 2 * Math.PI, false);
		context.fillStyle = `${this.rgb},${this.opacity})`;
		context.fill();

		return true;
	}

	_replace(w, h)
	{
		this.opacity = 0;
		this.Δop = 0.01 * randomBetween(1, 4);
		this.x = randomBetween(-this.r2, w - this.r2);
		this.y = randomBetween(-this.r2, h - this.r2);
		this.xmax = w - this.r;
		this.ymax = h - this.r;
		// this.vx = randomBetween(-5, -3) + 8 * xpos;
		this.vx = randomBetween(-1, 1);
		this.vy = 0.5 * (this.r * 0.7 + randomBetween(-1, 1));
	}
}


function randomBetween(min, max)
{
	return min + (max - min) * Math.random();
}