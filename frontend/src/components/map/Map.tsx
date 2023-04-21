import React, { useEffect, useRef } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiY2lhbmhvd2VsbCIsImEiOiJjbGdxYmkwMDcwYnZkM3JzYm9pM2hpZDdqIn0.2CJzcHp1dfHl5tw-Nl6Lrw';

function Map() {
  const [viewport, setViewport] = React.useState({
    latitude: 51.3233379650232,
    longitude: -0.481747846041145,
    zoom: 14,
    width: '100vw',
    height: '100vh',
  });

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={MAPBOX_TOKEN}
      mapStyle="mapbox://styles/cianhowell/clgqbk66k00fq01p9cfeu425v"
      onViewportChange={(viewport) => setViewport(viewport)}
    >
      <Marker latitude={51.3233379650232} longitude={-0.481747846041145}>
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