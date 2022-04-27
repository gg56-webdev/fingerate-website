import { ChakraProvider } from '@chakra-ui/react';
import { theme, koreanTheme } from '../styles/theme';
import { useRouter } from 'next/router';
import Layout from '../components/Layout/Layout';
import { UserContext } from '../context/user';
import { useUserData } from '../hooks/useUserData';
import NextNProgress from 'nextjs-progressbar';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import '../styles/style.css';

import '@fontsource/do-hyeon';
import '@fontsource/gowun-dodum';

function MyApp({ Component, pageProps }) {
  const { locale } = useRouter();
  const { user, loading, error, logout } = useUserData();

  return (
    <ChakraProvider theme={locale === 'ko' ? koreanTheme : theme}>
      <UserContext.Provider value={{ user, loading, error, logout }}>
        <NextNProgress height={5} color='#710193' />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserContext.Provider>
    </ChakraProvider>
  );
}

export default MyApp;
