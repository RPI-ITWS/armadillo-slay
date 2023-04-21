import React from 'react';
// import './ButtonGroupStyle.css';

function ButtonGroup({ onButtonAClicked, onButtonBClicked}) {
  const handleButtonClick = (event) => {
    const buttonName = event.target.name;
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
      <button name="buttonA" className="ReactButton" onClick={handleButtonClick}>GET</button>
      &nbsp;
      <button name="buttonB" className="ReactButton" onClick={handleButtonClick}>POST</button>
    </div>
  );
}

export default ButtonGroup;
