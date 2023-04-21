import React, { useEffect, useRef, useState } from 'react';
import ReactMapGL, { Marker, ViewState, NavigationControl, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiY2lhbmhvd2VsbCIsImEiOiJjbGdxYmkwMDcwYnZkM3JzYm9pM2hpZDdqIn0.2CJzcHp1dfHl5tw-Nl6Lrw';

function Map() {

  const [viewport, setViewport] = useState({
    latitude: 42.6737,
    longitude: -73.747253,
    zoom: 9,
    width: '100vw',
    height: '100vh',
  });

  const [popupVisible, setPopupVisible] = useState(true);

  const handleMarkerClick = () => {
    setPopupVisible(true);
  };

  const handlePopupClose = () => {
    setPopupVisible(false);
  };

  return (
    <ReactMapGL
      {...viewport}
      mapboxAccessToken={MAPBOX_TOKEN}
      mapStyle="mapbox://styles/cianhowell/clgqbk66k00fq01p9cfeu425v"
      onViewportChange={(viewport: ViewState) => setViewport(viewport)}
    >
      <Marker latitude={42.6737} longitude={-73.747253}>
        <div>
          <img
            src="https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png"
            alt="marker"
            style={{
              height: '20px',
              width: '20px',
            }}
          />
        </div>
      </Marker>
      {popupVisible && (
        <Popup
          latitude={42.6737}
          longitude={-73.747253}
          closeButton={true}
          closeOnClick={false}
          onClose={handlePopupClose}
          anchor="top"
        >
          <div>Household Income: $68,991
            <br />
            Renewable Energy Ranking:
            <br />
            1. Solar
            <br />
            2. Wind
            <br />
            3. Hydroelectric
            <br />
          </div>
        </Popup>
      )}
      <NavigationControl
        onViewportChange={(viewport: ViewState) => setViewport(viewport)}
        showCompass={false}
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
        }}
      />
    </ReactMapGL>

  );
}

export {
  Map
};