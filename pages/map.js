import { useEffect, useState, useCallback } from 'react';
import ReactMapGL, { Marker, Popup, GeolocateControl, FlyToInterpolator } from 'react-map-gl';
import Image from 'next/image';
import Head from 'next/head';
import { default as NLink } from 'next/link';
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
  Heading,
  Icon,
  Stack,
} from '@chakra-ui/react';
import { SmallCloseIcon, ChevronRightIcon } from '@chakra-ui/icons';
import MapCard from '../components/utils/MapCard';
import { db } from '../lib/firebase';
import { getDocs, collection, where, query } from 'firebase/firestore';

const geolocateControlStyle = {
  right: 10,
  bottom: 40,
};

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
    setFilteredSots(sots.filter((sot) => sot.country.toLowerCase() === e.target.value.toLowerCase()));
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
        latitude: sot.lat,
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
        <meta name="description" content="Map of all SoTs currently deployed around the world" />
        {/* <meta name='keywords' content={t.keywords} /> */}
        <meta name="robots" content="index, follow" />
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/orv1s/ckvrp1ezz019v15mv2crcoxla"
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}>
        {filteredSots.map((terminal) => (
          <Marker
            key={terminal.id + terminal.name}
            longitude={terminal.long}
            latitude={terminal.lat}
            offsetLeft={-30}
            offsetTop={-30}
            onClick={() => {
              setSelectedMark(terminal);
            }}>
            <Box opacity={terminal.owner ? '0.5' : '1'}>
              <Image width="60px" height="60px" src="/sot_icon.svg" alt="SoT terminal icon" />
            </Box>
          </Marker>
        ))}
        {selectedMark && (
          <Popup
            latitude={selectedMark.lat}
            longitude={selectedMark.long}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setSelectedMark(null)}
            anchor="left"
            // offsetTop={}
            offsetLeft={20}>
            <Stack maxW="calc(200px + 1rem)" spacing={1}>
              <Image
                width={200}
                height={200}
                src={selectedMark.image}
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkrAcAAIcAgit25/8AAAAASUVORK5CYII="
                placeholder="blur"
                alt={`Thumbnail of ${selectedMark.id}`}
              />
              <Box as="strong" fontSize={'lg'} fontFamily="sans-serif">
                {selectedMark.name}
              </Box>
              <Box as="small" fontFamily={'mono'} color="cyan.400">
                SoT{selectedMark.id}
              </Box>
              <Box as={'small'} color="blue">
                <Icon>
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </Icon>
                {selectedMark.country}, {selectedMark.city}
              </Box>
              {selectedMark.owner ? (
                <Text>판매 완료</Text>
              ) : (
                <>
                  <Flex
                    textAlign={'center'}
                    fontWeight={'bold'}
                    bg="common.second"
                    p="1"
                    borderRadius={'md'}
                    alignItems="center"
                    sx={{ gap: '0.5rem' }}>
                    <Box bg={'white'} borderRadius="md" p="1">
                      {selectedMark.grade}
                    </Box>
                    <Text as={'span'} fontWeight="bold" color={'common.main'}>
                      $ {selectedMark.price.toLocaleString()}
                    </Text>
                  </Flex>
                  <NLink href={`/sots/${selectedMark.id}`}>
                    <Link
                      bg={'common.mainLight'}
                      display={'block'}
                      width={'100%'}
                      textAlign={'center'}
                      color={'white'}
                      py="1"
                      px="2"
                      borderRadius={6}>
                      SOT 구매
                    </Link>
                  </NLink>
                </>
              )}
            </Stack>
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
        flexDir="column"
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
        borderColor="gray.300"
        transform={`translateX(${isOpen ? '0' : '-95%'})`}
        transition={'all 0.4s'}
        pr={10}>
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
            list="countries"
            onChange={filterByCountry}
            placeholder="국가"
            color="common.main"
            border="1px solid"
            borderColor="common.main"
            flex={1}
          />

          <datalist id="countries">
            {availableCountries.map((c, i) => (
              <option value={c} key={c + i} />
            ))}
          </datalist>
          <Select
            flex={1}
            variant="outline"
            color="common.main"
            onChange={filterByGrade}
            placeholder="등급"
            border="1px solid"
            borderColor="common.main">
            <option value="S">S</option>
            <option value="A">A</option>
            <option value="B">B</option>
          </Select>
          {/* <IconButton icon={<SmallCloseIcon />} onClick={resetFilters} /> */}
        </Grid>
        <Grid
          as={'aside'}
          templateColumns={{
            base: 'repeat(auto-fit, minmax(150px, 1fr))',
          }}
          padding={1}
          height={'auto'}
          gap={2}
          overflowY={'scroll'}
          justifyContent="center">
          {filteredSots.map((sot) => (
            <MapCard key={sot.id} sot={sot} onSelectSoT={onSelectSoT} />
          ))}
        </Grid>
      </Flex>
    </>
  );
}

export async function getStaticProps() {
  const colRef = collection(db, 'sots');
  const cq = query(
    colRef
    // where('owner', '==', '')
  );
  const snap = await getDocs(cq);

  const sots = snap.docs.map((doc) => {
    const {
      name,
      country,
      city,
      grade,
      image,
      price,
      owner,
      location: { _lat: lat, _long: long },
    } = doc.data();
    return {
      name,
      country,
      city,
      grade,
      image,
      price,
      id: doc.id,
      owner,
      lat,
      long,
    };
  });

  return {
    props: { sots },
    revalidate: 60 * 30,
  };
}
