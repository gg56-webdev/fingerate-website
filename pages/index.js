import Head from 'next/head';
import {
  Hero,
  AboutSot,
  Flowchart,
  Price,
  LearnMore,
  History,
  Roadmap,
  About,
  // Feed,
  Contact,
  Social,
  Promo,
} from '../components';
import { useRouter } from 'next/router';

import getSoTData from '../utils/getSoTData';

import en from '../locales/en/index.json';
import ko from '../locales/ko/index.json';

export default function Home({ sots }) {
  const filteredSots = sots
    .filter((sot) => sot.grade === 'S' || sot.grade === 'A')
    .sort((a, b) => {
      if (a.grade > b.grade) {
        return -1;
      }
    });
  filteredSots.length = 15;

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
      <AboutSot text={t.sections.sot} />
      <Flowchart text={t.sections.flow} />
      <Price text={t.sections.price} />
      <LearnMore text={t.sections.learnMore} />
      <History text={t.sections.history} />
      <Roadmap text={t.sections.roadmap} />
      {/* <Promo text={t.sections.promo} sots={filteredSots} /> */}
      <About text={t.sections.about} />
      {/* <Feed text={t.sections.feed} /> */}
      {/* <Social text={t.sections.social} /> */}
      <Contact text={t.sections.contact} />

      {/* <Drift
        appId={process.env.NEXT_PUBLIC_DRIFT_APP_ID}
        style={{ bottom: '0', right: '0' }}
      /> */}
    </>
  );
}

export async function getStaticProps() {
  const sots = await getSoTData();
  return { props: { sots } };
}
