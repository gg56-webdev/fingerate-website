import Head from 'next/head';
import {
  Hero,
  AboutSot,
  Flowchart,
  Price,
  LearnMore,
  History,
  Roadmap,
} from '../components';
import { useRouter } from 'next/router';

import en from '../locales/en/index.json';
import ko from '../locales/ko/index.json';

export default function Home() {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : ko;

  return (
    <>
      <Head>
        <title>{t.title}</title>
        <meta name='description' content={t.description} />
        <meta name='keywords' content={t.keywords} />
        <meta name='robots' content='index, follow' />
        <meta charSet='utf-8' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Hero text={t.sections.hero} />
      <AboutSot text={t.sections.aboutSot} />
      <Flowchart text={t.sections.flow} />
      <Price text={t.sections.price} />
      <LearnMore text={t.sections.learnMore} />
      <History text={t.sections.history} />
      <Roadmap text={t.sections.roadmap} />
    </>
  );
}
