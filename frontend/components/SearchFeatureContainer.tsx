import React, { useEffect, useState } from "react";

import GooglePlacesAutocomplete from "react-google-places-autocomplete";

export default function SearchFeatureContainer() {
  const [loc, setLoc] = useState("");

  return (
    <div className="pb-4">
      <div className="d-flex align-items-center">
        <GooglePlacesAutocomplete
          apiKey="AIzaSyBUWvdxMUThsLju0AFwfK2koXTgJKPY9HU"
          selectProps={{
            placeholder: "Search Location",
            id: "search-location-input",
          }}
        />
        <button id="search-location-btn">Search</button>
      </div>
    </div>
  );
}
