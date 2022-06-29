import {
  Box,
  Container,
  Heading,
  Spinner,
  Stack,
  Grid,
  Skeleton,
  Flex,
  Tag,
  Icon,
  TagLabel,
  LinkBox,
  LinkOverlay,
  Select,
  FormControl,
  FormLabel,
  Switch,
  Center,
} from '@chakra-ui/react';
import { collection, getDocs, limit, query, orderBy, documentId } from 'firebase/firestore';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import useFilter, { FILTER_ACTIONS } from '../../hooks/useFilter';
import { db } from '../../lib/firebase';

import ko from '../../locales/ko/sots.json';

const LIMIT = 6 * 5;
const q = query(collection(db, 'sots'), orderBy(documentId()), limit(LIMIT));

export async function getStaticProps() {
  const { docs } = await getDocs(q);
  const sots = docs.map((doc) => {
    const { location, ...data } = doc.data();
    return { id: doc.id, ...data };
  });

  const availableCountries = [...new Set(sots.map(({ country }) => country))];

  return { props: { sots, availableCountries } };
}

export default function Sots({ sots, availableCountries }) {
  const { filteredSots, dispatch } = useFilter(sots);

  return (
    <>
      <Head>
        <title>SoTs</title>
      </Head>
      <Container maxW='1400px' pt='80px' px='2' pb='8'>
        <Heading as='h1' textAlign='center'>
          SoTs
        </Heading>
        <Stack p='2' bg='white' borderRadius='md' shadow='md'>
          <Filters dispatch={dispatch} availableCountries={availableCountries} />
          <SotsList sots={filteredSots} />
        </Stack>
      </Container>
    </>
  );
}

function Filters({ dispatch, availableCountries }) {
  return (
    <Flex sx={{ gap: 1 }} bg='purple.50' borderRadius='md' shadow='inner' p='1'>
      <Select
        bg='white'
        w='auto'
        onChange={(e) => dispatch({ type: FILTER_ACTIONS.SET, payload: ['countryFilter', e.target.value] })}
      >
        <option value=''>- {ko.filters.country} -</option>
        {availableCountries.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </Select>
      <Select
        bg='white'
        w='auto'
        onChange={(e) => dispatch({ type: FILTER_ACTIONS.SET, payload: ['gradeFilter', e.target.value] })}
      >
        <option value=''>- {ko.filters.grade} -</option>
        {['S', 'A', 'B', 'C', 'D'].map((g) => (
          <option value={g} key={g}>
            {g}
          </option>
        ))}
      </Select>
      <FormControl
        bg='white'
        display='flex'
        h='10'
        alignItems='center'
        borderWidth='1px'
        borderRadius='md'
        pl='4'
        pr='2'
        w='auto'
        flexShrink='0'
      >
        <FormLabel htmlFor='owner-toogle' m='0' mr='2'>
          {ko.filters.ownership}
        </FormLabel>
        <Switch
          id='owner-toogle'
          colorScheme='purple'
          onChange={(e) => dispatch({ type: FILTER_ACTIONS.SET, payload: ['forSaleFilter', e.target.checked] })}
        />
      </FormControl>
    </Flex>
  );
}

function SotsList({ sots }) {
  if (sots.length === 0)
    return (
      <Box bg='pink.50' textAlign='center' color='pink.900' py='8' borderRadius='md'>
        No SoTs to show, try to change filters...
      </Box>
    );

  return (
    <Grid
      as='ul'
      gridTemplateColumns={{ base: '1fr 1fr', md: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))' }}
      gap='2'
    >
      {sots.map((sot) => (
        <SotCard key={sot.id} sot={sot} />
      ))}
    </Grid>
  );
}

function SotCard({ sot }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <LinkBox
      display='flex'
      flexDir='column'
      gap='2'
      as='li'
      borderRadius='md'
      borderWidth='2px'
      borderColor={sot.owner ? 'gray.200' : 'purple.200'}
      shadow='sm'
      bg='gray.50'
      p='1'
      sx={{ '& img': { borderRadius: 'base' } }}
      fontFamily='sans-serif'
      transition='all 0.2s'
      _hover={{ transform: 'scale(1.025)', outline: '1px solid', outlineColor: 'purple' }}
    >
      <Box pos='relative' fontSize='0'>
        <Image
          src={sot.image}
          alt={`Thumbnail of SoT${sot.id}`}
          width='400'
          height='400'
          onLoadingComplete={() => setLoaded(true)}
        />
        {!loaded && <Skeleton pos='absolute' inset='0' zIndex='2' borderRadius='base' />}
      </Box>

      <Flex flexDir='column' flex='1' sx={{ gap: 2 }}>
        <Link href={`/sots/${sot.id}`} passHref>
          <LinkOverlay color='common.main' fontWeight='bold' fontSize={{ base: 'sm', sm: 'md' }}>
            {sot.name}
          </LinkOverlay>
        </Link>
        <Box mt='auto' display={{ base: 'none', sm: 'grid' }} sx={{ gap: 1 }}>
          <Box color='blue.400' display='flex' fontFamily='mono' sx={{ gap: 1 }} flexWrap='wrap'>
            <Tag colorScheme='purple' size='sm'>
              {sot.id}
            </Tag>
          </Box>

          <Tag colorScheme='pink' size='sm' w='fit-content'>
            <Icon ml='-0.5'>
              <path
                fill='currentColor'
                fillRule='evenodd'
                d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z'
                clipRule='evenodd'
              />
            </Icon>
            <TagLabel isTruncated={false}>
              {sot.country}, {sot.city}
            </TagLabel>
          </Tag>
        </Box>
      </Flex>
      <Flex sx={{ gap: 1 }} align='center'>
        <Grid
          fontWeight='bold'
          placeItems='center'
          borderRadius='md'
          w='8'
          sx={{ aspectRatio: '1/1' }}
          bg={`grades.${sot.grade}`}
          color='white'
          shadow='inner'
          textShadow='-1px -1px 1px rgba(255,255,255,.1), 1px 1px 1px rgba(0,0,0,.5)'
        >
          {sot.grade}
        </Grid>
        <Box flex='1' py='0.5' px='2' bg={sot.owner ? 'gray.100' : 'common.second'} shadow='inner' borderRadius='md'>
          <Box as='strong' fontSize={{ base: 'sm', md: 'initial' }} color={sot.owner ? 'gray.500' : 'purple'}>
            $ {sot.price.toLocaleString()}
          </Box>
          {sot.owner && (
            <Box as='ins' ml='1' fontSize='xs' textDecor='none'>
              {ko.hasOwner}
            </Box>
          )}
        </Box>
      </Flex>
    </LinkBox>
  );
}
