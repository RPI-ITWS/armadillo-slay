import React from 'react';
import './FilterAndSort.css';

interface FilterAndSortProps {
  onButtonAClicked: () => void;
  onButtonBClicked: () => void;
}

function FilterAndSort({ onButtonAClicked, onButtonBClicked }: FilterAndSortProps) {
  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const buttonName = event.currentTarget.name;
    switch (buttonName) {
      case 'buttonA':
        onButtonAClicked();
        break;

      case 'buttonB':
        onButtonBClicked();
        break;

      default:
        console.warn(`Unknown button name: ${buttonName}`);
    }
  }

  return (
    <div className='Buttons'>
      <button name="buttonA" className="ReactButton" onClick={handleButtonClick}>Filter</button>
      &nbsp;
      <button name="buttonB" className="ReactButton" onClick={handleButtonClick}>Sort</button>
    </div>
  );
}

export default FilterAndSort;
