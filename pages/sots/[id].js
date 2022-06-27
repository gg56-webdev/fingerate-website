import { db } from '../../lib/firebase';
import { collection, getDoc, doc, getDocs } from 'firebase/firestore';
import {
  Box,
  Container,
  Grid,
  Skeleton,
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
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import Image from 'next/image';
import Head from 'next/head';
import { default as NLink } from 'next/link';
import { useState, useEffect } from 'react';
import { useUserContext } from '../../context/User';

import en from '../../locales/en/[sotId].json';
import ko from '../../locales/ko/[sotId].json';

export async function getStaticPaths() {
  const { docs } = await getDocs(collection(db, 'sots'));
  const paths = docs.map(({ id }) => ({ params: { id } }));
  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params: { id } }) {
  const docSnap = await getDoc(doc(db, 'sots', id));
  if (!docSnap.exists()) return { notFound: true };

  const { location, ...data } = docSnap.data();
  const sot = { id, ...data, ...location };
  return {
    props: { sot },
  };
}

export default function Sot({ sot }) {
  const [krwPrice, setKrwPrice] = useState();

  useEffect(() => {
    const getXr = async () => {
      const xr = await getDoc(doc(db, 'XR', '15min'));
      const {
        rates: {
          KRW: { value },
        },
      } = xr.data();
      setKrwPrice((value * sot.price).toLocaleString(undefined, { maximumFractionDigits: 0 }));
    };
    if (!sot.owner) {
      getXr();
    }
  }, [sot]);
  return (
    <>
      <Head>
        <title>
          {sot.id} - {sot.name}
        </title>
      </Head>
      <Container maxW='container.lg' pt='80px' px='2' pb='8'>
        <Stack p='2' bg='white' borderRadius='md' shadow='md' spacing='4'>
          <Grid gridTemplateColumns={{ base: '1fr', md: 'minmax(200px, 400px) 1fr' }} gap='4'>
            <SotImage image={sot.image} id={sot.id} />
            <Flex flexDir='column' gap='4'>
              <Stack>
                <Heading
                  as='h1'
                  color='common.main'
                  fontSize='2xl'
                  letterSpacing='initial'
                  fontFamily='sans-serif'
                  fontWeight='bold'
                >
                  {sot.name}
                </Heading>
                <Tag size='lg' colorScheme='purple' fontFamily='mono' w='fit-content'>
                  {sot.id}
                </Tag>
              </Stack>
              <Text>{`${sot.grade}급 SoT, 100m²의 HideOut이 포함 위도 = ${sot._lat}, 경도 = ${sot._long}`}</Text>
              <Grid gridTemplateColumns='repeat(3,1fr)' gap='2' mt='auto'>
                {[
                  [sot.grade, ko.stats.grade],
                  [sot.country, ko.stats.country],
                  [sot.city, ko.stats.city],
                ].map(([stat, text]) => (
                  <Box key={text} p='2' bg='purple.50' borderRadius='md' shadow='inner' textAlign='center'>
                    <Box fontSize='sm'>{text}</Box>
                    <Box fontFamily='sans-serif' color='purple.900'>
                      {stat}
                    </Box>
                  </Box>
                ))}
              </Grid>
              <Stack p='2' borderRadius='md' bg='white' border='2px solid' borderColor='purple' shadow='sm'>
                <Box fontSize='sm'>{ko.stats.price}</Box>
                <Flex gap='2' fontWeight='bold'>
                  <Tag colorScheme='purple' variant='solid' size='lg' fontWeight='bold'>
                    $ {sot.price.toLocaleString()}
                  </Tag>
                  {krwPrice && (
                    <Tag colorScheme='purple' variant='solid' size='lg' fontWeight='bold'>
                      ₩ {krwPrice}
                    </Tag>
                  )}
                </Flex>
              </Stack>
              <BuyBtn sot={sot} />
            </Flex>
          </Grid>
          <Divider />
          <Description sot={sot} />
        </Stack>
      </Container>
    </>
  );
}

