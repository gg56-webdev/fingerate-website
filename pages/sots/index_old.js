import {
  Box,
  Container,
  Heading,
  Flex,
  Button,
  Text,
  Grid,
  Stack,
  Select,
  Input,
  Icon,
  Checkbox,
  Switch,
  FormLabel,
  LinkBox,
  LinkOverlay,
  FormControl,
  Skeleton,
} from '@chakra-ui/react';
import { db } from '../../lib/firebase';
import { getDocs, collection, where, query, limit, startAfter, orderBy, documentId } from 'firebase/firestore';
import useMapFilter from '../../hooks/useMapFilter';
import Image from 'next/image';
import Head from 'next/head';
import { default as NLink } from 'next/link';

import ko from '../../locales/ko/sots.json';
import en from '../../locales/en/sots.json';

import { useRouter } from 'next/router';
import { useState } from 'react';
import { ArrowDownIcon, ArrowUpIcon, RepeatIcon } from '@chakra-ui/icons';
import { motion, AnimatePresence } from 'framer-motion';

const MotionGrid = motion(Grid);
const MotionLinkBox = motion(LinkBox);

const LIMIT = 6 * 5;

export async function getServerSideProps() {
  const colRef = collection(db, 'sots');

  const cq = query(
    colRef,
    //  where('owner', '==', '')
    limit(LIMIT)
  );
  const snap = await getDocs(cq);

  const sotsData = snap.docs.map((doc) => {
    const { name, country, city, grade, image, price, owner } = doc.data();
    return { name, country, city, grade, image, price, id: doc.id, owner };
  });

  return {
    props: { sotsData },
    // revalidate: 60 * 30,
  };
}

export default function Sots({ sotsData }) {
  const { arrayToFilter: sots, setGradeFilter, setCountryFilter, setForSaleFilter } = useMapFilter(sotsData);

  const [isLoading, setIsLoading] = useState(false);
  const [isCollectionEnd, setIsCollectionEnd] = useState(false);

  const getMore = async () => {
    setIsLoading(true);
    const { id: lastId } = filteredSots.at(-1);
    try {
      const colRef = collection(db, 'sots');

      const cq = query(
        colRef,
        //  where('owner', '==', '')
        orderBy(documentId()),
        startAfter(lastId),
        limit(LIMIT)
      );
      const snap = await getDocs(cq);

      const moreSoTs = snap.docs.map((doc) => {
        const { name, country, city, grade, image, price, owner } = doc.data();
        return { name, country, city, grade, image, price, id: doc.id, owner };
      });

      setFilteredSots([...filteredSots, ...moreSoTs]);
      setIsLoading(false);

      if (moreSoTs.length < LIMIT) setIsCollectionEnd(true);
    } catch (err) {
      console.error(err);
    }
  };

  const router = useRouter();
  const { locale } = router;

  const t = locale === 'ko' ? ko : en;

  const availableCountries = [...new Set(sots.map((sot) => sot.country))];

  return (
    <>
      <Head>
        <title>SoTs</title>
      </Head>
      <Container maxW={'1400px'} pt='80px' px='2' pb='8'>
        <Heading as='h1' textAlign='center'>
          SoTs
        </Heading>
        <Stack p={'2'} bg='white' borderRadius={'md'} shadow='md'>
          <Filters
            availableCountries={availableCountries}
            content={t}
            setGradeFilter={setGradeFilter}
            setForSaleFilter={setForSaleFilter}
            setCountryFilter={setCountryFilter}
          />

          {/* <MotionGrid
            gap='2'
            gridTemplateColumns={{
              base: 'repeat(auto-fill, minmax(150px, 1fr))',
              sm: 'repeat(auto-fill, minmax(200px, 1fr))',
            }}
            layout
          >
            <AnimatePresence>
              {sots.map((sot) => (
                <SotCard key={sot.id} sot={sot} t={t} />
              ))}
            </AnimatePresence>
          </MotionGrid> */}
          {/* {!isCollectionEnd && (
            <Button
              w='fit-content'
              alignSelf={'center'}
              colorScheme='purple'
              onClick={getMore}
              isLoading={isLoading}
            >
              Load more
            </Button>
          )} */}
        </Stack>
      </Container>
    </>
  );
}

