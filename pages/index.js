import Head from 'next/head';
import { Hero, AboutSot, Flowchart, LearnMore, History, Roadmap } from '../components';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import ko from '../locales/ko/index.json';
import en from '../locales/en/index.json';

export default function Home({ news, locale }) {
  const t = locale === 'ko' ? ko : en;

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

      <Hero text={t.sections.hero} news={news} />
      <AboutSot text={t.sections.aboutSot} />
      {/* <Flowchart text={t.sections.flow} /> */}
      <LearnMore text={t.sections.learnMore} />
      {/* <History text={t.sections.history} /> */}
      {/* <Roadmap text={t.sections.roadmap} /> */}
    </>
  );
}

export async function getStaticProps() {
  const { db } = await import('../lib/firebaseAdmin');
  const { docs } = await db.collection('news').get();
  const news = docs.map((doc) => {
    const { title, time, link } = doc.data();
    return { title, time: time.toDate().toLocaleDateString('ko-KR', { dateStyle: 'short' }), link };
  });
  return {
    props: { news },
  };
}
