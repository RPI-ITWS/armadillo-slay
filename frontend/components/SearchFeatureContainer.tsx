import React, {useEffect, useState} from "react";

export default function SearchFeatureContainer(){

  const [loc,setLoc] = useState("");
  
    return(
        <div>
            <div className="d-flex justify-content-between">
            <input 
              id="search-location-input"
              type="text"
              placeholder="Enter a location"
              onChange={(e) => {
                setLoc(e.target.value);
              }}
            />
            <select id="select-location-input">
              <option value="raw-data" selected>Raw Data</option>
              <option value="visualizations">Visualizations</option>
            </select>
            </div>
            <div className="d-flex justify-content-end">
            <button id="search-location-btn">Search</button>
            </div>
        </div>
    )
}