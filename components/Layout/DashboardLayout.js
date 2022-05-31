import { Box, Container, Grid, ListItem, Spinner, Link, List, Stack, Button, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { UserContext } from '../../context/user';

import ko from '../../locales/ko/user.json';

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
    <Container maxW='1400px' pt='80px' pb='8' px='2'>
      <Stack>
        {loading ? (
          <Spinner size='lg' color='purple' alignSelf='center' />
        ) : (
          <>
            <UserSection />
            <Box p='2' bg='white' borderRadius='md' shadow='md'>
              {children}
            </Box>
          </>
        )}
      </Stack>
    </Container>
  );
}

function UserSection() {
  const { user, logout } = useContext(UserContext);

  return (
    <Flex justify='center' sx={{ gap: 2 }} fontFamily='sans-serif'>
      <Stack
        bgGradient={!user?.emailVerified ? 'linear(to-br, red.400, red.200)' : 'linear(to-br, #DA22FF, #9733EE)'}
        borderRadius='md'
        p='4'
        shadow='inner'
        textAlign='center'
      >
        <Box as='strong' color='white' fontSize='xl'>
          {user?.email}
        </Box>
        <Flex justify='center' sx={{ gap: 2 }}>
          {!user?.emailVerified && <Button colorScheme='pink'>{ko.sendEmail}</Button>}
          <Button onClick={logout} color='white' variant='outline' colorScheme='blackAlpha'>
            {ko.logout}
          </Button>
        </Flex>
        {!user?.emailVerified && (
          <Box as='small' bg='white' px='2' py='1' borderRadius='md' _before={{ content: '"* "' }}>
            {ko.reload}
          </Box>
        )}
      </Stack>
      <Grid gridTemplateRows='1fr 1fr' gap='2'></Grid>
    </Flex>
  );
}
