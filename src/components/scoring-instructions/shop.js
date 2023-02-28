import React from 'react';

export default function ShopInstructions () {
	return (
    <section>
      <h2>
        <img alt="Shop icon" className="image-tile-icon" src="/img/tile-shop.gif" />Shop
      </h2>
      <ol>
        <li>
          Count shops that do not touch another shop
          <ul>
            <li>Score 2 points for each of these shops</li>
          </ul>
        </li>
        <li>
          Group shops that touch in a straight line (row or column)
          <ul>
            <li>Shops may not be counted in more than one group, for example in an L/T/+ shape</li>
          </ul>
        </li>
        <li>
          <p>Score each group separately:</p>
          <ul>
            <li>Score 5 points for two connected shops</li>
            <li>Score 10 points for three connected shops</li>
            <li>Score 16 points for four connected shops</li>
          </ul>
        </li>
      </ol>
    </section>
	);
}
