import { Box, Container, Grid, ListItem, Spinner, Link, List, Stack, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { useContext, useEffect } from 'react';
import { UserContext } from '../../context/user';

export default function DashboardLayout({ children }) {
  const { user, loading, error } = useContext(UserContext);
  const router = useRouter();
  const { locale } = router;

  useEffect(() => {
    if ((!loading && !user) || error) {
      router.push('/enter', '/enter', { locale });
    }
  }, [user, loading, error]);

  return (
    <Container maxW='1400px' pt='80px' mb='8'>
      <Stack>
        {loading ? <Spinner size='lg' color='purple' alignSelf='center' /> : <UserSection />}
        <Box p='2' bg='white' borderRadius='md' shadow='md'>
          {children}
        </Box>
      </Stack>
    </Container>
  );
}

function UserSection() {
  const { user, logout } = useContext(UserContext);

  return (
    <Box>
      <Grid gridAutoFlow='column' justifyContent='center' gap='2' fontWeight='bold' color='white'>
        <Box bgGradient='linear(to-br, #DA22FF, #9733EE)' borderRadius='md' py='2' px='6' shadow='md'>
          {user?.email}
        </Box>
        <Grid gridTemplateRows='1fr 1fr' gap='2'></Grid>
      </Grid>
      <Button onClick={logout} variant='ghost'>
        Log out
      </Button>
    </Box>
  );
}
