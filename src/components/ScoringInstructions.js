import React from 'react';
import FactoryInstructions from './scoring-instructions/factory';
import OfficeInstructions from './scoring-instructions/office';
import HouseInstructions from './scoring-instructions/house';
import ParkInstructions from './scoring-instructions/park';
import ShopInstructions from './scoring-instructions/shop';
import TavernInstructions from './scoring-instructions/tavern';

function ScoringInstructions(props){
	return (
    <article className="scoring-guide">
      <h1>Scoring Guide</h1>
      <FactoryInstructions />
      <OfficeInstructions />
      <HouseInstructions />
      <ParkInstructions />
      <ShopInstructions />
      <TavernInstructions />
    </article>
	);
}

export default ScoringInstructions;
