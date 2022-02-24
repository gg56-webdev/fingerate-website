import {
  Box,
  Container,
  Heading,
  Flex,
  Button,
  Text,
  Grid,
  Stack,
} from '@chakra-ui/react';
import { db } from '../../lib/firebase';
import { getDocs, collection, where, query } from 'firebase/firestore';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';

import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Sots({ sots }) {
  const [filteredSots, setFilteredSots] = useState(sots);
  const [grade, setGrade] = useState(null);
  const [country, setCountry] = useState(null);
  const router = useRouter();
  const { locale } = router;
  return (
    <>
      <Head>
        <title>SoTs</title>
      </Head>
      <Container maxW={'1400px'} pt='70px' px='1'>
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
          >
            <Box>Filter</Box>
          </Stack>
          <Grid
            gap='2'
            gridTemplateColumns={'repeat(auto-fit, minmax(200px, 1fr))'}
            px='2'
          >
            {filteredSots
              .filter((item) =>
                grade
                  ? item.grade.toLocaleLowerCase() === grade.toLocaleLowerCase()
                  : true
              )
              .filter((item) =>
                country
                  ? item.country.toLocaleLowerCase() ===
                    country.toLocaleLowerCase()
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
                  <Stack
                    direction='row'
                    alignItems={'center'}
                    borderRadius={'md'}
                    border={'2px solid'}
                    borderColor='common.second'
                    spacing={'0.5'}
                  >
                    <Box p='1' fontWeight={'bold'}>
                      {sot.grade}
                    </Box>
                    <Box
                      flex={1}
                      py={'1'}
                      px={'4'}
                      bg='common.second'
                      borderRadius={'md'}
                      fontWeight='bold'
                      color={'common.main'}
                    >
                      $ {sot.price}
                    </Box>
                  </Stack>
                  <Box borderRadius={'md'} overflow='hidden'>
                    <Image
                      src={sot.image}
                      alt={`Thumbnail of SoT${sot.id}`}
                      width='400'
                      height='400'
                      layout='responsive'
                    />
                  </Box>
                  <Stack spacing={1}>
                    <Box as={'strong'}>{`SoT ${sot.id} - ${sot.name}`}</Box>
                    <Box as={'small'}>
                      {sot.country}, {sot.city}
                    </Box>
                  </Stack>
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
  const cq = query(
    colRef
    // where('grade', '==', 'A')
  );
  const snap = await getDocs(cq);

  const sots = snap.docs.map((doc) => {
    const { name, country, city, grade, image, price } = doc.data();
    return { name, country, city, grade, image, price, id: doc.id };
  });

  return {
    props: { sots },
  };
}
