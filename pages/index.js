import Head from 'next/head';
import { Hero, AboutSot, Flowchart, Price, LearnMore, History, Roadmap } from '../components';
import { db } from '../lib/firebaseAdmin';

import ko from '../locales/ko/index.json';

export default function Home({ news }) {
  const t = ko;

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
      <Flowchart text={t.sections.flow} />
      <Price text={t.sections.price} />
      <LearnMore text={t.sections.learnMore} />
      <History text={t.sections.history} />
      <Roadmap text={t.sections.roadmap} />
    </>
  );
}

export async function getStaticProps() {
  const { docs } = await db.collection('news').get();
  const news = docs.map((doc) => {
    const { title, time, link } = doc.data();
    return { title, time: time.toDate().toLocaleDateString('ko-KR', { dateStyle: 'short' }), link };
  });
  return {
    props: { news },
  };
}