const SotCard = ({ sot, t }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <MotionLinkBox
      display='flex'
      flexDir='column'
      borderRadius='md'
      borderWidth='2px'
      shadow='base'
      bg='cyan.50'
      p='1'
      _hover={{
        outline: '2px solid',
        outlineColor: 'common.main',
      }}
      layout
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      sx={{ '& img': { borderRadius: 'md' } }}
    >
      <Box pos={'relative'} mb='2'>
        <Image
          src={sot.image}
          alt={`Thumbnail of SoT${sot.id}`}
          width='400'
          height='400'
          layout='responsive'
          onLoad={() => setIsLoaded(true)}
        />
        {!isLoaded && <Skeleton pos='absolute' inset='0' />}
      </Box>

      <Flex flexDir='column' flex='1'>
        <NLink href={`sots/${sot.id}`} passHref>
          <LinkOverlay mb='2'>
            <Box
              as='strong'
              display='block'
              color='common.main'
              fontFamily='sans-serif'
              fontWeight='bold'
              fontSize={{ base: 'md', md: 'lg' }}
            >
              {sot.name}
            </Box>
          </LinkOverlay>
        </NLink>
        <Box
          mt='auto'
          as='small'
          display={{ base: 'none', sm: 'block' }}
          color='blue.400'
          fontFamily={'mono'}
        >{`SoT ${sot.id}`}</Box>
        <Box as='small' display={{ base: 'none', sm: 'block' }} color='blue' mb='2'>
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
      </Flex>
      <Flex fontWeight={'bold'} sx={{ gap: 1 }} fontFamily={'sans-serif'}>
        <Grid
          textAlign='center'
          placeItems='center'
          borderRadius='md'
          h='8'
          w='8'
          bg={`grades.${sot.grade}`}
          color='white'
          shadow='inner'
          textShadow='-1px -1px 1px rgba(255,255,255,.1), 1px 1px 1px rgba(0,0,0,.5)'
        >
          {sot.grade}
        </Grid>
        <Text
          color={sot.owner ? 'gray.600' : 'common.main'}
          bg={sot.owner ? 'gray.100' : 'common.second'}
          py='1'
          px='2'
          borderRadius={'md'}
          flex='1'
          shadow='inner'
          fontStyle={sot.owner ? 'italic' : 'normal'}
          fontWeight={sot.owner ? 'normal' : 'inherit'}
          fontSize={'md'}
        >
          {sot.owner ? (
            <>
              <Text as='ins' textDecoration='none'>
                {t.hasOwner}{' '}
              </Text>
              <Text as='span' fontSize='sm' display={{ base: 'none', sm: 'inline' }}>
                ($ {sot.price})
              </Text>
            </>
          ) : (
            `${t.currency} ${sot.price.toLocaleString()}`
          )}
        </Text>
      </Flex>
    </MotionLinkBox>
  );
};

const Filters = ({ availableCountries, setCountryFilter, setGradeFilter, content: { filters }, setForSaleFilter }) => {
  return (
    <Flex sx={{ gap: 1 }} p='1' bg={'blue.50'} borderRadius='md'>
      <Select bg='white' w='auto' onChange={(e) => setCountryFilter(e.target.value)} placeholder={filters.country}>
        {availableCountries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </Select>
      <Select bg='white' w='auto' onChange={(e) => setGradeFilter(e.target.value)} placeholder={filters.grade}>
        {['S', 'A', 'B', 'C', 'D'].map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </Select>
      <FormControl
        bg='white'
        display='flex'
        alignItems='center'
        borderWidth='1px'
        borderColor='gray.200'
        borderRadius='md'
        px='2'
        w='auto'
      >
        <FormLabel htmlFor='owner-toogle' m='0'>
          {filters.ownership}
        </FormLabel>
        <Switch id='owner-toogle' onChange={(e) => setForSaleFilter(e.target.checked)} />
      </FormControl>
    </Flex>
  );
};
