import React from 'react';
import './FilterAndSort.css';

interface DownloadFilesProps {
  onButtonCClicked: () => void;
  onButtonDClicked: () => void;
}

function DownloadFiles({ onButtonCClicked, onButtonDClicked }: DownloadFilesProps) {
  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const buttonName = event.currentTarget.name;
    switch (buttonName) {
      case 'buttonC':
        onButtonCClicked();
        break;

      case 'buttonD':
        onButtonDClicked();
        break;
    
      default:
        console.warn(`Unknown button name: ${buttonName}`);
    }
  }

  return (
    <div className='ButtonsDownload'>
      <button name="buttonC" className="ReactButton" onClick={handleButtonClick}>JSON File</button>
      &nbsp;
      <button name="buttonD" className="ReactButton" onClick={handleButtonClick}>CSV File</button>
    </div>
  );
}

export default DownloadFiles;