import { useState, useRef, memo } from 'react';
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
  useDisclosure,
  UnorderedList,
  ListItem,
  useMediaQuery,
  IconButton,
  FormControl,
  FormLabel,
  Switch,
} from '@chakra-ui/react';
import { CloseIcon, ExternalLinkIcon, HamburgerIcon } from '@chakra-ui/icons';
import ReactMapGl, { Marker, FlyToInterpolator, Popup, GeolocateControl } from 'react-map-gl';
import sotIcon from '../public/sot_icon.svg';
import sotIconPG from '../public/sot_icon_pg.svg';
import { db } from '../lib/firebase';
import { getDocs, collection, where, query } from 'firebase/firestore';
import getSoTData from '../utils/getSoTData';

import ko from '../locales/ko/map.json';

export async function getStaticProps() {
  const colRef = collection(db, 'sots');
  const cq = query(
    colRef
    // where('owner', '==', '')
  );

  const [fbSnap, sotsPG] = await Promise.all([getDocs(cq), getSoTData()]);

  const sotsFB = fbSnap.docs.map((doc) => {
    const {
      name,
      country,
      city,
      grade,
      price,
      owner,
      location: { _lat: lati, _long: long },
    } = doc.data();
    return {
      name,
      country,
      city,
      grade,
      price,
      id: doc.id,
      owner,
      lati,
      long,
      source: 'Firestore',
    };
  });

  const sotsData = [...sotsFB, ...sotsPG];

  const availableCountries = sotsData.reduce((acc, { country }) => {
    if (!acc.includes(country)) return [...acc, country];
    return acc;
  }, []);

  return {
    props: { sotsData, availableCountries },
    revalidate: 60 * 30,
  };
}

export default function Map({ sotsData, availableCountries }) {
  const t = ko;

  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100vh',
    latitude: 0,
    longitude: 0,
    zoom: 1,
  });
  const mapRef = useRef();

  const {
    arrayToFilter: sots,
    setGradeFilter,
    setCountryFilter,
    setSourceFilter,
    setForSaleFilter,
  } = useMapFilter(sotsData);

  const points = sots.map((s) => ({
    type: 'Feature',
    properties: {
      cluster: false,
      sotId: s.id,
      sotName: s.name,
      sotGrade: s.grade,
      sotOwner: s.owner,
      sotPrice: s.price || null,
      sotCity: s.city,
      sotCountry: s.country,
      sotSource: s.source,
      sotTokenId: s.token_id,
      sotUrl: s.url,
    },
    geometry: {
      type: 'Point',
      coordinates: [s.long, s.lati],
    },
  }));

  const bounds = mapRef.current ? mapRef.current.getMap().getBounds().toArray().flat() : null;

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom: viewport.zoom,
    options: { radius: 65, maxZoom: 12 },
  });

  const zoomToMarker = (long, lati, zoom = 15) => {
    setViewport({
      ...viewport,
      longitude: long,
      latitude: lati,
      zoom,
      transitionInterpolator: new FlyToInterpolator({ speed: 2 }),
      transitionDuration: 'auto',
    });
  };

  const markers = clusters.map((cluster) => {
    const {
      geometry: {
        coordinates: [longitude, latitude],
      },
      properties: { cluster: isCluster, point_count: pointCount },
    } = cluster;

    if (isCluster) {
      return (
        <Marker
          key={`cluster-${cluster.id}`}
          latitude={latitude}
          longitude={longitude}
          onClick={() => {
            const expansionZoom = Math.min(supercluster.getClusterExpansionZoom(cluster.id), 20);
            zoomToMarker(longitude, latitude, expansionZoom);
          }}
        >
          <Grid
            cursor={'pointer'}
            placeItems={'center'}
            bg={'common.main'}
            opacity={0.9}
            w={`${30 + (pointCount / points.length) * 30}px`}
            h={`${30 + (pointCount / points.length) * 30}px`}
            borderRadius='md'
            color={'white'}
          >
            {pointCount}
          </Grid>
        </Marker>
      );
    }

    return (
      <MarkerPopup
        key={`SoT ${cluster.properties.sotId}`}
        zoomToMarker={zoomToMarker}
        longitude={longitude}
        latitude={latitude}
        props={cluster.properties}
        content={t.general}
      />
    );
  });

  return (
    <>
      <Head>
        <title>Map of SoTs</title>
        <meta name='description' content='Map of all SoTs currently deployed around the world' />
      </Head>
      <ReactMapGl
        {...viewport}
        mapStyle='mapbox://styles/orv1s/ckvrp1ezz019v15mv2crcoxla?optimize=true'
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        onViewportChange={(nextViewport) => setViewport({ ...nextViewport })}
        maxZoom={18}
        ref={mapRef}
      >
        {markers}
        <GeolocateControl
          style={{ right: 10, bottom: 40 }}
          fitBoundsOptions={{ maxZoom: 13 }}
          trackUserLocation={false}
          auto
        />
      </ReactMapGl>
      <MapMenu
        zoomToMarker={zoomToMarker}
        sots={sots}
        setCountryFilter={setCountryFilter}
        setGradeFilter={setGradeFilter}
        setSourceFilter={setSourceFilter}
        setForSaleFilter={setForSaleFilter}
        availableCountries={availableCountries}
        content={t}
      />
    </>
  );
}

