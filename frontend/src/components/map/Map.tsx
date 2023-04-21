import React, { useEffect, useRef } from 'react';
import ReactMapGL, { Marker, ViewState } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiY2lhbmhvd2VsbCIsImEiOiJjbGdxYmkwMDcwYnZkM3JzYm9pM2hpZDdqIn0.2CJzcHp1dfHl5tw-Nl6Lrw';

function Map() {
  const [viewport, setViewport] = React.useState({
    latitude: 42.6737,
    longitude: -73.747253,
    zoom: 10,
    width: '100vw',
    height: '100vh',
  });

  return (
    <ReactMapGL
      {...viewport}
      mapboxAccessToken={MAPBOX_TOKEN}
      mapStyle="mapbox://styles/cianhowell/clgqbk66k00fq01p9cfeu425v"
      onResize={() => {setViewport(viewport)}}
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
    </ReactMapGL>
  );
}

export {
  Map
};