import { useRouter } from 'next/router';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Social from './Social/Social';
import { Box } from '@chakra-ui/react';

const LAYOUT_CONFIG = Object.freeze({
  REMOVE_FOOTER_ON: ['/marketplace', '/map'],
  REMOVE_SOCIAL_ON: ['/map'],
});

export default function Layout({ children }) {
  const { pathname } = useRouter();
  return (
    <>
      <Header />
      {!LAYOUT_CONFIG.REMOVE_SOCIAL_ON.includes(pathname) && <Social />}
      <Box as='main' flex='1'>
        {children}
      </Box>
      {!LAYOUT_CONFIG.REMOVE_FOOTER_ON.includes(pathname) && <Footer />}
    </>
  );
}
