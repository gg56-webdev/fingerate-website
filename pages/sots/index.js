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
} from '@chakra-ui/react';
import { db } from '../../lib/firebase';
import { getDocs, collection, where, query } from 'firebase/firestore';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';

import { useRouter } from 'next/router';
import { useState } from 'react';
import { RepeatIcon } from '@chakra-ui/icons';

export default function Sots({ sots }) {
  const [filteredSots, setFilteredSots] = useState(sots);
  const [grade, setGrade] = useState(null);
  const [country, setCountry] = useState(null);
  const router = useRouter();
  const { locale } = router;

  const availableCountries = [...new Set(sots.map((sot) => sot.country))];

  return (
    <>
      <Head>
        <title>SoTs</title>
      </Head>
      <Container maxW={'1400px'} pt='70px' px='1' pb='8'>
        <Stack p={'2'} bg='white' borderRadius={'md'}>
          <Heading as='h1' textAlign='center'>
            SoTs
          </Heading>
          <Stack
            p={2}
            position='sticky'
            top={'65px'}
            bg='white'
            zIndex={'2'}
            borderRadius='md'
            border={'2px solid'}
            borderColor='blue.100'
            w={'100%'}
            maxW='fit-content'
          >
            <Stack direction={'row'}>
              <Input
                list='countries'
                onChange={(e) => setCountry(e.target.value)}
                placeholder='Country'
                color='common.main'
                border='1px solid'
                borderColor='common.main'
                width={'fit-content'}
                value={country || ''}
              />

              <datalist id='countries'>
                {availableCountries.map((c, i) => (
                  <option value={c} key={c + i} />
                ))}
              </datalist>
              <Select
                width={'fit-content'}
                variant='outline'
                color='common.main'
                onChange={(e) => setGrade(e.target.value)}
                placeholder='Grade'
                border='1px solid'
                borderColor='common.main'
                value={grade || ''}
              >
                <option value='S'>S</option>
                <option value='A'>A</option>
                <option value='B'>B</option>
              </Select>
              <Button
                colorScheme={'gray'}
                onClick={() => {
                  setCountry(null);
                  setGrade(null);
                }}
              >
                <RepeatIcon />
              </Button>
            </Stack>
          </Stack>
          <Grid
            gap='2'
            gridTemplateColumns={'repeat(auto-fill, minmax(200px, 1fr))'}
            px='2'
          >
            {filteredSots
              .filter((sot) =>
                grade ? sot.grade.toLowerCase() === grade.toLowerCase() : true
              )
              .filter((sot) =>
                country
                  ? sot.country.toLowerCase() === country.toLowerCase()
                  : true
              )
              .map((sot) => (
                <Stack
                  key={sot.id}
                  shadow='md'
                  borderRadius={'md'}
                  p='1'
                  onClick={() =>
                    router.push(`/sots/${sot.id}`, `/sots/${sot.id}`, {
                      locale,
                    })
                  }
                  transition='all 0.2s'
                  _hover={{
                    outline: '2px solid',
                    outlineColor: 'common.main',
                    cursor: 'pointer',
                  }}
                >
                  <Box borderRadius={'md'} overflow='hidden'>
                    <Image
                      src={sot.image}
                      alt={`Thumbnail of SoT${sot.id}`}
                      width='400'
                      height='400'
                      layout='responsive'
                    />
                  </Box>
                  <Stack spacing={1} flex='1' justifyContent='space-between'>
                    <Box as={'strong'}>{`SoT ${sot.id} - ${sot.name}`}</Box>
                    <Box as={'small'}>
                      {sot.country}, {sot.city}
                    </Box>
                  </Stack>
                  <Flex
                    textAlign={'center'}
                    fontWeight={'bold'}
                    bg='common.second'
                    p='1'
                    borderRadius={'md'}
                    alignItems='center'
                    sx={{ gap: '0.5rem' }}
                  >
                    <Box bg={'white'} borderRadius='md' p='1'>
                      {sot.grade}
                    </Box>
                    <Text as={'span'} fontWeight='bold' color={'common.main'}>
                      ₩ {sot.price}
                    </Text>
                  </Flex>
                </Stack>
              ))}
          </Grid>
        </Stack>
      </Container>
    </>
  );
}

export async function getStaticProps() {
  const colRef = collection(db, 'sots');
  const cq = query(colRef, where('owner', '==', ''));
  const snap = await getDocs(cq);

  const sots = snap.docs.map((doc) => {
    const { name, country, city, grade, image, price } = doc.data();
    return { name, country, city, grade, image, price, id: doc.id };
  });

  return {
    props: { sots },
    revalidate: 1000 * 60 * 30,
  };
}
