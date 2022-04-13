import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Grid, Box } from '@chakra-ui/react';

export default function NotFound() {
  const router = useRouter();
  useEffect(() => {
    let timer = setTimeout(() => {
      router.push('/');
    }, 5000);
    return () => clearTimeout(timer);
  }, [router]);
  return (
    <Grid placeItems={'center'} py={'80px'}>
      <Box onClick={() => router.push('/')}>Page not found :(</Box>
    </Grid>
  );
}
