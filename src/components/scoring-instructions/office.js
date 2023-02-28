import React from 'react';

export default function OfficeInstructions () {
	return (
    <section>
      <h2>
        <img alt="Office icon" className="image-tile-icon" src="/img/tile-office.gif" />Office
      </h2>
      <ol>
        <li>Group offices into sets of six, regardless of location or adjacency</li>
        <li>
          Score each set separately based on its number of offices:
          <ul>
            <li>Score 1 point for one</li>
            <li>Score 3 points for two </li>
            <li>Score 6 points for three</li>
            <li>Score 10 points for four</li>
            <li>Score 15 points for five</li>
            <li>Score 21 points for six</li>
          </ul>
        </li>
        <li>
          Count number of office tiles that touch at least one tavern (multiple offices can touch the same tavern)
          <ul>
            <li>Score one bonus point for each of these offices</li>
          </ul>
        </li>
      </ol>
    </section>
	);
}
