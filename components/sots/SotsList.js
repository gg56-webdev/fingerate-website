import { Grid, Box } from '@chakra-ui/react';
import SotCard from './SotCard';

export default function SotsList({ sots }) {
  if (sots?.length === 0) return <Box>No SoTs to show</Box>;
  return (
    <Grid>
      {sots.map((sot) => (
        <SotCard key={sot.id} sot={sot} />
      ))}
    </Grid>
  );
}
