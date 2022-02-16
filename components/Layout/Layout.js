import { useRouter } from 'next/router';
import { Header, Footer } from '../index';

const footerCancel = ['/marketplace', '/map'];

export default function Layout({ children }) {
  const router = useRouter();
  const { pathname } = router;
  return (
    <>
      <Header />
      <main>{children}</main>
      {!footerCancel.includes(pathname) && <Footer />}
    </>
  );
}
