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
      <Container maxW='container.xl' flex='1' position='relative' zIndex='2' pt='65px' pb={{ base: 2, md: 4 }}>
        <Flex align='center' flexDirection={{ base: 'column-reverse', md: 'row' }} h='full' sx={{ gap: 2 }}>
          <Stack
            textAlign={{ base: 'center', md: 'left' }}
            display='flex'
            flexDirection='column'
            spacing={{ base: 2, md: 4 }}
            flex={{ base: 0, md: 0.5 }}
          >
            <Heading
              as='h1'
              color='text.second'
              fontSize={['xx-large', 'xx-large', '5xl']}
              whiteSpace={{ md: 'pre-wrap' }}
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
            <Grid gap={{ base: 2, md: 4 }} textAlign='center' gridAutoFlow='column'>
              <NLink href={'/sots'} passHref>
                <Button as={'a'} colorScheme='purple' size='lg' fontSize='2xl' bg='common.main'>
                  {content.btn1}
                </Button>
              </NLink>
              <NLink href={'/enter'} passHref>
                <Button as={'a'} variant='outline' colorScheme='gray' size='lg' fontSize='2xl' color='common.main'>
                  {content.btn2}
                </Button>
              </NLink>
            </Grid>
          </Stack>

          <Stack flex='1' h='full' w='full' spacing='0'>
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
          </Stack>
        </Flex>
      </Container>
      <News news={news} title={content.latestNews} />
    </Flex>
  );
}
