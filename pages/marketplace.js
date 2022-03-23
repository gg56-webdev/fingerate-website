import { Box } from '@chakra-ui/react';
import Head from 'next/head';

export default function Marketplace() {
  return (
    <>
      <Head>
        <title>NFT Marketplace</title>
      </Head>
      <Box pt={'70px'}>
        <Box
          as='iframe'
          src='https://opensea.io/collection/fingeratesot?embed=true'
          width='100%'
          minH='calc(100vh - 70px)'
          frameBorder='0'
          allowFullScreen
        />
      </Box>
    </>
  );
}
