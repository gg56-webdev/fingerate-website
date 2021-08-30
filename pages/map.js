import * as React from 'react';
import { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import terminals from '../data/terminals';

// export async function getStaticProps() {}

export default function Map() {
    const [viewport, setViewport] = useState({
        width: '100%',
        height: '100vh',
        latitude: 37.5665,
        longitude: 126.978,
        zoom: 11,
    });

    const [showPopup, togglePopup] = React.useState(false);

    return (
        <ReactMapGL
            {...viewport}
            mapStyle='mapbox://styles/orv1s/ckqhefjne0oby18pjlyvqmlz2'
            mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
        >
            {terminals.map((terminal) => (
                <Marker
                    key={terminal.id}
                    longitude={terminal.long}
                    latitude={terminal.lati}
                >
                    <img width='60px' height='60px' src='/2.png' />
                </Marker>
            ))}
        </ReactMapGL>
    );
}
