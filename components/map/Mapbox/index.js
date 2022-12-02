import Map, { useMap, GeolocateControl } from 'react-map-gl';
import { useState, useMemo } from 'react';
import useSupercluster from 'use-supercluster';
import ClusterMarker from './ClusterMarker';
import SotMarker from './SotMarker';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_CONFIG = Object.freeze({
  mapStyle: 'mapbox://styles/orv1s/ckvrp1ezz019v15mv2crcoxla?optimize=true',
  mapboxAccessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
  reuseMaps: true,
  maxZoom: 18,
  style: { width: '100%', height: '100%' },
  doubleClickZoom: false,
  dragRotate: false,
  // onMouseDown: (e) => e.originalEvent.button === 2,
  id: 'map',
});

const GEO_CONFIG = Object.freeze({
  position: 'bottom-right',
  fitBoundsOptions: { maxZoom: 13 },
});

const initialViewState = { longitude: 0, latitude: 0, zoom: 1 };

export default function Mapbox({ filteredSots, t }) {
  const [viewState, setViewState] = useState(initialViewState);
  const { map } = useMap();

  const points = useMemo(
    () =>
      filteredSots.map((sot) => ({
        type: 'Feature',
        properties: { cluster: false, ...sot },
        geometry: { type: 'Point', coordinates: [sot._long, sot._lat] },
      })),
    [filteredSots]
  );

  const bounds = map ? map.getMap().getBounds().toArray().flat() : null;

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom: viewState.zoom,
    options: { radius: 100 },
  });
  return (
    <Map {...MAPBOX_CONFIG} {...viewState} onMove={({ viewState }) => setViewState(viewState)}>
      {clusters.map(({ geometry: { coordinates }, id, properties }) => {
        if (properties.cluster)
          return (
            <ClusterMarker
              key={`cluster-${id}`}
              point_count={properties.point_count}
              coordinates={coordinates}
              length={points.length}
              supercluster={supercluster}
              id={id}
              map={map}
            />
          );

        return <SotMarker key={`sot-${properties.id}`} {...properties} coordinates={coordinates} map={map} t={t} />;
      })}
      <GeolocateControl {...GEO_CONFIG} />
    </Map>
  );
}
