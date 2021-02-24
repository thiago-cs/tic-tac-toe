import { memo } from "react";
import './Square.css';

export default memo(Render, AreEqual);

function Render(props)
{
	const { index, value, onClick } = props;
	const className = value == null ? "empty square" : "filled square";

	return (
		<button key={value} className={className} onClick={()=>onClick(index)}>
			{value}
		</button>);
}

function AreEqual(prevProps, nextProps)
{
	return prevProps.value === nextProps.value;
}

/*
R = 85
Percentage = 25
2p = 2 * π * Radius

<svg class="circle-chart" width="180" height="180" xmlns="http://www.w3.org/2000/svg">
	<circle cx=90 cy=90 r=85 stroke="#00acc1" stroke-width="10" stroke-dasharray="450,534" stroke-linecap="round" fill="none" />
</svg>

svg > circle {
	transform: rotate(-90deg);
	transform-origin: center;
}
*/

/**

<div class="grid">
  <section>
    <h2>Positive chart value</h2>
    <svg class="circle-chart" viewbox="0 0 33.83098862 33.83098862" width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <circle class="circle-chart__background" stroke="#efefef" stroke-width="2" fill="none" cx="16.91549431" cy="16.91549431" r="15.91549431" />
      <circle class="circle-chart__circle" stroke="#00acc1" stroke-width="2" stroke-dasharray="30,100" stroke-linecap="round" fill="none" cx="16.91549431" cy="16.91549431" r="15.91549431" />
    </svg>
  </section>

  <section>
    <h2>Negative chart value</h2>
    <svg class="circle-chart" viewbox="0 0 33.83098862 33.83098862" width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <circle class="circle-chart__background" stroke="#efefef" stroke-width="2" fill="none" cx="16.91549431" cy="16.91549431" r="15.91549431" />
      <circle class="circle-chart__circle circle-chart__circle--negative" stroke="#00acc1" stroke-width="2" stroke-dasharray="10,100" stroke-linecap="round" fill="none" cx="16.91549431" cy="16.91549431" r="15.91549431" />
    </svg>
  </section>
</div>

 */