import Head from 'next/head';
import {
  Box,
  Container,
  Heading,
  Tabs,
  TabList,
  Link,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Flex,
  Grid,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import { default as NLink } from 'next/link';

import ko from '../locales/ko/howto.json';

import Image from 'next/image';
import { card1, card2, card3, card4 } from '../public/howToBuy/card/imgs';

const cardImgs = [card1, card2, card3, card4];

export default function Howto() {
  const t = ko;
  return (
    <>
      <Head>
        <title>{t.title}</title>
      </Head>
      <Container maxW={'container.lg'} pt='70px' pb='4'>
        <Heading as='h1' textAlign={'center'}>
          {t.title}
        </Heading>
        <Tabs
          pt='2'
          shadow={'sm'}
          isFitted
          colorScheme={'purple'}
          bg='white'
          variant='solid-rounded'
          onChange={() => window.scrollTo(0, 0)}
          borderRadius={'md'}>
          <TabList
            border={'1px solid'}
            borderColor='blue.100'
            position={'sticky'}
            top='80px'
            p={'2'}
            bg='white'
            shadow={'md'}
            borderRadius={'full'}
            mx={'2'}
            gap='2'
            zIndex={2}>
            <Tab>with Card</Tab>
            <Tab>with Crypto</Tab>
          </TabList>

          <TabPanels>
            <TabPanel p='0'>
              <Card text={t.card} />
            </TabPanel>
            <TabPanel p='0'>
              <Crypto text={t.crypto} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </>
  );
}

function Card({ text }) {
  return (
    <Flex flexDirection={'column'}>
      {text.steps.map((step, id) => (
        <Flex
          key={step}
          flexDir={{ base: 'column', md: id % 2 === 0 ? 'row-reverse' : 'row' }}
          p='4'
          bg={id % 2 !== 0 && 'blue.50'}
          alignItems='center'>
          <Box width={'100%'}>
            <Image src={cardImgs[id]} alt={step} placeholder='blur' />
          </Box>
          <Text
            width={'100%'}
            p='2'
            fontSize={'3xl'}
            borderRadius='md'
            shadow={'md'}
            bg={id % 2 === 0 ? 'blue.50' : 'white'}
            textAlign={'center'}>
            {step}
          </Text>
        </Flex>
      ))}
      <Grid placeItems='center' p='4'>
        <NLink href={'/sots'} passHref>
          <Link
            _hover={{ textDecor: 'none', bg: 'purple.700' }}
            _focus={{ textDecor: 'none', bg: 'purple.700' }}
            py='2'
            px='4'
            borderRadius={'md'}
            colorScheme='purple'
            bg='common.mainLight'
            color='white'
            fontSize='2xl'
            fontWeight={'bold'}>
            {text.sotsLink}
          </Link>
        </NLink>
      </Grid>
    </Flex>
  );
}

function Crypto() {
  const [ethProvider, setEthProvider] = useState(null);

  const getProvider = async () => {
    const provider = await detectEthereumProvider({ silent: true });
    if (provider) {
      setEthProvider(true);
    } else {
      setEthProvider(false);
    }
  };

  useEffect(() => {
    getProvider();
  }, []);
  return (
    <Text textAlign={'center'} p='4'>
      Coming soon
    </Text>
  );
}
