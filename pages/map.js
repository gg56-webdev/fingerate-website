import { useState } from 'react';
import ReactMapGL, { Marker, Popup, GeolocateControl } from 'react-map-gl';
import data from '../data/newData.json';
import Image from 'next/image';

const geolocateControlStyle = {
    right: 10,
    top: 10,
};

export default function Map() {
    const [viewport, setViewport] = useState({
        width: '100%',
        height: '100vh',
        latitude: 0,
        longitude: 0,
        zoom: 1,
    });

    const [selectedMark, setSelectedMark] = useState(null);

    return (
        <ReactMapGL
            {...viewport}
            mapStyle='mapbox://styles/orv1s/ckqhefjne0oby18pjlyvqmlz2'
            mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
        >
            {data.map((terminal) => (
                <Marker
                    key={terminal.name}
                    longitude={terminal.long}
                    latitude={terminal.lati}
                    offsetLeft={-30}
                    offsetTop={-30}
                    onClick={() => {
                        setSelectedMark(terminal);
                    }}
                >
                    <Image
                        width='60px'
                        height='60px'
                        src='/sot_icon.svg'
                        alt='SoT terminal icon'
                    />
                </Marker>
            ))}
            {selectedMark && (
                <Popup
                    latitude={selectedMark.lati}
                    longitude={selectedMark.long}
                    closeButton={true}
                    closeOnClick={true}
                    onClose={() => setSelectedMark(null)}
                    anchor='top'
                    offsetTop={40}
                >
                    <div>
                        This SoT terminal is located:
                        <br />
                        {selectedMark.name}
                    </div>
                </Popup>
            )}
            <GeolocateControl
                style={geolocateControlStyle}
                fitBoundsOptions={{ maxZoom: 11 }}
                trackUserLocation={false}
                auto
            />
        </ReactMapGL>
    );
}
