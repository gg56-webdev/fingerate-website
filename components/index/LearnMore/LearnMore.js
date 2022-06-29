import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Box, Container, Heading, Flex, Grid, GridItem, Text, Stack, Link } from '@chakra-ui/react';
import Image from 'next/image';

import { loc1, loc2, loc3, signisImg } from '../../../public/learnMore';

export default function LearnMore({ text: { content } }) {
  const { locations } = content.box2;
  return (
    <Box bg='gray.200'>
      <Container maxW={'container.lg'} py='8' px='2'>
        <Heading as={'h2'} mb='10' textAlign={'center'}>
          {content.h2}
        </Heading>
        <Grid gap='2' gridTemplateColumns={{ base: '1fr', md: '1fr .75fr' }}>
          <Stack bg={'white'} shadow='md' borderRadius='md' p={2} flexDir='column' h={'fit-content'}>
            <Box as={'h3'} fontSize='2xl' fontWeight='bold' textAlign={'center'}>
              {content.box1.title}
            </Box>
            <Stack sx={{ '& img': { borderRadius: 'md' } }}>
              <Image alt='Signis gathering in the FingeRate Metaverse' src={signisImg} placeholder='blur' />
              <Stack
                p={2}
                borderRadius='md'
                whiteSpace='pre-line'
                border={'2px solid'}
                borderColor='purple.200'
                spacing='1'
              >
                <Text>{content.box1.p}</Text>
                <Flex color='blue' sx={{ gap: 4 }}>
                  <Link href='http://swc2022.cafe24.com/' isExternal>
                    SIGNIS 배경 및 목적 <ExternalLinkIcon />
                  </Link>
                  <Link href='https://news.yahoo.com/news/2022-seoul-signis-world-congress-212300440.html' isExternal>
                    Yahoo News <ExternalLinkIcon />
                  </Link>
                </Flex>
              </Stack>
            </Stack>
          </Stack>
          <Stack bg={'white'} shadow='md' borderRadius='md' p={2}>
            <Box as={'h3'} fontSize='2xl' textAlign={'center'} fontWeight='bold'>
              {content.box2.title}
            </Box>
            <Grid
              gridTemplateColumns={{ base: '1fr 1fr' }}
              gap='2'
              sx={{ '& img': { borderRadius: 'md', objectFit: 'cover' } }}
              color='white'
              fontSize='0'
            >
              <GridItem
                colSpan='2'
                pos='relative'
                w='full'
                _after={{
                  content: `'${locations[0]}'`,
                  pos: 'absolute',
                  left: 0,
                  bottom: 0,
                  m: 1,
                  fontSize: 'sm',
                  bg: 'blackAlpha.700',
                  p: 1,
                  borderRadius: 'md',
                }}
              >
                <Image alt={`photo of ${locations[0]}`} src={loc1} placeholder='blur' layout='responsive' />
              </GridItem>
              <GridItem
                pos='relative'
                w='full'
                _after={{
                  content: `'${locations[1]}'`,
                  pos: 'absolute',
                  left: 0,
                  bottom: 0,
                  m: 1,
                  fontSize: 'sm',
                  bg: 'blackAlpha.700',
                  p: 1,
                  borderRadius: 'md',
                }}
              >
                <Image alt={`photo of ${locations[1]}`} src={loc2} placeholder='blur' layout='responsive' />
              </GridItem>
              <GridItem
                pos='relative'
                w='full'
                _after={{
                  content: `'${locations[2]}'`,
                  pos: 'absolute',
                  left: 0,
                  bottom: 0,
                  m: 1,
                  fontSize: 'sm',
                  bg: 'blackAlpha.700',
                  p: 1,
                  borderRadius: 'md',
                }}
              >
                <Image alt={`photo of ${locations[2]}`} src={loc3} placeholder='blur' layout='responsive' />
              </GridItem>
            </Grid>
          </Stack>
        </Grid>
      </Container>
    </Box>
  );
}
