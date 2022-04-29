import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Container, Heading, Box, Grid, GridItem, Flex } from '@chakra-ui/react';
import Image from 'next/image';
import { img1, img2, img3, img4, img5, img6 } from '../../../public/flowchart/';

export default function Flowchart({
  text: {
    content: { slides, h2 },
  },
}) {
  return (
    <Box id='flowchart'>
      <Container maxW={'1400px'} py='8' px='2' textAlign='center'>
        <Heading as={'h2'} mb='10'>
          {h2}
        </Heading>
        <Grid
          gridTemplateColumns={{
            base: '1fr',
            sm: '1fr auto 1fr',
            md: '1fr auto 1fr auto .75fr',
          }}
          gridTemplateRows={{ md: '1fr auto 1fr' }}
          gridTemplateAreas={{
            base: `'img1' 'arr1' 'img2' 'arr2' 'img3' 'arr3' 'img4' 'arr4' 'img5' 'arr5' 'img6'`,
            sm: `'img1 arr1 img2' '. . arr2' 'img4 arr3 img3' 'arr4 . .' 'img5 arr5 img6'`,
            md: `'img1 arr1 img2 arr2 img3' '. . . . arr3' 'img6 arr5 img5 arr4 img4'`,
          }}
          alignItems={{ sm: 'center' }}
          gap='2'
          fontSize='lg'
          fontWeight='bold'
          color='common.main'
        >
          <GridItem bg={'white'} shadow='md' borderRadius='md' p='2' gridArea='img1'>
            <Box bgColor={'common.second'} p='2' borderRadius='md'>
              {slides[0].title}
            </Box>
            <Image alt='Avatar with SoT device' src={img1} placeholder='blur' />
          </GridItem>
          <GridItem gridArea='arr1'>
            <ArrowForwardIcon transform={{ base: 'rotate(90deg)', sm: 'none' }} boxSize='8' />
          </GridItem>
          <GridItem bg={'white'} shadow='md' borderRadius='md' p='2' gridArea='img2'>
            <Grid gridTemplateColumns={'1fr 1fr'} gap={2}>
              <Box bgColor={'common.second'} p='2' borderRadius='md'>
                {slides[1].title}
              </Box>
              <Box bgColor={'common.second'} p='2' borderRadius='md'>
                {slides[2].title}
              </Box>
              <GridItem colSpan={2}>
                <Image alt='Avatars representing Business Person and GG56' src={img2} placeholder='blur' />
              </GridItem>
            </Grid>
          </GridItem>
          <GridItem gridArea='arr2'>
            <ArrowForwardIcon transform={{ base: 'rotate(90deg)', md: 'none' }} boxSize='8' />
          </GridItem>
          <GridItem bg={'white'} shadow='md' borderRadius='md' p='2' gridArea='img3'>
            <Box bgColor={'common.second'} p='2' borderRadius='md'>
              {slides[3].title}
            </Box>
            <Image alt='Avatar interacting with SoT App and recieving SoM' src={img3} placeholder='blur' />
          </GridItem>
          <GridItem gridArea='arr3'>
            <ArrowForwardIcon
              transform={{
                base: 'rotate(90deg)',
                sm: 'rotate(180deg)',
                md: 'rotate(90deg)',
              }}
              boxSize='8'
            />
          </GridItem>
          <GridItem bg={'white'} shadow='md' borderRadius='md' p='2' gridArea='img4'>
            <Box bgColor={'common.second'} p='2' borderRadius='md'>
              {slides[4].title}
            </Box>
            <Image alt='GG56 Avatar collects and analyzes data' src={img4} placeholder='blur' />
          </GridItem>
          <GridItem gridArea='arr4'>
            <ArrowForwardIcon transform={{ base: 'rotate(90deg)', md: 'rotate(180deg)' }} boxSize='8' />
          </GridItem>
          <GridItem bg={'white'} shadow='md' borderRadius='md' p='2' gridArea='img5'>
            <Grid gridTemplateColumns={'1fr 1fr'} gap={2}>
              <Box bgColor={'common.second'} p={2} borderRadius='md'>
                {slides[5].title}
              </Box>
              <Box bgColor={'common.second'} p={2} borderRadius='md'>
                {slides[6].title}
              </Box>
              <GridItem textAlign={'center'} colSpan={2}>
                <Image alt='Survey requster recieves data, GG56 prepares data for sale' src={img5} placeholder='blur' />
              </GridItem>
            </Grid>
          </GridItem>
          <GridItem gridArea='arr5'>
            <ArrowForwardIcon
              transform={{
                base: 'rotate(90deg)',
                sm: 'none',
                md: 'rotate(180deg)',
              }}
              boxSize='8'
            />
          </GridItem>
          <GridItem bg={'white'} shadow='md' borderRadius='md' p='2' gridArea='img6'>
            <Box bgColor={'common.second'} p={2} borderRadius='md'>
              {slides[7].title}
            </Box>
            <Box as='figure' position={'relative'}>
              <Image alt='All parties recieve benefits from using FingeRate 2.0' src={img6} placeholder='blur' />
              <Flex
                as='figcaption'
                gap='2'
                position={'absolute'}
                bottom='0'
                w='full'
                justify='space-around'
                sx={{ gap: 1 }}
                fontSize='md'
                fontWeight='normal'
                align='flex-end'
                color='gray'
                fontStyle={'italic'}
                pt='0.5'
                bg='whiteAlpha.900'
              >
                {slides[7].avatars.map((avatar) => (
                  <Box key={avatar}>{avatar}</Box>
                ))}
              </Flex>
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}
