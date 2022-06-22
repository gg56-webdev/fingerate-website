import { useState, useRef, useEffect, memo, useReducer } from 'react';
import useMapFilter from '../hooks/useMapFilter';
import useSupercluster from 'use-supercluster';
import Head from 'next/head';
import Image from 'next/image';
import { default as NLink } from 'next/link';
import {
  Box,
  Select,
  Grid,
  Icon,
  CloseButton,
  Flex,
  Link,
  Button,
  Badge,
  Tag,
  TagLabel,
  useDisclosure,
  UnorderedList,
  ListItem,
  useMediaQuery,
  IconButton,
  FormControl,
  FormLabel,
  Switch,
  Stack,
  useBreakpointValue,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ExternalLinkIcon, HamburgerIcon } from '@chakra-ui/icons';
import ReactMapGl, { Marker, FlyToInterpolator, Popup, GeolocateControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import sotIcon from '../public/sot_icon.svg';
import sotIconPG from '../public/sot_icon_pg.svg';
import getFirebaseSots from '../utils/getFirebaseSots';
import getPolygonSots from '../utils/getPolygonSots';
import getCountryCoords from '../utils/getCountryCoords';

import ko from '../locales/ko/map.json';

export async function getStaticProps() {
  const [firebaseSots, polygonSots] = await Promise.all([getFirebaseSots(), getPolygonSots()]);
  const allSots = [...firebaseSots, ...polygonSots];

  let availableCountries = [...new Set(allSots.map(({ country }) => country))];

  availableCountries = await Promise.all(
    availableCountries.map(async (country) => {
      const [_lat, _long] = await getCountryCoords(country);
      return { country, _lat, _long };
    })
  );

  return {
    props: { allSots, availableCountries },
  };
}

export default function MapOfSots({ allSots, availableCountries }) {
  const filter = useFilter(allSots);

  return (
    <>
      <Head>
        <title>Map of SoTs</title>
        <meta name='description' content='Map of all SoTs currently deployed around the world' />
      </Head>
      <Map filteredSots={filter.filteredSots} />
      <MapMenu {...filter} availableCountries={availableCountries} />
    </>
  );
}

const MAPBOX_CONFIG = Object.freeze({
  mapStyle: 'mapbox://styles/orv1s/ckvrp1ezz019v15mv2crcoxla?optimize=true',
  mapboxApiAccessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
  maxZoom: 18,
});

function Map() {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: 0,
    longitude: 0,
    zoom: 1,
  });
  const mapRef = useRef();
  return (
    <ReactMapGl
      {...viewport}
      {...MAPBOX_CONFIG}
      ref={mapRef}
      onViewportChange={(nextViewport) => setViewport({ ...nextViewport })}
    ></ReactMapGl>
  );
}

function MapMenu({ filteredSots, ...rest }) {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });
  useEffect(() => !isMobile && onOpen(), [isMobile, onOpen]);
  return (
    <Flex
      flexDir='column'
      gap='1'
      zIndex='10'
      maxW={{ base: '90%', md: '45%' }}
      as='aside'
      pos='fixed'
      top='65px'
      bottom='8'
      left='0'
      bg='white'
      p='1'
      borderRightRadius='md'
      shadow={isOpen ? 'md' : 'none'}
      transition='transform 0.3s'
      transform={isOpen ? 'translate(0%, 0%)' : 'translate(-100%,0%)'}
    >
      <IconButton
        aria-label='toggle list map menu'
        onClick={onToggle}
        pos='absolute'
        top={isOpen ? '0' : '50%'}
        right='-0.5'
        transform='translateX(100%)'
        size='md'
        variant={isOpen ? 'ghost' : 'solid'}
        isRound
        colorScheme='purple'
        transition='0.3s'
        icon={isOpen ? <ChevronLeftIcon boxSize='8' /> : <HamburgerIcon boxSize='6' />}
      />
      <Filters {...rest} />
      <SotList filteredSots={filteredSots} />
    </Flex>
  );
}

