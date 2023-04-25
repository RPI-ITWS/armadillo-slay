"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_google_places_autocomplete_1 = require("react-google-places-autocomplete");
function SearchFeatureContainer() {
    var _a = (0, react_1.useState)(""), loc = _a[0], setLoc = _a[1];
    return (<div className="pb-4">
      <div className="d-flex align-items-center">
        <react_google_places_autocomplete_1.default apiKey="AIzaSyBUWvdxMUThsLju0AFwfK2koXTgJKPY9HU" selectProps={{
            placeholder: "Search Location",
            id: "search-location-input",
        }}/>
        <button id="search-location-btn">Search</button>
      </div>
    </div>);
}
exports.default = SearchFeatureContainer;
