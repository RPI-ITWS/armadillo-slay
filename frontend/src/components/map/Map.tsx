import React, { useEffect, useRef, useState } from 'react';
import ReactMapGL, { Marker, ViewState, NavigationControl, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiY2lhbmhvd2VsbCIsImEiOiJjbGdxYmkwMDcwYnZkM3JzYm9pM2hpZDdqIn0.2CJzcHp1dfHl5tw-Nl6Lrw';

function Map({ zoom, center, children }: any) {

  const [viewport, setViewport] = useState({
    latitude: center.lat,
    longitude: center.lng,
    zoom: zoom,
    width: '100vw',
    height: '100vh',
  });

  useEffect(() => {
    setViewport(prevState => ({
      ...prevState,
      latitude: center.lat,
      longitude: center.lng,
    }))
  }, [center])

  return (
    <ReactMapGL
      {...viewport}
      mapboxAccessToken={MAPBOX_TOKEN}
      mapStyle="mapbox://styles/cianhowell/clgqbk66k00fq01p9cfeu425v"
    >
      {children}
      <NavigationControl
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
