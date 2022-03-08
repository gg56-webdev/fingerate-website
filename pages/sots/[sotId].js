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
  UnorderedList,
  ListItem,
  Table,
  Tbody,
  Tr,
  Td,
  Divider,
  Link,
  Tag,
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import Image from 'next/image';
import Head from 'next/head';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../context/user';
import { useRouter } from 'next/router';

import en from '../../locales/en/[sotId].json';
import ko from '../../locales/ko/[sotId].json';
import getXR from '../../lib/exchangeRate';

export default function Sot({ sot, KRWxr }) {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [iFrame, setIFrame] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [extUrl, setExtUrl] = useState('');
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();

  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : ko;

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

      if (err || error) {
        console.error(err, error);
        setErrorMsg(error);
      } else {
        setExtUrl({ url });
        console.log(`msg: ${msg}`);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (extUrl) {
      window.open(extUrl.url, '_blank');
    }
  }, [extUrl]);

  return (
    <>
      <Head>
        <title>{`SoT ${sot.id} - ${sot.name}`}</title>
      </Head>
      <Box pb='2'>
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
            <Stack spacing={4} justifyContent='space-between'>
              <Stack spacing={1}>
                <Heading
                  as={'h1'}
                  fontSize={'3xl'}
                  fontWeight='bold'
                  fontFamily='sans-serif'
                  color={'common.main'}
                >
                  {sot.name}
                </Heading>
                <Box
                  as='small'
                  fontFamily={'mono'}
                  color='blue.400'
                  fontSize={'md'}
                >
                  {`SoT ${sot.id}`}
                </Box>
              </Stack>
              <Text>
                {`${sot.grade}급 SoT, 100m²의 HideOut이 포함 위도 = ${sot.lat}, 경도 = ${sot.long}`}
              </Text>
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
                  display='block'
                  mb='2'
                >
                  Price
                </Box>
                <Flex flexDirection={'row'} sx={{ gap: '0.5rem' }}>
                  <Tag
                    textTransform='uppercase'
                    bg={'common.main'}
                    color='white'
                    size='lg'
                    fontWeight={'bold'}
                  >
                    {t.currency} {sot.price.toLocaleString()}
                  </Tag>
                  {KRWxr && (
                    <Tag
                      textTransform='uppercase'
                      bg={'common.main'}
                      color='white'
                      size='lg'
                      fontWeight={'bold'}
                    >
                      ₩ {(sot.price * KRWxr.toFixed(0)).toLocaleString()}
                    </Tag>
                  )}
                </Flex>
              </Box>

              {sot?.owner ? null : errorMsg ? (
                <Alert status='error'>
                  <AlertIcon />
                  <AlertTitle>{errorMsg}</AlertTitle>
                </Alert>
              ) : (
                <Button
                  p='8'
                  isDisabled={!user || !user.emailVerified}
                  colorScheme='purple'
                  bg='common.mainLight'
                  color={'white'}
                  fontSize='xl'
                  onClick={handleSubmit}
                  isLoading={loading}
                >
                  {user
                    ? user.emailVerified
                      ? t.btn.buy
                      : t.btn.verifyToBuy
                    : t.btn.loginToBuy}
                </Button>
              )}
            </Stack>
            <Stack gridColumn={{ md: 'span 2' }} spacing='0'>
              <Box h={isOpen ? 'auto' : 0} overflow='hidden'>
                <Divider />
                <Stack p='2' spacing={4}>
                  <Box>
                    <Text mb='1'>{t.description.para1}</Text>
                    <Text mb='1'>{t.description.grades[sot.grade]}</Text>
                    <Text mb='1'>{t.description.para2}</Text>
                    <UnorderedList mb='1'>
                      {t.description.paraList.map((item) => (
                        <ListItem key={item}>{item}</ListItem>
                      ))}
                    </UnorderedList>
                    <Text>{t.description.para3}</Text>
                  </Box>
                  <Flex pb={2} flexDirection={{ base: 'column', md: 'row' }}>
                    <Table size='sm'>
                      <Tbody>
                        <Tr>
                          <Td
                            color={'common.main'}
                            fontWeight='bold'
                            bg={'blue.50'}
                          >
                            Country
                          </Td>
                          <Td>{sot.country}</Td>
                        </Tr>
                        <Tr>
                          <Td
                            color={'common.main'}
                            fontWeight='bold'
                            bg={'blue.50'}
                          >
                            City
                          </Td>
                          <Td>{sot.city}</Td>
                        </Tr>
                        <Tr>
                          <Td
                            color={'common.main'}
                            fontWeight='bold'
                            bg={'blue.50'}
                          >
                            Latitude
                          </Td>
                          <Td>{sot.lat}</Td>
                        </Tr>
                        <Tr>
                          <Td
                            color={'common.main'}
                            fontWeight='bold'
                            bg={'blue.50'}
                          >
                            Longitude
                          </Td>
                          <Td>{sot.long}</Td>
                        </Tr>
                      </Tbody>
                    </Table>
                    <Table size='sm'>
                      <Tbody>
                        <Tr>
                          <Td
                            color={'common.main'}
                            fontWeight='bold'
                            bg={'blue.50'}
                          >
                            Location name
                          </Td>
                          <Td>{sot.name}</Td>
                        </Tr>
                        <Tr>
                          <Td
                            color={'common.main'}
                            fontWeight='bold'
                            bg={'blue.50'}
                          >
                            Grade
                          </Td>
                          <Td>{sot.grade}</Td>
                        </Tr>
                        <Tr>
                          <Td
                            color={'common.main'}
                            fontWeight='bold'
                            bg={'blue.50'}
                          >
                            Price
                          </Td>
                          <Td>
                            {t.currency} {sot.price}
                          </Td>
                        </Tr>
                        <Tr>
                          <Td
                            color={'common.main'}
                            fontWeight='bold'
                            bg={'blue.50'}
                          >
                            Owner
                          </Td>
                          <Td>
                            {sot?.owner || (
                              <Text as={'span'} fontStyle='italic'>
                                No Owner
                              </Text>
                            )}
                          </Td>
                        </Tr>
                      </Tbody>
                    </Table>
                  </Flex>
                  <Box fontStyle={'italic'} color='gray'>
                    * {t.description.disclaimer}
                    <ArrowForwardIcon mx='2' />
                    <Link href='mailto:info@gg56.world' color={'blue'}>
                      info@gg56.world
                    </Link>
                  </Box>
                </Stack>
              </Box>
              <Stack>
                <Button onClick={onToggle}>
                  {isOpen ? '닫기' : 'SoT정보 더보기'}
                </Button>
              </Stack>
            </Stack>
          </Grid>
        </Container>
      </Box>
      {/* <Modal isOpen={isOpen} onClose={onClose} size='full'>
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
      </Modal> */}
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
  const [
    snap,
    {
      KRW: { value: KRWxr },
    },
  ] = await Promise.all([getDoc(docRef), getXR()]);

  if (!snap.exists()) return { notFound: true };

  const {
    location: { _lat: lat, _long: long },
    ...data
  } = snap.data();

  const sot = { id: snap.id, lat, long, ...data };
  return {
    props: { sot, KRWxr },
    revalidate: 1000 * 60 * 30,
  };
}
