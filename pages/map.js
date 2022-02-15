import { useEffect, useState, useCallback } from 'react';
import ReactMapGL, {
  Marker,
  Popup,
  GeolocateControl,
  FlyToInterpolator,
} from 'react-map-gl';
import Image from 'next/image';
import Head from 'next/head';
import getSoTData from '../utils/getSoTData';
import {
  Box,
  Select,
  Grid,
  GridItem,
  Flex,
  Input,
  IconButton,
  Text,
  useDisclosure,
  useMediaQuery,
  Link,
  Button,
} from '@chakra-ui/react';
import { SmallCloseIcon, ChevronRightIcon } from '@chakra-ui/icons';
import MapCard from '../components/utils/MapCard';

const geolocateControlStyle = {
  right: 10,
  bottom: 40,
};

const priceListWon = { S: 1_000_000, A: 750_000, B: 500_000 };

export default function Map({ sots }) {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100vh',
    latitude: 0,
    longitude: 0,
    zoom: 1,
  });
  const availableCountries = [...new Set(sots.map((sot) => sot.country))];

  const [filteredSots, setFilteredSots] = useState(sots);

  const filterByGrade = (e) => {
    setFilteredSots(sots.filter((sot) => sot.grade === e.target.value));
    if (e.target.value === '') setFilteredSots(sots);
  };

  const filterByCountry = (e) => {
    setFilteredSots(
      sots.filter(
        (sot) => sot.country.toLowerCase() === e.target.value.toLowerCase()
      )
    );
    if (e.target.value === '') setFilteredSots(sots);
  };

  const resetFilters = () => {
    setFilteredSots(sots);
  };

  const { isOpen, onToggle, onClose } = useDisclosure();

  const [isMobile] = useMediaQuery('(max-width: 1150px)');

  const onSelectSoT = useCallback(
    (sot) => {
      setViewport({
        longitude: sot.long,
        latitude: sot.lati,
        zoom: 15,
        transitionInterpolator: new FlyToInterpolator({ speed: 2 }),
        transitionDuration: 'auto',
      });
      isMobile && onClose();
      setSelectedMark(sot);
    },
    [isMobile, onClose]
  );

  const [selectedMark, setSelectedMark] = useState(null);

  return (
    <>
      <Head>
        <title>Map of SoTs</title>
        <meta
          name='description'
          content='Map of all SoTs currently deployed around the world'
        />
        {/* <meta name='keywords' content={t.keywords} /> */}
        <meta name='robots' content='index, follow' />
        <meta charSet='utf-8' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <ReactMapGL
        {...viewport}
        mapStyle='mapbox://styles/orv1s/ckvrp1ezz019v15mv2crcoxla'
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
      >
        {filteredSots.map((terminal) => (
          <Marker
            key={terminal.id + terminal.name}
            longitude={terminal.long}
            latitude={terminal.lati}
            offsetLeft={-30}
            offsetTop={-30}
            onClick={() => {
              setSelectedMark(terminal);
            }}
          >
            <Image
              width='60px'
              height='60px'
              src='/sot_icon.svg'
              alt='SoT terminal icon'
            />
          </Marker>
        ))}
        {selectedMark && (
          <Popup
            latitude={selectedMark.lati}
            longitude={selectedMark.long}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setSelectedMark(null)}
            anchor='left'
            // offsetTop={}
            offsetLeft={20}
          >
            <Image
              width={200}
              height={200}
              src={selectedMark.image}
              blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkrAcAAIcAgit25/8AAAAASUVORK5CYII='
              placeholder='blur'
              alt={`Thumbnail of ${selectedMark.id}`}
            />
            <Text maxW={200}>{selectedMark.description}</Text>
            <Text textAlign={'center'} fontWeight={'bold'}>
              ₩ {priceListWon[selectedMark.grade]}
            </Text>
            <Link
              bg={'common.main'}
              display={'block'}
              width={'100%'}
              textAlign={'center'}
              color={'white'}
              py='1'
              px='2'
              borderRadius={6}
              href={selectedMark.url}
              target={'_blank'}
              isExternal
            >
              Buy SoT
            </Link>
          </Popup>
        )}
        <GeolocateControl
          style={geolocateControlStyle}
          fitBoundsOptions={{ maxZoom: 11 }}
          trackUserLocation={false}
          auto
        />
      </ReactMapGL>
      {/* Sot list */}

      <Flex
        flexDir='column'
        pos={'fixed'}
        left={2}
        bottom={8}
        top={'70px'}
        maxW={'85vw'}
        padding={2}
        bg={'white'}
        borderRadius={6}
        overflow={'hidden'}
        boxShadow={'lg'}
        border={'1px solid'}
        borderColor='gray.300'
        transform={`translateX(${isOpen ? '0' : '-95%'})`}
        transition={'all 0.4s'}
        pr={10}
      >
        <IconButton
          pos={'absolute'}
          top={'50%'}
          transform={'translateY(-50%)'}
          width={'auto'}
          right={0}
          icon={isOpen ? <SmallCloseIcon /> : <ChevronRightIcon />}
          height={'100%'}
          onClick={onToggle}
          bg={'white'}
        />
        <Grid gridTemplateColumns={'1fr 1fr auto'} gap={1} p={1}>
          <Input
            list='countries'
            onChange={filterByCountry}
            placeholder='Country'
            color='common.main'
            border='1px solid'
            borderColor='common.main'
            flex={1}
          />

          <datalist id='countries'>
            {availableCountries.map((c, i) => (
              <option value={c} key={c + i} />
            ))}
          </datalist>
          <Select
            flex={1}
            variant='outline'
            color='common.main'
            onChange={filterByGrade}
            placeholder='Grade'
            border='1px solid'
            borderColor='common.main'
          >
            <option value='S'>S</option>
            <option value='A'>A</option>
            <option value='B'>B</option>
          </Select>
          {/* <IconButton icon={<SmallCloseIcon />} onClick={resetFilters} /> */}
        </Grid>
        <Grid
          templateColumns={'repeat(2, 1fr)'}
          padding={1}
          height={'auto'}
          gap={3}
          overflowY={'scroll'}
        >
          {filteredSots.map((item) => (
            <MapCard
              key={item.id}
              sot={item}
              price={priceListWon[item.grade]}
              onSelectSoT={onSelectSoT}
            />
          ))}
        </Grid>
      </Flex>
    </>
  );
}

export async function getStaticProps() {
  const sots = await getSoTData();
  return { props: { sots } };
}
