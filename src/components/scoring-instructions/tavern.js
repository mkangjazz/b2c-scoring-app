import React from 'react';

export default function TavernInstructions () {
	return (
    <section>
      <h2>
        <img alt="Tavern icon" className="image-tile-icon" src="/img/tile-tavern-drink.gif" />Tavern
      </h2>
      <ol>
        <li>
          Group taverns, including only one tavern type (bed, drink, food, music) per group
        </li>
        <li>
          Score groups separately, based on how many different types it includes:
          <ul>
            <li>Score 1 point for one tavern type</li>
            <li>Score 4 points for two different tavern types</li>
            <li>Score 9 points for three different tavern types</li>
            <li>Score 17 points for all four different tavern types</li>
          </ul>
        </li>
      </ol>
    </section>
	);
}
