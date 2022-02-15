import { ChakraProvider } from '@chakra-ui/react';
import { theme, koreanTheme } from '../styles/theme';
import { useRouter } from 'next/router';
import { Layout } from '../components';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import '../styles/style.css';

import '@fontsource/do-hyeon';
import '@fontsource/gowun-dodum';

import 'mapbox-gl/dist/mapbox-gl.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const { locale } = router;
  const currentTheme = locale === 'ko' ? koreanTheme : theme;
  return (
    <ChakraProvider theme={currentTheme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
