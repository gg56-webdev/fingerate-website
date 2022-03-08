import { UserContext } from '../context/user';
import { useContext, useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Heading,
  Grid,
  Stack,
  Text,
  Spinner,
  Icon,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { sendEmailVerification } from 'firebase/auth';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Head from 'next/head';

export default function User() {
  const { user, loading, error, logout } = useContext(UserContext);
  const [sots, setSots] = useState([]);
  const [noSots, setNoSots] = useState(false);
  const router = useRouter();
  const { locale } = router;
  useEffect(() => {
    if ((!loading && !user) || error) {
      router.push('/enter', '/enter', { locale });
    }
    if (!loading && user) {
      (async () => {
        try {
          const sotCol = collection(db, 'sots');
          const cq = query(sotCol, where('owner', '==', user.uid));
          const snap = await getDocs(cq);

          if (snap.empty) {
            setNoSots(true);
            return;
          }

          const sotArr = snap.docs.map((doc) => {
            const { name, country, city, grade, image } = doc.data();
            return { name, country, city, grade, image, id: doc.id };
          });
          setSots(sotArr);
        } catch (err) {
          console.error(err);
        }
      })();
    }
  }, [user, error, loading, locale, router]);

  return (
    <Box minH={'100%'}>
      <Head>
        <title>My Page</title>
      </Head>
      <Container maxW={'container.lg'} pt={'70px'}>
        <Box
          spacing={'6'}
          bg='purple.100'
          w={'fit-content'}
          mx='auto'
          p={'4'}
          borderRadius='md'
        >
          <Heading as={'h1'} textAlign='center' mb='5'>
            {loading ? 'loading' : user && user.email}{' '}
            {!loading && !user?.emailVerified && (
              <Text as='span' color='red.400'>
                (Not Verified)
              </Text>
            )}
          </Heading>
          <Stack direction='row' justifyContent={'center'} textAlign='center'>
            {!loading && !user?.emailVerified && (
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
          {!loading && !user?.emailVerified && (
            <Text
              as='small'
              fontStyle={'italic'}
              alignSelf='center'
              textAlign='center'
            >
              이메일을 확인한 뒤에 페이지를 새로 고침하세요
            </Text>
          )}
        </Box>
        <Box py='8' display={'flex'} flexDirection='column'>
          <Heading as={'h2'} mb='5' textAlign='center'>
            My SoTs
          </Heading>

          {!sots.length && !noSots ? (
            <Spinner alignSelf={'center'} />
          ) : noSots ? (
            <Box textAlign={'center'} fontSize='lg' fontWeight={'bold'}>
              You do not own any SoT
            </Box>
          ) : (
            <Grid
              bg='white'
              gap='2'
              gridTemplateColumns={'repeat(auto-fill, minmax(200px, 1fr))'}
              p='2'
              borderRadius={'md'}
            >
              {sots.map((sot) => (
                <Stack
                  key={sot.id}
                  shadow='md'
                  borderRadius={'md'}
                  bg='cyan.50'
                  p='1'
                  border='1px solid'
                  borderColor={'blue.100'}
                  onClick={() =>
                    router.push(`/sots/${sot.id}`, `/sots/${sot.id}`, {
                      locale,
                    })
                  }
                  transition='all 0.2s'
                  _hover={{
                    outline: '2px solid',
                    outlineColor: 'common.main',
                    cursor: 'pointer',
                  }}
                >
                  <Box borderRadius={'md'} overflow='hidden'>
                    <Image
                      src={sot.image}
                      alt={`Thumbnail of SoT${sot.id}`}
                      width='400'
                      height='400'
                      layout='responsive'
                    />
                  </Box>
                  <Stack spacing={1} flex='1' justifyContent='space-between'>
                    <Stack spacing={1}>
                      <Box
                        as={'strong'}
                        color='common.main'
                        fontFamily={'sans-serif'}
                        fontSize='100%'
                      >
                        {sot.name}
                      </Box>
                      <Box
                        as={'small'}
                        color='blue.400'
                        fontFamily={'mono'}
                      >{`SoT ${sot.id}`}</Box>
                    </Stack>
                    <Box as={'small'} color='blue'>
                      <Icon>
                        <path
                          fill='currentColor'
                          fillRule='evenodd'
                          d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z'
                          clipRule='evenodd'
                        />
                      </Icon>
                      {sot.country}, {sot.city}
                    </Box>
                  </Stack>
                </Stack>
              ))}
            </Grid>
          )}
        </Box>
      </Container>
    </Box>
  );
}
