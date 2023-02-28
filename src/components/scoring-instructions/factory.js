import React from 'react';

export default function FactoryInstructions () {
	return (
    <section>
      <h2><img alt="Factory icon" className="image-tile-icon" src="/img/tile-factory.gif" />Factory</h2>
      <ol>
        <li>Count number of factories in each city</li>
        <li>Figure out which city has the most factories
          <ul>
            <li>Score 4 points per factory for this city (or cities, if tied)</li>
          </ul>
        </li>
        <li>
          Figure out which city has the second most factories
          <ul>
            <li>Score 3 points per factory for this city (or cities, if tied)</li>
          </ul>
        </li>
        <li>Score 2 points per factory for all other cities</li>
      </ol>
    </section>
	);
}
