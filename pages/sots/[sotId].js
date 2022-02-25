import { db } from '../../lib/firebase';
import { collection, getDoc, doc, getDocs } from 'firebase/firestore';
import {
  Box,
  Container,
  Grid,
  Flex,
  Heading,
  Stack,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Alert,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react';
import Image from 'next/image';
import Head from 'next/head';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../context/user';

export default function Sot({ sot }) {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [iFrame, setIFrame] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [extUrl, setExtUrl] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/placeOrder', {
        method: 'POST',
        body: JSON.stringify({
          userId: user.uid,
          userEmail: user.email,
          sotId: sot.id,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { msg, url, error, err } = await res.json();
      if (!error) {
        setExtUrl(url);
      } else {
        setErrorMsg(error);
      }
      if (err) console.error(err);
      console.log(`msg: ${msg}`);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (extUrl) {
      window.open(extUrl, '_blank');
    }
  }, [extUrl]);

  return (
    <>
      <Head>
        <title>{`SoT ${sot.id} - ${sot.name}`}</title>
      </Head>
      <Box>
        <Container maxW={'container.lg'} pt={'70px'}>
          <Grid
            gridTemplateColumns={{
              md: 'minmax(200px, 400px) 1fr',
              base: '1fr',
            }}
            gap='4'
            bg='white'
            p={2}
            borderRadius='md'
          >
            <Box overflow={'hidden'} borderRadius='md' fontSize={0}>
              <Image
                src={sot.image}
                alt={`thumbnail of SoT${sot.id}`}
                width={800}
                height={800}
              />
            </Box>
            <Stack spacing={4}>
              <Box>
                <Heading as={'h1'} mb='4' fontSize={'2xl'}>
                  {`SoT ${sot.id}`}
                  <br />
                  {sot.name}
                </Heading>
                <Text>
                  {`${sot.grade} grade SoT with 100m² HideOut space, located at Latitude = ${sot.lat}, Longitude = ${sot.long}`}
                </Text>
              </Box>
              <Flex sx={{ gap: '0.5rem' }} flexWrap='wrap'>
                <Box
                  flex={'1'}
                  borderRadius={'md'}
                  bg='purple.50'
                  p='2'
                  gap='1'
                  textAlign={'center'}
                >
                  <Text
                    as={'small'}
                    textTransform='uppercase'
                    color={'common.main'}
                  >
                    country
                  </Text>
                  <br />
                  {sot.country}
                </Box>
                <Box
                  flex={'1'}
                  borderRadius={'md'}
                  bg='purple.50'
                  p='2'
                  gap='1'
                  textAlign={'center'}
                >
                  <Text
                    as={'small'}
                    textTransform='uppercase'
                    color={'common.main'}
                  >
                    city
                  </Text>
                  <br />
                  {sot.city}
                </Box>
                <Box
                  flex={'1'}
                  borderRadius={'md'}
                  bg='purple.50'
                  p='2'
                  gap='1'
                  textAlign={'center'}
                >
                  <Text
                    as={'small'}
                    textTransform='uppercase'
                    color={'common.main'}
                  >
                    grade
                  </Text>
                  <br />
                  {sot.grade}
                </Box>
              </Flex>
              <Box
                p='2'
                border={'2px solid'}
                borderColor={'common.main'}
                borderRadius='md'
              >
                <Box
                  as={'small'}
                  textTransform='uppercase'
                  color={'common.main'}
                >
                  Price{' '}
                </Box>
                <Box
                  as={'strong'}
                  textTransform='uppercase'
                  color={'common.main'}
                  display='block'
                >
                  $ {sot.price}
                </Box>
              </Box>

              {errorMsg ? (
                <Alert status='error'>
                  <AlertIcon />
                  <AlertTitle>{errorMsg}</AlertTitle>
                </Alert>
              ) : (
                <Button
                  p='8'
                  isDisabled={!user || !user.emailVerified}
                  colorScheme='purple'
                  color={'white'}
                  fontSize='xl'
                  onClick={handleSubmit}
                  isLoading={loading}
                >
                  {user
                    ? user.emailVerified
                      ? 'Buy SoT'
                      : 'Verify your Email to Buy SoT'
                    : 'Login to Buy SoT'}
                </Button>
              )}
            </Stack>
          </Grid>
        </Container>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} size='full'>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Box
              as={'iframe'}
              minH='90vh'
              src={iFrame}
              width='100%'
              height='100%'
              frameBorder='0'
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export async function getStaticPaths() {
  const colRef = collection(db, 'sots');
  const snap = await getDocs(colRef);

  const paths = snap.docs.map((doc) => {
    const sotId = doc.id;
    return { params: { sotId } };
  });

  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params: { sotId } }) {
  const docRef = doc(db, 'sots', sotId);
  const snap = await getDoc(docRef);

  if (!snap.exists()) return { notFound: true };

  const {
    location: { _lat: lat, _long: long },
    ...data
  } = snap.data();

  const sot = { id: snap.id, lat, long, ...data };

  return {
    props: { sot },
    revalidate: 10000,
  };
}
