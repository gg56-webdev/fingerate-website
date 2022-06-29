import { Grid } from '@chakra-ui/react';
import { useMap } from 'react-map-gl';
import SotCard from './SotCard';

export default function SotList({ filteredSots, ...rest }) {
  const { map } = useMap();

  if (!filteredSots.length)
    return (
      <Grid borderRadius='md' bg='pink.50' h='full' textAlign='center' color='pink.900' placeItems='center'>
        No SoTs to show, try to change filters...
      </Grid>
    );
  return (
    <Grid
      borderRadius='md'
      as='ul'
      overflowY='auto'
      gap='1.5'
      gridTemplateColumns={{ base: '1fr 1fr', md: 'repeat(3, 1fr)' }}
    >
      {filteredSots.map((sot) => (
        <SotCard key={sot.id} sot={sot} map={map} {...rest} />
      ))}
    </Grid>
  );
}
