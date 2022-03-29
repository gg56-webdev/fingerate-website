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
} from '@chakra-ui/react';
import { db } from '../../lib/firebase';
import { getDocs, collection, where, query, limit, startAfter, orderBy, documentId } from 'firebase/firestore';
import Image from 'next/image';
import Head from 'next/head';

import ko from '../../locales/ko/sots.json';
import en from '../../locales/en/sots.json';

import { useRouter } from 'next/router';
import { useState } from 'react';
import { ArrowDownIcon, ArrowUpIcon, RepeatIcon } from '@chakra-ui/icons';
import { motion, AnimatePresence } from 'framer-motion';

const MotionGrid = motion(Grid);
const MotionStack = motion(Stack);

export default function Sots({ sots }) {
  const [filteredSots, setFilteredSots] = useState(sots);
  const [grade, setGrade] = useState(null);
  const [country, setCountry] = useState(null);
  const [ownership, setOwnership] = useState(false);
  const [sort, setSort] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [isCollectionEnd, setIsCollectionEnd] = useState(false);

  const getMore = async () => {
    setIsLoading(true);
    const { id: lastId } = filteredSots[filteredSots.length - 1];
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
      <Container maxW={'1400px'} pt='70px' px='1' pb='8'>
        <Stack p={'2'} bg='white' borderRadius={'md'}>
          <Heading as='h1' textAlign='center'>
            SoTs
          </Heading>
          <Box overflowX={'auto'} position='sticky' top={'65px'} zIndex={'2'}>
            <Stack direction={'row'} color='common.main' p={2} borderRadius='md' bg='blue.100' w={'max-content'}>
              <Box bg='white' borderRadius={'md'}>
                <Input
                  list='countries'
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder={t.filters.country}
                  value={country || ''}
                  h='full'
                />

                <datalist id='countries'>
                  {availableCountries.map((c, i) => (
                    <option value={c} key={c + i} />
                  ))}
                </datalist>
              </Box>
              <Box bg='white' borderRadius={'md'}>
                <Select
                  variant='outline'
                  onChange={(e) => setGrade(e.target.value)}
                  placeholder={t.filters.grade}
                  value={grade || ''}>
                  {['S', 'A', 'B', 'C', 'D'].map((val) => (
                    <option value={val} key={val}>
                      {val}
                    </option>
                  ))}
                </Select>
              </Box>
              {!grade && (
                <Flex bg='white' flexDirection={'row'} alignItems='center' borderRadius={'md'} px={1}>
                  <Button
                    fontSize={'md'}
                    fontWeight='normal'
                    colorScheme={sort ? 'blue' : 'gray'}
                    variant={sort ? 'solid' : 'ghost'}
                    size={'sm'}
                    onClick={() => (sort === 'desc' ? setSort('asc') : setSort('desc'))}
                    rightIcon={sort && (sort === 'desc' ? <ArrowDownIcon /> : <ArrowUpIcon />)}>
                    {t.filters.price}
                  </Button>
                </Flex>
              )}
              <Flex bg='white' borderRadius={'md'} alignItems='center' px='1'>
                <Switch
                  id='ownership-switch'
                  fontSize={'md'}
                  isChecked={ownership}
                  onChange={() => setOwnership(!ownership)}
                  mr='1'
                />
                <FormLabel htmlFor='ownership-switch' m='0'>
                  {t.filters.ownership}
                </FormLabel>
              </Flex>
              <Button
                alignSelf={'center'}
                colorScheme={'gray'}
                onClick={() => {
                  setCountry(null);
                  setGrade(null);
                  setOwnership(false);
                  setSort('');
                }}>
                <RepeatIcon />
              </Button>
            </Stack>
          </Box>
          <MotionGrid gap='2' gridTemplateColumns={'repeat(auto-fill, minmax(200px, 1fr))'} layout>
            <AnimatePresence>
              {filteredSots
                .filter((sot) => (grade ? sot.grade.toLowerCase() === grade.toLowerCase() : true))
                .filter((sot) => (country ? sot.country.toLowerCase() === country.toLowerCase() : true))
                .filter((sot) => (ownership ? !sot.owner : true))
                .sort((a, b) => (sort === 'desc' ? b.price - a.price : sort === 'asc' ? a.price - b.price : 0))
                .map((sot) => (
                  <MotionStack
                    key={sot.id}
                    shadow='md'
                    borderRadius={'md'}
                    bg='cyan.50'
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
                    border='1px solid'
                    borderColor={'blue.100'}
                    layout
                    animate={{ opacity: 1 }}
                    initial={{ opacity: 0 }}
                    exit={{ opacity: 0 }}>
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
                      <Stack spacing={1}>
                        <Box as={'strong'} color='common.main' fontFamily={'sans-serif'} fontSize='100%'>
                          {sot.name}
                        </Box>
                        <Box as={'small'} color='blue.400' fontFamily={'mono'}>{`SoT ${sot.id}`}</Box>
                      </Stack>
                      <Box as={'small'} color='blue'>
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
                    </Stack>
                    <Flex
                      textAlign={'center'}
                      fontWeight={'bold'}
                      bg={sot.owner ? 'gray.100' : 'common.second'}
                      p='1'
                      borderRadius={'md'}
                      alignItems='center'
                      sx={{ gap: '0.5rem' }}>
                      <Box
                        bg={'white'}
                        borderRadius='md'
                        p='2'
                        fontFamily={'sans-serif'}
                        border='2px solid'
                        borderColor={`grades.${sot.grade}`}>
                        {sot.grade}
                      </Box>
                      <Text as={'span'} color={'common.main'}>
                        {sot.owner ? (
                          <>
                            판매 완료{' '}
                            <Text as={'span'} fontSize='sm' fontStyle={'italic'}>
                              ($ {sot.price})
                            </Text>
                          </>
                        ) : (
                          `$ ${sot.price.toLocaleString()}`
                        )}
                      </Text>
                    </Flex>
                  </MotionStack>
                ))}
            </AnimatePresence>
          </MotionGrid>
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

const LIMIT = 6 * 5;

export async function getServerSideProps() {
  const colRef = collection(db, 'sots');

  const cq = query(
    colRef,
    //  where('owner', '==', '')
    limit(LIMIT)
  );
  const snap = await getDocs(cq);

  const sots = snap.docs.map((doc) => {
    const { name, country, city, grade, image, price, owner } = doc.data();
    return { name, country, city, grade, image, price, id: doc.id, owner };
  });

  return {
    props: { sots },
    // revalidate: 60 * 30,
  };
}
