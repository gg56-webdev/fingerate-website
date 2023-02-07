import Head from 'next/head';
import { Hero, AboutSot, Flowchart, LearnMore, History, Roadmap } from '../components';
import * as partnerImgs from '../public/partners/exports';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import ko from '../locales/ko/index.json';
import en from '../locales/en/index.json';
import { Box, Container, Flex, Heading } from '@chakra-ui/react';
import Image from 'next/image';

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
      <Partners />
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

const partners = {
  kim: {
    img: partnerImgs.kim,
    country: 'Korea',
  },
  iff: {
    img: partnerImgs.iff,
    country: 'China',
  },
  uppsala: {
    img: partnerImgs.uppsala,
    country: 'Singapore',
  },
  efkba: {
    img: partnerImgs.efkba,
    country: 'Spain',
  },
  gl: {
    img: partnerImgs.gl,
    country: 'Singapore, Pakistan',
  },
  imecc: {
    img: partnerImgs.imecc,
    country: 'China',
  },
  ybm: {
    img: partnerImgs.ybm,
    country: 'Korea',
  },
};

function Partners() {
  return (
    <Box as='section' id='partners' bg='white' py='16' px='2'>
      <Container maxW='container.lg'>
        <Heading textAlign='center' mb='8'>
          Partners
        </Heading>
        <Flex as='ul' flexWrap='wrap' listStyleType='none' justify='center' align='center' gap='4'>
          {Object.entries(partners).map(([key, { img, country }], i) => (
            <Box as='li' pos='relative' key={i} flexBasis='200px' flexShrink='0' h={key === 'imecc' ? 150 : 125}>
              <Image
                src={img}
                alt=''
                layout='fill'
                objectFit='contain'
                style={{ mixBlendMode: key === 'gl' ? 'difference' : '' }}
              />
            </Box>
          ))}
        </Flex>
      </Container>
    </Box>
  );
}
