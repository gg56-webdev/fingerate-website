import { useRouter } from 'next/router';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Social from './Social/Social';
import { Box } from '@chakra-ui/react';

const footerCancel = ['/marketplace', '/map'];
const socialCancel = ['/map'];

export default function Layout({ children }) {
  const router = useRouter();
  const { pathname } = router;
  return (
    <>
      <Header />
      {!socialCancel.includes(pathname) && <Social />}
      <Box as={'main'} minH='100vh' pb={!footerCancel.includes(pathname) && { base: '240px', sm: '138px' }}>
        {children}
      </Box>
      {!footerCancel.includes(pathname) && <Footer />}
    </>
  );
}
