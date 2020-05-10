import React from 'react';

function ScoringInstructions(props){
	return (
		<div className="modal-wrapper">
			<div className="modal">
				<div className="modal-content">
					<button onClick={(e) => props.hideScoringInstructionsModal(e)} className='close-modal' type='button'>Close</button>
					<header>
						<h1>
							Scoring Instructions
						</h1>
					</header>
					<section>
						<h2>
							<img alt="Factory icon" class="image-tile-icon" src="/img/tile-factory.gif" />Factory
						</h2>
						<ol>
							<li>
								<p>Figure out which city has the most factories</p>
								<p>Score 4 points per factory for this city (or cities, if tied)</p>
							</li>
							<li>
								<p>Figure out which city has the second most factories</p>
								<p>Score 4 points per factory for this city (or cities, if tied)</p>
							</li>
							<li>
								<p>
									Score 2 points per factory for all other cities
								</p>
							</li>
						</ol>
					</section>
					<section>
						<h2>
							<img alt="Office icon" class="image-tile-icon" src="/img/tile-office.gif" />Office
						</h2>
						<ol>
							<li>
								<p>
									Group offices into sets of six, regardless of location or adjacency to each other
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
									Count how many office tiles touch at least one tavern (multiple offices can touch the same tavern)
								</p>
								<p>
									Score one bonus point for each of these offices
								</p>
							</li>
						</ol>
					</section>
					<section>
						<h2>
							<img alt="House icon" class="image-tile-icon" src="/img/tile-house.gif" />House
						</h2>
						<p>a tile is worth 1 per other building type (excluding houses) in the city, but a tile next to a factory is only worth 1</p>
						<p>
						Each house tile is worth 1 point for
each other building type (excluding
houses) in the city (regardless of
location or adjacency). If there is one
other building type in the city, each
house is worth 1 point. If there are
five other building types in the city, each house is worth
5 points. All taverns count as a single building type.
If a house tile is adjacent to a factory tile, that house tile
instead scores 1 point (people don’t want to live right
next to a factory).
						</p>
					</section>
					<section>
						<h2>
							<img alt="Park icon" class="image-tile-icon" src="/img/tile-park.gif" />Park
						</h2>
						<p>
						Parks score in groups of one or
more connected parks. A single
unconnected park is worth 2 points.
Two connected parks are worth 8.
Three connected parks are worth
12. Every additional connected park
after the third increases the score by 1.
You may have more than one unconnected park group
in your city. Score each park group separately.
To be in a connected group, a park must share a
border with another park. The group does not have to
form a straight line.
						</p>
					</section>
					<section>
						<h2>
							<img alt="Shop icon" class="image-tile-icon" src="/img/tile-shop.gif" />Shop
						</h2>
						<p>a set is worth 2|5|10|16</p>
						<p>
							Shops score when connected in a straight line (row or column):
						</p>
						<ul>
							<li>2 points for one shop tile</li>
							<li>5 points for two connected shop tiles</li>
							<li>10 points for three connected shop tiles</li>
							<li>16 points for four connected shop tiles</li>
						</ul>
						<p>
							If lines of shops cross (in an L or T or + shape), each tile can only be counted for one of the sets.
						</p>
					</section>
					<section>
						<h2>
							<img alt="Tavern icon" class="image-tile-icon" src="/img/tile-tavern-drink.gif" />Tavern
						</h2>
						<p>a set is worth 1|4|9|17</p>
						<p>
							There are four different tavern types: bed, drink, food, and music. A city can contain duplicate taverns of any type.
						</p>
						<p>
							Regardless of tavern location or adjacency, a tavern set consists of different tavern types.
						</p>
						<p>
							Each set of taverns is scored separately, based on how many different types it consists of:
						</p>
						<ul>
							<li>1 point for one tavern type</li>
							<li>4 points for two different tavern types</li>
							<li>9 points for three different tavern types</li>
							<li>17 points for all four different tavern types</li>
						</ul>
					</section>
				</div>
			</div>
		</div>
	);
}

export default ScoringInstructions;
