import { ChakraProvider } from '@chakra-ui/react';
import { theme, koreanTheme } from '../styles/theme';
import { useRouter } from 'next/router';
import Layout from '../components/Layout/Layout';
import UserContextProvider from '../context/User';
import NextNProgress from 'nextjs-progressbar';
import { MetaMaskProvider } from 'metamask-react';

import '../styles/style.css';

import '@fontsource/do-hyeon';
import '@fontsource/gowun-dodum';

function MyApp({ Component, pageProps }) {
  const { locale } = useRouter();
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <ChakraProvider theme={locale === 'ko' ? koreanTheme : theme}>
      <UserContextProvider>
        <MetaMaskProvider>
          <NextNProgress height={5} color='#710193' />
          <Layout>{getLayout(<Component {...pageProps} locale={locale} />)}</Layout>
        </MetaMaskProvider>
      </UserContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
