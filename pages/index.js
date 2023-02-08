import Head from 'next/head';
import { Hero, AboutSot, Flowchart, LearnMore, History, Roadmap } from '../components';
import * as partnerImgs from '../public/partners/exports';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import ko from '../locales/ko/index.json';
import en from '../locales/en/index.json';
import { Box, Container, Flex, Heading, Text } from '@chakra-ui/react';
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
    name: 'Kim & Chang Law Firm (Korea)',
  },
  iff: {
    img: partnerImgs.iff,
    name: 'International Finance Forum (China)',
  },
  uppsala: {
    img: partnerImgs.uppsala,
    name: 'Uppsala Security (Singapore)',
  },
  efkba: {
    img: partnerImgs.efkba,
    name: 'European Federation of Korean Business Association (Spain)',
  },
  gl: {
    img: partnerImgs.gl,
    name: 'Genesis Lab (Singapore, Pakistan)',
  },
  imecc: {
    img: partnerImgs.imecc,
    name: 'Int’l Medical Exchange & Cooperation Committee (China)',
  },
  ybm: {
    img: partnerImgs.ybm,
    name: 'YBM (Korea)',
  },
};

function Partners() {
  return (
    <Box as='section' id='partners' py='16' px='2'>
      <Container maxW='container.lg'>
        <Heading textAlign='center' mb='8'>
          Partners
        </Heading>
        <Flex as='ul' flexWrap='wrap' listStyleType='none' justify='center' gap='4'>
          {Object.entries(partners).map(([key, { img, name }], i) => (
            <Box
              as='li'
              key={i}
              flexBasis={{ base: '150px', md: '220px' }}
              minH={{ base: '150px', md: '220px' }}
              bg='white'
              borderRadius='md'
              shadow='md'
              display='grid'
              placeItems='center'
            >
              <Box
                as='figure'
                display='grid'
                gridTemplate={`'stack'`}
                sx={{ '& > *': { gridArea: 'stack' }, '&:hover figcaption': { opacity: 1 } }}
                placeItems='center'
                h='full'
              >
                <Box p={{ base: 1, md: 4 }}>
                  <Image src={img} alt='' style={{ mixBlendMode: key === 'gl' ? 'difference' : '' }} />
                </Box>
                <Box
                  as='figcaption'
                  opacity='0'
                  bg='common.second'
                  transition='all 0.2s'
                  textAlign='center'
                  fontSize={{ base: 'md', md: 'xl' }}
                  lineHeight={{ md: '1.2' }}
                  fontWeight='bold'
                  pos='relative'
                  p='1'
                  h='full'
                  w='full'
                  display='grid'
                  placeItems='center'
                  color='common.main'
                >
                  {name}
                </Box>
              </Box>
            </Box>
          ))}
        </Flex>
      </Container>
    </Box>
  );
}
