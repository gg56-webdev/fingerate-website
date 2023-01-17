import { useState } from 'react';
import { Box, Container, Heading, Flex, Button, Grid, Stack } from '@chakra-ui/react';
import { default as NLink } from 'next/link';
import Feed from './Feed/Feed';
import News from './News/News';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import 'swiper/css';

export default function Hero({ text: { content }, news }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <Flex
      as='section'
      h='100vh'
      minH='720px'
      maxH='1080px'
      bgGradient='linear(to-br, common.mainLight, common.second)'
      position='relative'
      flexDir='column'
      _after={{
        content: `""`,
        position: 'absolute',
        background: 'url(https://grainy-gradients.vercel.app/noise.svg)',
        opacity: '0.35',
        inset: '0',
        zIndex: '1',
      }}
    >
      <Container maxW='container.xl' flex='1' position='relative' zIndex='2' pt='65px' pb={{ base: 2, md: 4 }} px='2'>
        <Flex flexDirection={{ base: 'column-reverse', md: 'row' }} h='full' sx={{ gap: 2 }}>
          <Stack
            alignSelf='center'
            textAlign={{ base: 'center', md: 'left' }}
            display='flex'
            flexDirection='column'
            spacing={{ base: 2, md: 4 }}
            flex={{ base: 0, md: 0.5 }}
          >
            <Heading
              as='h1'
              color='text.second'
              fontSize={{ base: '3xl', lg: '5xl' }}
              whiteSpace={{ md: 'pre-wrap' }}
              textShadow='-1px -1px 1px rgba(255,255,255,.1), 1px 1px 1px rgba(0,0,0,.5)'
            >
              {content.h2}
            </Heading>
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
            <Grid gap={{ base: 2, md: 4 }} gridAutoFlow='column'>
              <NLink href={'/sots'} passHref>
                <Button
                  as={'a'}
                  size='md'
                  bg='common.main'
                  color='white'
                  shadow='md'
                  _hover={{ color: 'white', bg: 'common.mainLight' }}
                >
                  {content.btn1}
                </Button>
              </NLink>
              <NLink href={'/enter'} passHref>
                <Button
                  as={'a'}
                  size='md'
                  color='common.main'
                  bg='white'
                  shadow='md'
                  _hover={{ color: 'white', bg: 'common.mainLight' }}
                >
                  {content.btn2}
                </Button>
              </NLink>
            </Grid>
          </Stack>

          <Flex flex='1' flexDirection='column' h='full' sx={{ gap: 2 }}>
            <Box
              title='SoT device'
              as='iframe'
              src={
                process.env.NODE_ENV === 'development'
                  ? ''
                  : 'https://my.spline.design/sotdevicecopy-e1d4a0f1fcf8d3f04e831dc52abcdc42/'
              }
              loading='lazy'
              frameBorder='0'
              w='full'
              flex='1'
              backgroundImage={!loaded && `url('./about/sot_device.png')`}
              backgroundPosition='center'
              backgroundRepeat='no-repeat'
              backgroundSize='auto 90%'
              onLoad={() => setLoaded(true)}
            />
            <Feed feed={content.feed} />
          </Flex>
        </Flex>
      </Container>
      <News news={news} title={content.latestNews} />
    </Flex>
  );
}
