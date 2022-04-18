import { Text, Box, Container, Heading, Flex, Button, Grid, Link } from '@chakra-ui/react';
import { default as NLink } from 'next/link';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import Feed from './Feed/Feed';
import News from './News/News';

import 'swiper/css';
import 'swiper/css/effect-cube';
import { useState } from 'react';

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionButton = motion(Button);

const container = {
  hidden: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: { staggerChildren: 0.3 },
  },
  exit: { opacity: 0, x: 0, y: -100 },
};

const item = {
  hidden: { opacity: 0, x: -100 },
  enter: { opacity: 1, x: 0, transition: { staggerChildren: 0.3 } },
};

const link = 'https://opensea.io/collection/fingeratesot';

export default function Hero({ text: { content }, news }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <Flex
      as='section'
      w='100%'
      h='100vh'
      minH='720px'
      maxH={'1080px'}
      // bgColor='common.main'
      bgGradient='linear(to-br, common.mainLight, common.second)'
      position='relative'
      _after={{
        content: `""`,
        position: 'absolute',
        background: 'url(https://grainy-gradients.vercel.app/noise.svg)',
        opacity: '0.35',
        inset: '0',
        width: '100%',
        height: '100%',
        zIndex: '1',
      }}
      overflowX='hidden'
      flexDir={'column'}
    >
      <Container maxW='container.xl' flexGrow='1' position='relative' zIndex='2'>
        <Flex
          pt={'65px'}
          align='center'
          justify='center'
          flexDirection={{ base: 'column-reverse', md: 'row' }}
          h='100%'
          alignContent='center'
          pb={4}
          sx={{ gap: '0.5rem' }}
        >
          <MotionBox
            textAlign={{ base: 'center', md: 'left' }}
            pr={{ md: 2 }}
            variants={container}
            initial='hidden'
            animate='enter'
            exit='exit'
            display='flex'
            flexDirection='column'
            sx={{ gap: '1rem' }}
            pl={{ md: 3 }}
            flex={{ base: 0, md: '0.6' }}
          >
            <MotionHeading
              variants={item}
              as='h1'
              color='text.second'
              fontSize={['xx-large', 'xx-large', '5xl']}
              whiteSpace={{ md: 'pre-wrap' }}
            >
              {content.h2}
            </MotionHeading>

            <Swiper
              modules={[Autoplay, Pagination]}
              direction={'vertical'}
              pagination={{
                clickable: true,
              }}
              loop={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              speed={500}
              className='swiper-cards'
            >
              {content.features.map((feature) => (
                <SwiperSlide key={feature} className='swiper-cards__slide'>
                  {feature}
                </SwiperSlide>
              ))}
            </Swiper>
            <Flex
              justifyContent={{ base: 'center', md: 'left' }}
              sx={{ gap: '1rem' }}
              textAlign='center'
              flexWrap={'wrap'}
            >
              <NLink href={'/sots'} passHref>
                <Link
                  fontSize={'2xl'}
                  borderRadius='md'
                  bg={'white'}
                  _hover={{
                    bg: 'common.main',
                    color: 'white',
                    borderColor: 'common.main',
                  }}
                  _focus={{
                    bg: 'common.main',
                    color: 'white',
                    borderColor: 'common.main',
                  }}
                  border='1px solid'
                  borderColor={'white'}
                  color='common.main'
                  px='6'
                  py='2'
                  fontWeight={'bold'}
                  flex={1}
                >
                  {content.btn1}
                </Link>
              </NLink>
              <NLink href={'/enter'} passHref>
                <Link
                  fontSize={'2xl'}
                  borderRadius='md'
                  _hover={{ bg: 'common.main', borderColor: 'common.main' }}
                  _focus={{ bg: 'common.main', borderColor: 'common.main' }}
                  border='1px solid'
                  borderColor={'white'}
                  color='white'
                  px='6'
                  py='2'
                  fontWeight={'bold'}
                  flex={1}
                >
                  {content.btn2}
                </Link>
              </NLink>
            </Flex>
          </MotionBox>

          <MotionBox
            flex='1'
            // display={['none', 'none', 'block']}
            variants={container}
            initial='hidden'
            animate='enter'
            pos='relative'
            h='100%'
            w='100%'
            display='flex'
            flexDirection='column'
          >
            <Box
              title='SoT device'
              as='iframe'
              src='https://my.spline.design/sotdevicecopy-e1d4a0f1fcf8d3f04e831dc52abcdc42/'
              frameBorder='0'
              loading='eager'
              w='full'
              h='full'
              backgroundImage={!loaded && `url('./about/sot_device.png')`}
              backgroundPosition='center'
              backgroundRepeat='no-repeat'
              backgroundSize='50%'
              onLoad={() => setLoaded(true)}
            />
            <Feed feed={content.feed} />
          </MotionBox>
        </Flex>
      </Container>
      <News news={news} title={content.latestNews} />
    </Flex>
  );
}
