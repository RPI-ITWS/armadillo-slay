import React, {useEffect, useState} from "react";

export default function SearchFeatureContainer(){

  const [loc,setLoc] = useState("");
  
    return(
        <div className="pb-4">
            <div className="d-flex align-items-center">
            <input 
              id="search-location-input"
              type="text"
              placeholder="Enter a location"
              onChange={(e) => {
                setLoc(e.target.value);
              }}
            />
            <button id="search-location-btn">Search</button>
            </div>
        </div>
    )
}