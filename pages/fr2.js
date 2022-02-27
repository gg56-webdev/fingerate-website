import { Sot, Background } from '../components/fr2';
import { useRouter } from 'next/router';

import en from '../locales/en/fr2.json';
import ko from '../locales/ko/fr2.json';

export default function fr2() {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : ko;
  return (
    <>
      <Sot text={t.sections.sot} />
      <Background text={t.sections.background} />
    </>
  );
}
