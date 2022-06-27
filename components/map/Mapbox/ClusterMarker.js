import { Marker } from 'react-map-gl';
import { Grid } from '@chakra-ui/react';

export default function ClusterMarker({ length, coordinates, point_count, supercluster, id, map }) {
  const size = getClusterSize(point_count, length);

  const expand = () => {
    const zoom = Math.min(supercluster.getClusterExpansionZoom(id), 20);
    const center = coordinates;
    map.flyTo({ center, zoom, essential: true });
  };

  return (
    <Marker longitude={coordinates[0]} latitude={coordinates[1]} style={{ zIndex: 1 }} onClick={expand}>
      <Grid
        cursor='pointer'
        opacity={0.9}
        placeItems='center'
        bg='common.main'
        borderRadius='md'
        shadow='base'
        color='white'
        fontWeight='bold'
        fontSize='sm'
        w={size}
        h={size}
      >
        {point_count}
      </Grid>
    </Marker>
  );
}

const getClusterSize = (points, length) => (points / length) * 30 + 30 + 'px';
