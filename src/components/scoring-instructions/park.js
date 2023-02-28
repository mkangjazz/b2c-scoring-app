import React from 'react';

export default function ParkInstructions () {
	return (
    <section>
      <h2>
        <img alt="Park icon" className="image-tile-icon" src="/img/tile-park.gif" />Park
      </h2>
      <ol>
        <li>
          Count parks that do not touch other parks
          <ul>
            <li>Score 2 points for each of these parks</li>
          </ul>
        </li>
        <li>
          Group parks that touch another park, they do not need to form a straight line
          <ul>
            <li>Score each group separately</li>
            <li>
              <p>Score 8 points for two connected parks</p>
            </li>
            <li>
              <p>
                Score 12 points for three connected parks
              </p>
            </li>
            <li>
              <p>
                Score 1 additional point for each connected park after the third
              </p>
            </li>
          </ul>
        </li>
      </ol>
    </section>
	);
}