const MarkerPopup = ({ longitude, latitude, zoomToMarker, props, content }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Marker
        longitude={longitude}
        latitude={latitude}
        offsetLeft={-30}
        offsetTop={-30}
        onClick={() => {
          zoomToMarker(longitude, latitude + 0.001), setOpen(true);
        }}
      >
        <Box cursor={'pointer'} opacity={props.sotOwner ? 0.35 : 1}>
          <Image
            src={props.sotSource === 'Polygon' ? sotIconPG : sotIcon}
            alt={'SoT Device Icon'}
            width={60}
            height={60}
          />
        </Box>
      </Marker>
      {open && (
        <Popup longitude={longitude} latitude={latitude} offsetTop={-30} closeButton={false} className={'popup'}>
          <CloseButton
            onClick={() => setOpen(false)}
            alignSelf='end'
            pos={'absolute'}
            top={0}
            right={0}
            transform={'translate(50%, -50%)'}
            bg={'gray.50'}
            borderRadius={'full'}
          />
          <Box as='strong' fontSize={'lg'} fontFamily='sans-serif'>
            {props.sotName}
          </Box>
          <Box as='small' fontFamily={'mono'} color='cyan.400'>
            SoT {props.sotId}{' '}
            {props.sotSource === 'Polygon' && (
              <Tag colorScheme={'blue'} size={'sm'}>
                Polygon
              </Tag>
            )}
          </Box>
          <Box as={'small'} color='blue'>
            <Icon>
              <path
                fill='currentColor'
                fillRule='evenodd'
                d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z'
                clipRule='evenodd'
              />
            </Icon>
            {props.sotCountry}, {props.sotCity}
          </Box>
          <Flex
            alignItems={'center'}
            color='common.main'
            p={1}
            borderRadius={'md'}
            fontWeight={'bold'}
            border={'2px solid'}
            borderColor={props.sotSource === 'Polygon' ? 'blue.500' : props.sotOwner ? 'gray.100' : 'common.main'}
            fontFamily='sans-serif'
          >
            <Box p={2} bg={'white'} border={'2px solid'} borderColor={`grades.${props.sotGrade}`} borderRadius={'md'}>
              {props.sotGrade}
            </Box>
            <Box flex={1} p={2}>
              {`$ ${props.sotPrice.toLocaleString()}`}{' '}
              {props.sotOwner && <Badge fontSize={'0.8em'}>{content.sold}</Badge>}
            </Box>
          </Flex>
          <NLink href={props.sotSource === 'Polygon' ? props.sotUrl : `/sots/${props.sotId}`} passHref>
            <Button
              as={Link}
              isExternal
              _hover={{ textDecoration: 'none', outline: '1px solid purple' }}
              colorScheme={props.sotSource === 'Polygon' ? 'blue' : props.sotOwner ? 'gray' : 'purple'}
              textDecoration={'none'}
              fontSize={'xl'}
            >
              {props.sotSource === 'Polygon' ? content.buyPolygon : props.sotOwner ? content.view : content.buy}
              {props.sotSource === 'Polygon' && <ExternalLinkIcon />}
            </Button>
          </NLink>
        </Popup>
      )}
    </>
  );
};

const sotsAreEqual = ({ sots: prevSots }, { sots: nextSots }) => {
  return prevSots.length === nextSots.length && prevSots[0]?.id === nextSots[0]?.id;
};

const MapMenu = memo((props) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Flex
      as={'aside'}
      position={'fixed'}
      top={'70px'}
      bottom={'8'}
      left={'0'}
      maxW={{ base: '85vw', md: '45vw' }}
      transform={isOpen ? 'translate(0%, 0%)' : 'translate(-100%,0%)'}
      transition='0.2s'
      bg='white'
      borderTopRightRadius={'md'}
      borderBottomRightRadius={'md'}
      shadow={'md'}
      zIndex={3}
      p={1}
      flexDir='column'
    >
      <Button
        onClick={onToggle}
        position={'absolute'}
        top={isOpen ? '0' : '50%'}
        right={'0'}
        transform={'translate(calc(100% + 4px), 0%)'}
        w={12}
        h={12}
        variant={isOpen ? 'outline' : 'solid'}
        borderRadius='full'
        colorScheme={isOpen ? 'gray' : 'purple'}
        transition='0.2s'
      >
        {isOpen ? <CloseIcon /> : <HamburgerIcon boxSize={'1.5em'} />}
      </Button>
      <Filters {...props} />
      <SotList
        sots={props.sots}
        content={props.content.general}
        zoomToMarker={props.zoomToMarker}
        onToggle={onToggle}
      />
      {props.sots.length == 0 && (
        <Grid placeItems={'center'} h='100%'>
          No SoTs to show, try to change filters
        </Grid>
      )}
    </Flex>
  );
}, sotsAreEqual);

