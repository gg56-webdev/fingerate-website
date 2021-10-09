import { ChakraProvider } from '@chakra-ui/react';
import { theme, koreanTheme } from '../styles/theme';
import { useRouter } from 'next/router';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import '../styles/style.css';

import '@fontsource/do-hyeon';
import '@fontsource/gowun-dodum';

function MyApp({ Component, pageProps }) {
    const router = useRouter();
    const { locale } = router;
    const currentTheme = locale === 'ko' ? koreanTheme : theme;
    return (
        <ChakraProvider theme={currentTheme}>
            <Component {...pageProps} />
        </ChakraProvider>
    );
}

export default MyApp;
