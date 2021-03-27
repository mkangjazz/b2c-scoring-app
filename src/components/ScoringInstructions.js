import React from 'react';

function ScoringInstructions(props){
	return (
		<div className="modal-wrapper">
			<div className="modal">
				<div className="modal-content">
					<button onClick={(e) => props.hideScoringInstructionsModal(e)} className='close-modal' type='button'>Close</button>
          <h1 className='modal-title'>
						Scoring Guide
          </h1>
          <table>
            <tbody>
              <tr className='modal-tr'>
                <td>
                  <h2>
                    <img alt="Factory icon" className="image-tile-icon" src="/img/tile-factory.gif" />Factory
                  </h2>
                </td>
                <td>
                  <ol>
                    <li>
                      <p>Count number of factories in each city</p>
                    </li>
                    <li>
                      <p>Figure out which city has the most factories</p>
                      <ul>
                        <li>Score 4 points per factory for this city (or cities, if tied)</li>
                      </ul>
                    </li>
                    <li>
                      <p>Figure out which city has the second most factories</p>
                      <ul>
                        <li>Score 3 points per factory for this city (or cities, if tied)</li>
                      </ul>
                    </li>
                    <li>
                      <p>
                        Score 2 points per factory for all other cities
                      </p>
                    </li>
                  </ol>
                </td>
              </tr>
              <tr className='modal-tr'>
                <td>
                  <h2>
                    <img alt="Office icon" className="image-tile-icon" src="/img/tile-office.gif" />Office
                  </h2>
                </td>
                <td>
                  <ol>
                    <li>
                      <p>
                        Group offices into sets of six, regardless of location or adjacency
                      </p>
                    </li>
                    <li>
                      <p>
                        Score each set separately based on its number of offices:
                      </p>
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
                      <p>
                        Count number of office tiles that touch at least one tavern (multiple offices can touch the same tavern)
                      </p>
                      <ul>
                        <li>Score one bonus point for each of these offices</li>
                      </ul>
                    </li>
                  </ol>
                </td>
              </tr>
              <tr className='modal-tr'>
                <td>
                  <h2>
                    <img alt="House icon" className="image-tile-icon" src="/img/tile-house.gif" />House
                  </h2>
                </td>
                <td>
                  <ol>
                    <li>
                      <p>
                        Count number of houses that touch a factory
                      </p>
                      <ul>
                        <li>Score 1 point for each house that touches a factory</li>
                      </ul>
                    </li>
                    <li>
                      <p>Count number of non-house types in the city</p>
                      <ul>
                        <li>All taverns count as a single building type.</li>
                      </ul>
                    </li>
                    <li>
                      <p>Count number of houses that do not touch a factory</p>
                      <ul>
                        <li>Score 1 point for each non-house types for each house that does not touch a factory</li>
                      </ul>
                    </li>
                  </ol>
                </td>
              </tr>
              <tr className='modal-tr'>
                <td>
                  <h2>
                    <img alt="Park icon" className="image-tile-icon" src="/img/tile-park.gif" />Park
                  </h2>
                </td>
                <td>
                  <ol>
                    <li>
                      <p>Count parks that do not touch other parks</p>
                      <ul>
                        <li>Score 2 points for each of these parks</li>
                      </ul>
                    </li>
                    <li>
                      <p>
                        Group parks that touch another park, they do not need to form a straight line. Score each group separately.
                      </p>
                      <ul>
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
                </td>
              </tr>
              <tr className='modal-tr'>
                <td>
                  <h2>
                    <img alt="Shop icon" className="image-tile-icon" src="/img/tile-shop.gif" />Shop
                  </h2>
                </td>
                <td>
                  <ol>
                    <li>
                      <p>Count shops that do not touch another shop</p>
                      <p>Score 2 points for each of these shops</p>
                    </li>
                    <li>
                      <p>Group shops that touch in a straight line (row or column)</p>
                      <p>Shops may not be counted in more than one group, for example in an L/T/+ shape</p>
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
                </td>
              </tr>
              <tr className='modal-tr'>
                <td>
                  <h2>
                    <img alt="Tavern icon" className="image-tile-icon" src="/img/tile-tavern-drink.gif" />Tavern
                  </h2>
                </td>
                <td>
                  <ol>
                    <li>
                      <p>Group taverns, including only one tavern type (bed, drink, food, music) per group</p>
                    </li>
                    <li>
                      <p>Score groups separately, based on how many different types it includes:</p>
                      <ul>
                        <li>Score 1 point for one tavern type</li>
                        <li>Score 4 points for two different tavern types</li>
                        <li>Score 9 points for three different tavern types</li>
                        <li>Score 17 points for all four different tavern types</li>
                      </ul>
                    </li>
                  </ol>
                </td>
              </tr>
            </tbody>
          </table>
				</div>
			</div>
		</div>
	);
}

export default ScoringInstructions;