MapMenu.displayName = 'MapMenu';

const Filters = ({
  availableCountries,
  setCountryFilter,
  setGradeFilter,
  content: { filters },
  setSourceFilter,
  setForSaleFilter,
}) => {
  return (
    <Flex sx={{ gap: 1 }} p='1' bg={'blue.50'} borderRadius='md' mb='1'>
      <Select bg='white' onChange={(e) => setCountryFilter(e.target.value)} placeholder={filters.country}>
        {availableCountries.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </Select>
      <Select bg='white' onChange={(e) => setGradeFilter(e.target.value)} placeholder={filters.grade} flexGrow={0}>
        {['S', 'A', 'B', 'C', 'D'].map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </Select>

      <Select bg='white' onChange={(e) => setSourceFilter(e.target.value)} placeholder={filters.source}>
        {[
          ['card', filters.buyWithCard],
          ['crypto', filters.buyWithCrypto],
        ].map((s) => (
          <option key={s[0]} value={s[0]}>
            {s[1]}
          </option>
        ))}
      </Select>

      <FormControl
        bg='white'
        display='flex'
        alignItems='center'
        border={'1px solid'}
        borderColor='gray.200'
        borderRadius={'md'}
        pl={1}
      >
        <FormLabel htmlFor='owner-toogle' mb='0'>
          {filters.ownership}
        </FormLabel>
        <Switch id='owner-toogle' onChange={(e) => setForSaleFilter(e.target.checked)} />
      </FormControl>
    </Flex>
  );
};

const SotList = ({ sots, content, zoomToMarker, onToggle }) => {
  const [isMobile] = useMediaQuery('(max-width: 1150px)');
  return (
    <UnorderedList overflowY={'auto'} listStyleType={'none'} m='0' p='1' spacing={'1'} bg='gray.50'>
      {sots.map((sot) => (
        <ListItem
          key={sot.id}
          p={1}
          display='flex'
          bg='white'
          borderRadius={'md'}
          border='2px solid'
          borderColor={sot.source === 'Polygon' ? 'blue.500' : sot.owner ? 'gray.100' : 'common.main'}
          className='list-card'
          shadow={'sm'}
          position='relative'
          minW={'300px'}
        >
          <Flex
            flexDir={'column'}
            justifyContent={'space-between'}
            flex={'1 0'}
            fontFamily='sans-serif'
            sx={{ gap: 1 }}
          >
            <Box as='strong'>{sot.name}</Box>
            <Flex alignItems={'center'} color='common.main' borderRadius={'md'} fontWeight={'bold'}>
              <Box p={2} bg={'white'} border={'2px solid'} borderColor={`grades.${sot.grade}`} borderRadius={'md'}>
                {sot.grade}
              </Box>
              <Box flex={1} p={2}>
                {`$ ${sot.price && sot.price.toLocaleString()}`}{' '}
                {sot.owner && <Badge fontSize={'0.8em'}>{content.sold}</Badge>}
              </Box>
            </Flex>
          </Flex>
          <Flex
            opacity={0}
            sx={{ '.list-card:hover &': { opacity: 1 }, gap: 1 }}
            transition='0.2s'
            pos={'absolute'}
            inset={'auto 0 0 auto'}
            justifyContent='end'
            alignItems={'end'}
            p={1}
          >
            <IconButton
              icon={
                <Icon boxSize={6}>
                  <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
                    <path
                      fillRule='evenodd'
                      d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z'
                      clipRule='evenodd'
                    />
                  </svg>
                </Icon>
              }
              colorScheme={'blue'}
              variant={'outline'}
              onClick={() => {
                zoomToMarker(sot.long, sot.lati), isMobile && onToggle();
              }}
            />
            <NLink href={sot.source === 'Polygon' ? sot.url : `/sots/${sot.id}`} passHref>
              <Button
                as={Link}
                isExternal
                _hover={{ textDecoration: 'none', outline: '1px solid purple' }}
                colorScheme={sot.source === 'Polygon' ? 'blue' : sot.owner ? 'gray' : 'purple'}
                textDecoration={'none'}
                fontSize={'xl'}
              >
                {sot.source === 'Polygon' ? content.buyPolygon : sot.owner ? content.view : content.buy}
                {sot.source === 'Polygon' && <ExternalLinkIcon />}
              </Button>
            </NLink>
          </Flex>
        </ListItem>
      ))}
    </UnorderedList>
  );
};
