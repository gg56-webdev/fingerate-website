import Head from 'next/head';
import {
  Box,
  Container,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Flex,
  Grid,
  Button,
} from '@chakra-ui/react';
import { default as NLink } from 'next/link';
import { useRouter } from 'next/router';

import ko from '../locales/ko/howto.json';
import en from '../locales/en/howto.json';

import Image from 'next/image';
import { card1, card2, card3, card4 } from '../public/howToBuy/card/imgs';

const cardImgs = [card1, card2, card3, card4];

export default function Howto({ locale }) {
  const t = locale === 'ko' ? ko : en;
  return (
    <>
      <Head>
        <title>{t.title}</title>
      </Head>
      <Container maxW='container.lg' pt='80px' px='2' pb='8'>
        <Heading as='h1' textAlign='center'>
          {t.title}
        </Heading>
        <Tabs isFitted pt='2' shadow='md' colorScheme='purple' bg='white' variant='solid-rounded' borderRadius='md'>
          <TabList p='2' bg='purple.50' shadow='inner' borderRadius='full' mx='2' gap='2'>
            <Tab bg='white' shadow='sm'>
              {t.card.with}
            </Tab>
            <Tab bg='white' shadow='sm'>
              {t.crypto.with}
            </Tab>
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
    <Grid gap='2' py='2'>
      {text.steps.map((step, id) => {
        const isOdd = id % 2 !== 0;
        return (
          <Flex
            key={step}
            flexDir={{ base: 'column', md: isOdd ? 'row' : 'row-reverse' }}
            p='4'
            bg={isOdd && 'purple.50'}
            alignItems='center'
            textAlign='center'
          >
            <Box flex='1' filter='hue-rotate(116deg)'>
              <Image src={cardImgs[id]} alt={step} placeholder='blur' />
            </Box>
            <Text
              flex='1'
              p='2'
              fontSize='2xl'
              borderRadius='md'
              shadow='inner'
              color='purple.900'
              bg={isOdd ? 'white' : 'purple.50'}
            >
              {step}
            </Text>
          </Flex>
        );
      })}
      <NLink href='/sots' passHref>
        <Button as='a' colorScheme='purple' size='lg' w='fit-content' justifySelf='center'>
          {text.sotsLink}
        </Button>
      </NLink>
    </Grid>
  );
}

function Crypto() {
  return (
    <Text textAlign={'center'} p='4'>
      Coming soon
    </Text>
  );
}
