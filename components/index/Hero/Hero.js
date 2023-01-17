import { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Flex,
  Button,
  Grid,
  Stack,
  Link,
  useBreakpointValue,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Icon,
} from '@chakra-ui/react';
import { default as NLink } from 'next/link';
import Feed from './Feed/Feed';
import News from './News/News';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import 'swiper/css';
import { useUserData } from '../../../hooks/useUserData';
import { As, Gps } from '../../../public/download/export';
import Image from 'next/image';
import phone from '../../../public/hero/phone.webp';
import qr from '../../../public/download/download.svg';

export default function Hero({ text: { content }, news }) {
  return (
    <Box
      as='section'
      minH='720px'
      h='100vh'
      maxH='1080px'
      display='grid'
      gap={{ base: 2 }}
      gridTemplateRows='1fr auto'
      bgGradient='linear(to-br, common.mainLight, common.second)'
      pos='relative'
      after={{
        content: `""`,
        position: 'absolute',
        background: 'url(https://grainy-gradients.vercel.app/noise.svg)',
        opacity: '0.35',
        inset: '0',
        zIndex: '1',
      }}
    >
      <Container
        maxW='container.xl'
        display='flex'
        gap={{ base: 2 }}
        flexDir={{ base: 'column-reverse', md: 'row' }}
        position='relative'
        zIndex='2'
        pt='65px'
        px='2'
      >
        <Info content={content} />
        <AppDownload />
      </Container>
      <News news={news} title={content.latestNews} />
    </Box>
  );
}

function Info({ content }) {
  const { user } = useUserData();

  return (
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
        <NLink href={'/map'} passHref>
          <Button
            as='a'
            colorScheme='purple'
            size='md'
            bg='common.main'
            color='white'
            shadow='md'
            _hover={{ color: 'white', bg: 'common.mainLight' }}
          >
            {content.btn1}
          </Button>
        </NLink>
        {!user && (
          <NLink href={'/enter'} passHref>
            <Button
              as='a'
              colorScheme='blue'
              size='md'
              color='common.main'
              bg='white'
              shadow='md'
              _hover={{ color: 'white', bg: 'common.mainLight' }}
            >
              {content.btn2}
            </Button>
          </NLink>
        )}
      </Grid>
    </Stack>
  );
}

const gStore = 'https://play.google.com/store/apps/details?id=com.frs.fingerate';
const aStore = 'https://apps.apple.com/kr/app/fingerate/id6444853546';
const btnStyles = { w: '100%', h: '45px' };

function Download() {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Flex w='fit-content' gap='2'>
      <Link isExternal href={gStore}>
        <Gps {...btnStyles} />
      </Link>
      <Link isExternal href={aStore}>
        <As {...btnStyles} />
      </Link>
      {!isMobile && <QrPopover />}
    </Flex>
  );
}

function QrPopover() {
  return (
    <Popover>
      <PopoverTrigger>
        <Button h='45px' colorScheme='blackAlpha' bg='black' p='2'>
          <Icon viewBox='0 0 512 512' boxSize='8' fill='white'>
            <title>QR Download Link</title>
            <path d='m496 144c-8.837 0-16-7.164-16-16v-82c0-7.72-6.28-14-14-14h-82c-8.837 0-16-7.164-16-16s7.163-16 16-16h82c25.364 0 46 20.636 46 46v82c0 8.836-7.163 16-16 16z' />
            <path d='m16 144c-8.837 0-16-7.164-16-16v-82c0-25.364 20.636-46 46-46h82c8.837 0 16 7.164 16 16s-7.163 16-16 16h-82c-7.72 0-14 6.28-14 14v82c0 8.836-7.163 16-16 16z' />
            <path d='m128 512h-82c-25.364 0-46-20.636-46-46v-82c0-8.836 7.163-16 16-16s16 7.164 16 16v82c0 7.72 6.28 14 14 14h82c8.837 0 16 7.164 16 16s-7.163 16-16 16z' />
            <path d='m466 512h-82c-8.837 0-16-7.164-16-16s7.163-16 16-16h82c7.72 0 14-6.28 14-14v-82c0-8.836 7.163-16 16-16s16 7.164 16 16v82c0 25.364-20.636 46-46 46z' />
            <path d='m194 240h-84c-25.364 0-46-20.636-46-46v-84c0-25.364 20.636-46 46-46h84c25.364 0 46 20.636 46 46v84c0 25.364-20.636 46-46 46zm-84-144c-7.72 0-14 6.28-14 14v84c0 7.72 6.28 14 14 14h84c7.72 0 14-6.28 14-14v-84c0-7.72-6.28-14-14-14z' />
            <path d='m194 448h-84c-25.364 0-46-20.636-46-46v-84c0-25.364 20.636-46 46-46h84c25.364 0 46 20.636 46 46v84c0 25.364-20.636 46-46 46zm-84-144c-7.72 0-14 6.28-14 14v84c0 7.72 6.28 14 14 14h84c7.72 0 14-6.28 14-14v-84c0-7.72-6.28-14-14-14z' />
            <path d='m402 240h-84c-25.364 0-46-20.636-46-46v-84c0-25.364 20.636-46 46-46h84c25.364 0 46 20.636 46 46v84c0 25.364-20.636 46-46 46zm-84-144c-7.72 0-14 6.28-14 14v84c0 7.72 6.28 14 14 14h84c7.72 0 14-6.28 14-14v-84c0-7.72-6.28-14-14-14z' />
            <path d='m422 352h-38v-54c0-14.336-11.663-26-26-26h-60c-14.337 0-26 11.664-26 26v60c0 14.336 11.663 26 26 26h54v38c0 14.336 11.663 26 26 26h44c14.337 0 26-11.664 26-26v-44c0-14.336-11.663-26-26-26zm-118-48h48v48h-48zm112 112h-32v-32h32z' />
            <path d='m160 176h-16c-8.837 0-16-7.164-16-16v-16c0-8.836 7.163-16 16-16h16c8.837 0 16 7.164 16 16v16c0 8.836-7.163 16-16 16z' />
            <path d='m368 176h-16c-8.837 0-16-7.164-16-16v-16c0-8.836 7.163-16 16-16h16c8.837 0 16 7.164 16 16v16c0 8.836-7.163 16-16 16z' />
            <path d='m160 384h-16c-8.837 0-16-7.164-16-16v-16c0-8.836 7.163-16 16-16h16c8.837 0 16 7.164 16 16v16c0 8.836-7.163 16-16 16z' />
          </Icon>
        </Button>
      </PopoverTrigger>
      <PopoverContent pos='relative' zIndex='10' w='fit-content'>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody display='grid' placeItems='center'>
          <Image src={qr} />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

function AppDownload() {
  return (
    <Flex flexDir='column' flex='1' gap='4' my={{ base: 0, md: 10 }} maxH='580px'>
      <Box w='full' flex='1' pos='relative'>
        <Image src={phone} objectFit='contain' layout='fill' />
      </Box>
      <Box alignSelf='center'>
        <Download />
      </Box>
    </Flex>
  );
}
