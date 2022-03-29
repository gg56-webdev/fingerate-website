import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
  Box,
  Container,
  Heading,
  Flex,
  Grid,
  GridItem,
  Text,
  Stack,
  Link,
} from '@chakra-ui/react';
import Image from 'next/image';

import loc1 from '../../../public/learnMore/locations/1.png';
import loc2 from '../../../public/learnMore/locations/3.png';
import loc3 from '../../../public/learnMore/locations/5.png';

const imgArr = [loc1, loc2, loc3];

export default function LearnMore({ text: { content } }) {
  return (
    <Box bg='gray.200'>
      <Container maxW={'container.xl'} textAlign={'center'} py='8'>
        <Heading as={'h2'} mb='10'>
          {content.h2}
        </Heading>
        <Grid gap='2' gridTemplateColumns={{ base: '1fr', md: '1fr 0.75fr' }}>
          <Stack
            bg={'white'}
            borderRadius='md'
            w='100%'
            p={2}
            flexDir='column'
            h={'fit-content'}
          >
            <Heading
              as={'h3'}
              fontSize='2xl'
              fontFamily={'Gowun Dodum'}
              fontWeight='bold'
            >
              {content.box1.title}
            </Heading>
            <Flex
              flexDir={{ base: 'column-reverse' }}
              flexGrow='1'
              sx={{ gap: '0.5rem' }}
            >
              <GridItem
                flex={'1'}
                as={Text}
                border='2px solid'
                borderColor='common.second'
                p={2}
                borderRadius='md'
                textAlign={'left'}
                whiteSpace='pre-line'
              >
                {content.box1.p}
                <br />
                <Link
                  color={'blue'}
                  href='https://news.yahoo.com/news/2022-seoul-signis-world-congress-212300440.html'
                  isExternal
                >
                  Yahoo News <ExternalLinkIcon />
                </Link>
              </GridItem>
              <GridItem
                flex={'0.5'}
                as={Box}
                fontSize='0'
                borderRadius={'md'}
                overflow='hidden'
              >
                <Image
                  alt='Signis gathering in the FingeRate Metaverse'
                  src='/learnMore/signis/church-lg.png'
                  width={720}
                  height={405}
                  layout='responsive'
                />
              </GridItem>
            </Flex>
          </Stack>
          <Stack bg={'white'} borderRadius='md' w='100%' p={2} h='fit-content'>
            <Heading
              as={'h3'}
              fontSize='2xl'
              fontFamily={'Gowun Dodum'}
              fontWeight='bold'
            >
              {content.box2.title}
            </Heading>
            <Grid
              gridTemplateColumns={{ base: '1fr 1fr' }}
              justifyItems='center'
              gap='1'
            >
              {content.box2.locations.map((location, _id) => (
                <Box
                  key={location}
                  borderRadius={'lg'}
                  overflow='hidden'
                  border={'2px solid'}
                  borderColor='white'
                  position={'relative'}
                  w='fit-content'
                  fontSize={'0'}
                  // alignSelf={_id % 2 ? 'flex-end' : 'flex-start'}
                  gridColumn={{
                    base: _id === 0 ? 'span 2' : '',
                  }}
                >
                  <Image alt='Photo of SoT device location' src={imgArr[_id]} />
                  <Box
                    borderRadius={'md'}
                    p={2}
                    position='absolute'
                    left={'10px'}
                    bottom={'10px'}
                    fontSize='xl'
                    bg='blackAlpha.700'
                    color={'white'}
                  >
                    {location}
                  </Box>
                </Box>
              ))}
            </Grid>
          </Stack>
        </Grid>
      </Container>
    </Box>
  );
}
