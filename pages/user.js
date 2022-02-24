import { UserContext } from '../context/user';
import { useContext } from 'react';
import {
  Box,
  Button,
  Container,
  Heading,
  Flex,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { sendEmailVerification } from 'firebase/auth';

export default function User() {
  const { user, loading, error, logout } = useContext(UserContext);
  const router = useRouter();
  const { locale } = router;
  useEffect(() => {
    if ((!loading && !user) || error) {
      router.push('/enter', '/enter', { locale });
    }
  }, [user, error, loading, locale, router]);

  return (
    <Box>
      <Container maxW={'container.lg'} pt={'70px'} textAlign='center'>
        <Stack spacing={'6'}>
          <Heading as={'h1'}>
            {loading ? 'loading' : user && user.email}{' '}
            {!user?.emailVerified && (
              <Text as='span' color='red.400'>
                (Not Verified)
              </Text>
            )}
          </Heading>
          <Stack direction='row' justifyContent={'center'}>
            {!user?.emailVerified && (
              <Button
                colorScheme={'purple'}
                onClick={() => sendEmailVerification(user)}
              >
                Send Email Verification
              </Button>
            )}
            <Button colorScheme={'gray'} onClick={logout}>
              Logout
            </Button>
          </Stack>
          <Box>
            <Heading as={'h2'}>My SoTs</Heading>
          </Box>
          <Flex></Flex>
        </Stack>
      </Container>
    </Box>
  );
}
