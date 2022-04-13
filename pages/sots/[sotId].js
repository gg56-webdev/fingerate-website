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
  useDisclosure,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  UnorderedList,
  ListItem,
  Table,
  Tbody,
  Tr,
  Td,
  Divider,
  Link,
  Tag,
  Spinner,
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import Image from 'next/image';
import Head from 'next/head';
import { default as NLink } from 'next/link';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../context/user';
import { useRouter } from 'next/router';

import en from '../../locales/en/[sotId].json';
import ko from '../../locales/ko/[sotId].json';

export default function Sot({ sot }) {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [extUrl, setExtUrl] = useState('');
  const { isOpen, onToggle } = useDisclosure();
  const [KRWrate, setKRWrate] = useState('');
  const [isMobile, setIsMobile] = useState(false);

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
          sotId: sot.id,
          isMobile,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { msg, url, error } = await res.json();

      if (error) {
        console.error(error);
        const { title, body } = error;
        setErrorMsg({ title, body });
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
      // window.open(extUrl.url, '_blank', 'popup') ||
      window.location.assign(extUrl.url);
    }
  }, [extUrl]);

  async function getXR() {
    const xrRef = doc(db, 'XR', '15min');
    const xrSnap = await getDoc(xrRef);
    const {
      rates: {
        KRW: { value: KRWxr },
      },
    } = xrSnap.data();
    setKRWrate(KRWxr);
  }

  useEffect(() => {
    if (!sot?.owner) getXR();
  }, [sot]);

  useEffect(() => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.platform)
    ) {
      setIsMobile(true);
    }
  }, []);
  return (
    <>
      <Head>
        <title>{`SoT ${sot.id} - ${sot.name}`}</title>
      </Head>
      <Box pb='2'>
        <Container maxW={'container.lg'} pt={'80px'}>
          <Grid
            gridTemplateColumns={{
              md: 'minmax(200px, 400px) 1fr',
              base: '1fr',
            }}
            gap='4'
            bg='white'
            p={2}
            borderRadius='md'
            shadow='md'
          >
            <Box overflow={'hidden'} borderRadius='md' fontSize={0}>
              <Image src={sot.image} alt={`thumbnail of SoT${sot.id}`} width={800} height={800} />
            </Box>
            <Stack spacing={4} justifyContent='space-between'>
              <Stack spacing={1}>
                <Heading as={'h1'} fontSize={'3xl'} fontWeight='bold' fontFamily='sans-serif' color={'common.main'}>
                  {sot.name}
                </Heading>
                <Box as='small' fontFamily={'mono'} color='blue.400' fontSize={'md'}>
                  {`SoT ${sot.id}`}
                </Box>
              </Stack>
              <Text>{`${sot.grade}급 SoT, 100m²의 HideOut이 포함 위도 = ${sot.lat}, 경도 = ${sot.long}`}</Text>
              <Flex sx={{ gap: '0.5rem' }} flexWrap='wrap'>
                <Box flex={'1'} borderRadius={'md'} bg='purple.50' p='2' gap='1' textAlign={'center'}>
                  <Text as={'small'} fontSize='lg' textTransform='uppercase' color={'common.main'}>
                    {t.stats.country}
                  </Text>
                  <br />
                  {sot.country}
                </Box>
                <Box flex={'1'} borderRadius={'md'} bg='purple.50' p='2' gap='1' textAlign={'center'}>
                  <Text as={'small'} fontSize='lg' textTransform='uppercase' color={'common.main'}>
                    {t.stats.city}
                  </Text>
                  <br />
                  {sot.city}
                </Box>
                <Box flex={'1'} borderRadius={'md'} bg='purple.50' p='2' gap='1' textAlign={'center'}>
                  <Text as={'small'} fontSize='lg' textTransform='uppercase' color={'common.main'}>
                    {t.stats.grade}
                  </Text>
                  <br />
                  {sot.grade}
                </Box>
              </Flex>
              <Box p='2' border={'2px solid'} borderColor={'common.main'} borderRadius='md'>
                <Box as={'small'} textTransform='uppercase' color={'common.main'} display='block' mb='2' fontSize='xl'>
                  {t.stats.price}
                </Box>
                <Flex flexDirection={'row'} sx={{ gap: '0.5rem' }}>
                  <Tag textTransform='uppercase' bg={'common.main'} color='white' size='lg' fontWeight={'bold'}>
                    {t.currency} {sot.price.toLocaleString()}
                  </Tag>
                  {KRWrate ? (
                    <Tag textTransform='uppercase' bg={'common.main'} color='white' size='lg' fontWeight={'bold'}>
                      ₩{' '}
                      {(sot.price * KRWrate).toLocaleString(undefined, {
                        maximumFractionDigits: 0,
                      })}
                    </Tag>
                  ) : (
                    !sot?.owner && <Spinner />
                  )}
                </Flex>
              </Box>

              {sot?.owner ? null : errorMsg ? (
                <Alert status='error'>
                  <AlertIcon />
                  <AlertTitle>{errorMsg?.title}</AlertTitle>
                  <AlertDescription>{errorMsg?.body}</AlertDescription>
                </Alert>
              ) : user ? (
                user?.emailVerified ? (
                  <Button
                    p='8'
                    colorScheme='purple'
                    bg='common.mainLight'
                    color='white'
                    fontSize='xl'
                    onClick={handleSubmit}
                    isLoading={loading}
                  >
                    {t.btn.buy}
                  </Button>
                ) : (
                  <NLink href={'/user'}>
                    <Button p='8' colorScheme='gray' fontSize='xl'>
                      {t.btn.verifyToBuy}
                    </Button>
                  </NLink>
                )
              ) : (
                <NLink href={'/enter'}>
                  <Button p='8' colorScheme='gray' fontSize='xl'>
                    {t.btn.loginToBuy}
                  </Button>
                </NLink>
              )}
            </Stack>
            <Stack gridColumn={{ md: 'span 2' }} spacing='0'>
              <Box h={isOpen ? 'auto' : 0} overflow='hidden'>
                <Divider />
                <Stack p='2' spacing={4}>
                  <Box bg='common.second' borderRadius={'md'} p='2' color={'common.main'} fontSize='xl'>
                    <Text whiteSpace={'pre-wrap'} fontWeight={'bold'}>
                      {t.description.nftNotice}
                    </Text>
                    <Box>
                      {t.description.contactUs}
                      <ArrowForwardIcon mx='2' />
                      <Link href='mailto:admin@fingerate.world' color={'blue'}>
                        admin@fingerate.world
                      </Link>
                    </Box>
                  </Box>
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
                          <Td color={'common.main'} fontWeight='bold' bg={'blue.50'}>
                            {t.stats.country}
                          </Td>
                          <Td>{sot.country}</Td>
                        </Tr>
                        <Tr>
                          <Td color={'common.main'} fontWeight='bold' bg={'blue.50'}>
                            {t.stats.city}
                          </Td>
                          <Td>{sot.city}</Td>
                        </Tr>
                        <Tr>
                          <Td color={'common.main'} fontWeight='bold' bg={'blue.50'}>
                            {t.stats.latitude}
                          </Td>
                          <Td>{sot.lat}</Td>
                        </Tr>
                        <Tr>
                          <Td color={'common.main'} fontWeight='bold' bg={'blue.50'}>
                            {t.stats.longitude}
                          </Td>
                          <Td>{sot.long}</Td>
                        </Tr>
                      </Tbody>
                    </Table>
                    <Table size='sm'>
                      <Tbody>
                        <Tr>
                          <Td color={'common.main'} fontWeight='bold' bg={'blue.50'}>
                            {t.stats.location}
                          </Td>
                          <Td>{sot.name}</Td>
                        </Tr>
                        <Tr>
                          <Td color={'common.main'} fontWeight='bold' bg={'blue.50'}>
                            {t.stats.grade}
                          </Td>
                          <Td>{sot.grade}</Td>
                        </Tr>
                        <Tr>
                          <Td color={'common.main'} fontWeight='bold' bg={'blue.50'}>
                            {t.stats.price}
                          </Td>
                          <Td>
                            {t.currency} {sot.price}
                          </Td>
                        </Tr>
                        <Tr>
                          <Td color={'common.main'} fontWeight='bold' bg={'blue.50'}>
                            {t.stats.owner}
                          </Td>
                          <Td>
                            {sot?.owner || (
                              <Text as={'span'} fontStyle='italic'>
                                {t.stats.noOwner}
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
                    <Link href='mailto:admin@fingerate.world' color={'blue'}>
                      admin@fingerate.world
                    </Link>
                  </Box>
                </Stack>
              </Box>
              <Stack>
                <Button onClick={onToggle}>{isOpen ? '닫기' : 'SoT정보 더보기'}</Button>
              </Stack>
            </Stack>
          </Grid>
        </Container>
      </Box>
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
  const [snap] = await Promise.all([getDoc(docRef)]);

  if (!snap.exists()) return { notFound: true };

  const {
    location: { _lat: lat, _long: long },
    ...data
  } = snap.data();

  const sot = { id: snap.id, lat, long, ...data };
  return {
    props: { sot },
    revalidate: 60 * 30,
  };
}