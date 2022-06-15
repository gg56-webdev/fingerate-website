import { Box, Container, Heading, Spinner, Stack } from '@chakra-ui/react';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import SotsList from '../../components/sots/SotsList';
import { db } from '../../lib/firebase';

const LIMIT = 6 * 5;

export default function Sots() {
  const [sots, setSots] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const q = query(collection(db, 'sots'), limit(LIMIT));
        const { docs } = await getDocs(q);
        const sots = docs.map((doc) => {
          const { name, country, city, grade, image, price, owner } = doc.data();
          return { name, country, city, grade, image, price, id: doc.id, owner };
        });
        setSots(sots);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
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
          <Filters />
          {loading ? <Spinner alignSelf='center' size='lg' color='common.main' /> : <SotsList sots={sots} />}
        </Stack>
      </Container>
    </>
  );
}

function Filters() {
  return <Box>Filter</Box>;
}
