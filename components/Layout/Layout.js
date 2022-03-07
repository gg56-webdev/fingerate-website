import { useRouter } from 'next/router';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Social from './Social/Social';
import { Box } from '@chakra-ui/react';

const footerCancel = ['/marketplace', '/map'];

export default function Layout({ children }) {
  const router = useRouter();
  const { pathname } = router;
  return (
    <>
      <Header />
      <Social />
      <Box
        as={'main'}
        minH='100vh'
        pb={!footerCancel.includes(pathname) && { base: '165px', sm: '117px' }}
      >
        {children}
      </Box>
      {!footerCancel.includes(pathname) && <Footer />}
    </>
  );
}
