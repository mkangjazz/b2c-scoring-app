import React from 'react';

export default function HouseInstructions () {
	return (
    <section>
      <h2>
        <img alt="House icon" className="image-tile-icon" src="/img/tile-house.gif" />House
      </h2>
      <ol>
        <li>
          Count number of houses that touch a factory
          <ul>
            <li>Score 1 point for each house that touches a factory</li>
          </ul>
        </li>
        <li>
          Count number of non-house types in the city
          <ul>
            <li>All taverns count as a single building type</li>
          </ul>
        </li>
        <li>
          Count number of houses that do not touch a factory
          <ul>
            <li>Score 1 point for each non-house types for each house that does not touch a factory</li>
          </ul>
        </li>
      </ol>
    </section>
	);
}