function Filters({ availableCountries, dispatch }) {
  return (
    <Flex gap='1' p='1' bg='purple.50' shadow='inner' borderRadius='md' flexWrap='wrap'>
      <Select
        flex='1 1 auto'
        bg='white'
        w='auto'
        onChange={(e) => dispatch({ type: FILTER_ACTIONS.SET, payload: ['countryFilter', e.target.value] })}
      >
        <option value=''>- {ko.filters.country} -</option>
        {availableCountries.map(({ country }) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </Select>
      <Select
        bg='white'
        w='auto'
        onChange={(e) => {
          dispatch({ type: FILTER_ACTIONS.SET, payload: ['gradeFilter', e.target.value] });
        }}
      >
        <option value=''>- {ko.filters.grade} -</option>
        {['S', 'A', 'B', 'C', 'D'].map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </Select>

      <Select
        flex='0.75 1 auto'
        bg='white'
        w='auto'
        onChange={(e) => dispatch({ type: FILTER_ACTIONS.SET, payload: ['sourceFilter', e.target.value] })}
      >
        <option value=''>- {ko.filters.source} -</option>
        <option value='card'>{ko.filters.buyWithCard}</option>
        <option value='crypto'>{ko.filters.buyWithCrypto}</option>
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

function SotList({ filteredSots }) {
  if (!filteredSots.length)
    return (
      <Grid borderRadius='md' bg='pink.50' h='full' textAlign='center' color='pink.900' placeItems='center'>
        No SoTs to show, try to change filters...
      </Grid>
    );
  return (
    <Grid
      borderRadius='md'
      as='ul'
      overflowY='auto'
      gap='1.5'
      gridTemplateColumns={{ base: '1fr 1fr', md: 'repeat(3, 1fr)' }}
    >
      {filteredSots.map((sot) => (
        <SotCard key={sot.id} sot={sot} />
      ))}
    </Grid>
  );
}

function SotCard({ sot }) {
  const isNft = sot.source !== 'Firebase';
  const hasOwner = !!sot.owner;
  const color = isNft ? 'blue' : 'purple';
  return (
    <Flex
      flexDir='column'
      fontFamily='sans-serif'
      as='li'
      p='1.5'
      bg='gray.50'
      borderRadius='md'
      border='2px solid'
      borderColor={hasOwner ? 'gray.200' : `${color}.200`}
      gap='1.5'
      shadow='xs'
    >
      <Box as='strong' color={color} fontSize='sm' lineHeight='1.25'>
        {sot.name}
      </Box>
      <Flex fontFamily='mono' gap='1' mt='auto' flexWrap='wrap'>
        <Tag borderRadius='4px' size='sm' colorScheme='purple' w='fit-content'>
          {sot.id}
        </Tag>
        {isNft && (
          <Tag borderRadius='4px' colorScheme='blue' size='sm' w='fit-content'>
            token_id: {sot.token_id}
          </Tag>
        )}
        <Tag borderRadius='4px' colorScheme='pink' size='sm' w='fit-content' fontFamily='sans-serif'>
          <Icon ml='-0.5'>
            <path
              fill='currentColor'
              fillRule='evenodd'
              d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z'
              clipRule='evenodd'
            />
          </Icon>
          <TagLabel isTruncated={false}>{sot.country}</TagLabel>
        </Tag>
      </Flex>
      <Flex gap='1' align='center'>
        <Grid
          fontSize='md'
          fontWeight='bold'
          placeItems='center'
          borderRadius='4px'
          w='7'
          h='7'
          bg={`grades.${sot.grade}`}
          color='white'
          shadow='inner'
          textShadow='-1px -1px 1px rgba(255,255,255,.1), 1px 1px 1px rgba(0,0,0,.5)'
        >
          {sot.grade}
        </Grid>
        <Box flex='1' px='2' bg={hasOwner ? 'gray.100' : 'common.second'} shadow='inner' borderRadius='4px'>
          <Box display='inline' fontWeight='bold' fontSize='sm' color={hasOwner ? 'gray.600' : 'purple'}>
            $ {sot.price.toLocaleString()}
          </Box>
          {hasOwner && (
            <Box as='ins' ml='1' fontSize='xs' textDecor='none' color='gray.500'>
              {ko.general.sold}
            </Box>
          )}
        </Box>
      </Flex>
    </Flex>
  );
}

const filterInitalState = {
  gradeFilter: '',
  countryFilter: '',
  forSaleFilter: false,
  sourceFilter: '',
};

const FILTER_ACTIONS = Object.freeze({
  SET: 'set',
  // RESET: 'reset',
});

const reducer = (state, { type, payload }) => {
  switch (type) {
    case FILTER_ACTIONS.SET:
      const [key, val] = payload;
      return { ...state, [key]: val };
    // case FILTER_ACTIONS.RESET:
    //   return { ...filterInitalState };
    default:
      return state;
  }
};

function useFilter(sots) {
  const [filteredSots, setFilteredSots] = useState([]);
  const [state, dispatch] = useReducer(reducer, { ...filterInitalState });
  const { gradeFilter, countryFilter, forSaleFilter, sourceFilter } = state;

  const filterByCountry = (arr) => arr.filter(({ country }) => country === countryFilter);
  const filterByGrade = (arr) => arr.filter(({ grade }) => grade === gradeFilter);
  const filterBySource = (arr) =>
    arr.filter(({ source }) => (sourceFilter === 'crypto' ? source !== 'Firebase' : source === 'Firebase'));
  const filterByForSale = (arr) => arr.filter(({ owner }) => !owner);

  useEffect(() => {
    let res = sots;
    if (countryFilter) res = filterByCountry(res);
    if (gradeFilter) res = filterByGrade(res);
    if (sourceFilter) res = filterBySource(res);
    if (forSaleFilter) res = filterByForSale(res);

    setFilteredSots(res);
  }, [state, sots]);

  return { dispatch, filteredSots };
}
