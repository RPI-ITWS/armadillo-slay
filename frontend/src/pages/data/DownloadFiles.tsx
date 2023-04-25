import React from 'react';
import './buttons.css';

interface DownloadFilesProps {
  onButtonJSONClicked: () => void;
  onButtonCSVClicked: () => void;
}

function DownloadFiles({ onButtonJSONClicked, onButtonCSVClicked }: DownloadFilesProps) {
  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const buttonName = event.currentTarget.name;
    switch (buttonName) {
      case 'JSON_FileDownload':
        onButtonJSONClicked();
        break;

      case 'CSV_FileDownload':
        onButtonCSVClicked();
        break;
    
      default:
        console.warn(`Unknown button name: ${buttonName}`);
    }
  }

  return (
    <div className='ButtonsDownload'>
      <button name="JSON_FileDownload" className="ReactButton" onClick={handleButtonClick}>JSON File</button>
      &nbsp;
      <button name="CSV_FileDownload" className="ReactButton" onClick={handleButtonClick}>CSV File</button>
    </div>
  );
}

export default DownloadFiles;