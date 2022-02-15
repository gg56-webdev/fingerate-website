import { useRouter } from 'next/router';
import { Header, Footer } from '../index';

const layoutCancel = ['/marketplace', '/map'];

export default function Layout({ children }) {
  const router = useRouter();
  const { pathname } = router;
  return (
    <>
      <Header />
      <main>{children}</main>
      {!layoutCancel.includes(pathname) && <Footer />}
    </>
  );
}