function SotImage({ image, id }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <Box sx={{ '& img': { borderRadius: 'md' } }} lineHeight='0' pos='relative'>
      <Image
        src={image}
        alt={`Thumbnail of SoT${id}`}
        width={800}
        height={800}
        onLoadingComplete={() => setLoaded(true)}
      />
      {!loaded && <Skeleton pos='absolute' inset='0' zIndex='2' borderRadius='md' />}
    </Box>
  );
}

const isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);

const redirect = (url) => window.location.assign(url);

function BuyBtn({ sot }) {
  const [loading, setLoading] = useState(false);
  const { user } = useUserContext();
  const [error, setError] = useState();

  const handleBuy = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/placeOrder', {
        method: 'POST',
        body: JSON.stringify({
          userId: user.uid,
          sotId: sot.id,
          isMobile: isMobile(),
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      const { url, error } = await res.json();

      if (error) throw error;

      redirect(url);
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  if (sot.owner) return null;
  if (!user)
    return (
      <NLink href='/enter' passHref>
        <Button as='a' size='lg'>
          {ko.btn.loginToBuy}
        </Button>
      </NLink>
    );
  if (!user.emailVerified)
    return (
      <NLink href='/dashboard' passHref>
        <Button as='a' size='lg'>
          {ko.btn.verifyToBuy}
        </Button>
      </NLink>
    );
  if (error)
    return (
      <Alert status='error' borderRadius='md'>
        <AlertIcon />
        <AlertTitle>{error?.title}</AlertTitle>
        <AlertDescription>{error?.body}</AlertDescription>
      </Alert>
    );
  return (
    <Button colorScheme='purple' size='lg' isLoading={loading} bg='common.mainLight' onClick={handleBuy}>
      {ko.btn.buy}
    </Button>
  );
}

function Description({ sot }) {
  return (
    <Stack spacing='4'>
      <Text
        whiteSpace='pre-wrap'
        p='2'
        borderRadius='md'
        bg='common.second'
        shadow='sm'
        color='purple.900'
        fontWeight='bold'
      >
        {ko.description.nftNotice}
        <br />
        {ko.description.contactUs} <ArrowForwardIcon verticalAlign='-3px' />{' '}
        <Link href='mailto:admin@fingerate.world' color='blue'>
          admin@fingerate.world
        </Link>
      </Text>
      <Box px='2'>
        <Text>{ko.description.para1}</Text>
        <Text>{ko.description.grades[sot.grade]}</Text>
        <Text>{ko.description.para2}</Text>
        <UnorderedList sx={{ '& li::marker': { color: 'common.main' } }}>
          {ko.description.paraList.map((i) => (
            <ListItem key={i}>{i}</ListItem>
          ))}
        </UnorderedList>
        <Text>{ko.description.para3}</Text>
      </Box>
      <Grid
        gridTemplateColumns={{ base: '1fr', md: '1fr 1fr' }}
        overflow='hidden'
        border='1px'
        borderBottom='none'
        borderColor='gray.100'
        borderRadius='md'
      >
        <Table size='sm'>
          <Tbody>
            {[
              [ko.stats.country, sot.country],
              [ko.stats.city, sot.city],
              [ko.stats.latitude, sot._lat],
              [ko.stats.longitude, sot._long],
            ].map(([key, val]) => (
              <Tr key={key}>
                <Td bg='purple.50' fontWeight='bold' w='28' textAlign='center' color='purple.900'>
                  {key}
                </Td>
                <Td>{val}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Table size='sm'>
          <Tbody>
            {[
              [ko.stats.location, sot.name],
              [ko.stats.grade, sot.grade],
              [ko.stats.price, `$ ${sot.price}`],
              [ko.stats.owner, sot.owner ? ko.stats.hasOwner : ko.stats.noOwner],
            ].map(([key, val]) => (
              <Tr key={key}>
                <Td bg='purple.50' fontWeight='bold' w='28' textAlign='center' color='purple.900'>
                  {key}
                </Td>
                <Td>{val}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Grid>
      <Text p='2' borderRadius='md' shadow='outline' fontWeight='bold' _before={{ content: `'*'`, mr: 1 }}>
        {ko.description.disclaimer} <ArrowForwardIcon verticalAlign='-3px' />{' '}
        <Link href='mailto:admin@fingerate.world' color={'blue'}>
          admin@fingerate.world
        </Link>
      </Text>
    </Stack>
  );
}
