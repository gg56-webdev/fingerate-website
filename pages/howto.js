import Head from 'next/head';
import { Box, Container, Heading, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';

import ko from '../locales/ko/howto.json';

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
          isFitted
          isLazy
          colorScheme={'purple'}
          bg='white'
          variant='solid-rounded'
          onChange={() => window.scrollTo(0, 0)}
          borderRadius={'md'}
          p='2'>
          <TabList position={'sticky'} top='80px' p={'2'} bg='white' shadow={'md'} borderRadius={'full'} mx={'auto'}>
            <Tab>with Card</Tab>
            <Tab>with Crypto</Tab>
          </TabList>

          <TabPanels p='2'>
            <TabPanel>
              <Card text={t.card} />
            </TabPanel>
            <TabPanel>
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
    <>
      {text.steps.map((step) => (
        <div>{step}</div>
      ))}
    </>
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
  return <div>{ethProvider ? 'hello' : 'false'}</div>;
}
