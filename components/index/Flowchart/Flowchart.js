import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
  Container,
  Heading,
  Box,
  Grid,
  GridItem,
  Flex,
} from '@chakra-ui/react';
import Image from 'next/image';

export default function Flowchart({
  text: {
    content: { slides, h2 },
  },
}) {
  return (
    <Box id='flowchart'>
      <Container maxW={'container.xl'} py='8' px='1'>
        <Heading as={'h2'} textAlign='center' mb='10'>
          {h2}
        </Heading>
        <Grid
          gridTemplateColumns={{
            base: '1fr',
            sm: '1fr 18px 1fr',
            md: '1fr 18px 1fr 18px 0.75fr',
          }}
          gridTemplateRows={{ md: '1fr 18px 1fr' }}
          gridTemplateAreas={{
            base: `'img1' 'arr1' 'img2' 'arr2' 'img3' 'arr3' 'img4' 'arr4' 'img5' 'arr5' 'img6'`,
            sm: `'img1 arr1 img2' '. . arr2' 'img4 arr3 img3' 'arr4 . .' 'img5 arr5 img6'`,
            md: `'img1 arr1 img2 arr2 img3' '. . . . arr3' 'img6 arr5 img5 arr4 img4'`,
          }}
          alignItems={{ sm: 'center', md: 'center' }}
          gap='4'
        >
          <GridItem
            bg={'white'}
            borderRadius='md'
            p='2'
            textAlign={'center'}
            gridArea='img1'
          >
            <Box
              fontSize={{ base: 'md' }}
              fontWeight='bold'
              bgColor={'common.second'}
              p={2}
              borderRadius='md'
              color={'common.main'}
            >
              {slides[0].title}
            </Box>
            <Box>
              <Image
                alt='Avatar with SoT device'
                src={'/flowchart/1.png'}
                width={480}
                height={370}
              />
            </Box>
          </GridItem>
          <GridItem textAlign={'center'} gridArea='arr1'>
            <ArrowForwardIcon
              transform={{ base: 'rotate(90deg)', sm: 'none' }}
              w={6}
              h={6}
              color={'common.main'}
            />
          </GridItem>
          <GridItem
            bg={'white'}
            borderRadius='md'
            p='2'
            textAlign={'center'}
            gridArea='img2'
          >
            <Grid gridTemplateColumns={'1fr 1fr'} gap={2}>
              <GridItem>
                <Box
                  fontSize={{ base: 'md' }}
                  fontWeight='bold'
                  bgColor={'common.second'}
                  p={2}
                  borderRadius='md'
                  color={'common.main'}
                >
                  {slides[1].title}
                </Box>
              </GridItem>
              <GridItem>
                <Box
                  fontSize={{ base: 'md' }}
                  fontWeight='bold'
                  bgColor={'common.second'}
                  p={2}
                  borderRadius='md'
                  color={'common.main'}
                >
                  {slides[2].title}
                </Box>
              </GridItem>
              <GridItem textAlign={'center'} colSpan={2}>
                <Image
                  alt='Avatars representing Business Person and GG56'
                  src={'/flowchart/2.png'}
                  width={480}
                  height={370}
                />
              </GridItem>
            </Grid>
          </GridItem>
          <GridItem textAlign={'center'} gridArea='arr2'>
            <ArrowForwardIcon
              transform={{ base: 'rotate(90deg)', md: 'none' }}
              w={6}
              h={6}
              color={'common.main'}
            />
          </GridItem>
          <GridItem
            bg={'white'}
            borderRadius='md'
            p='2'
            as={Flex}
            textAlign={'center'}
            gridArea='img3'
            flexDir={'column'}
          >
            <Box
              fontSize={{ base: 'md' }}
              fontWeight='bold'
              bgColor={'common.second'}
              p={2}
              borderRadius='md'
              color={'common.main'}
            >
              {slides[3].title}
            </Box>

            <Box>
              <Image
                alt='Avatar interacting with SoT App and recieving SoM'
                src={'/flowchart/3.png'}
                width={360}
                height={370}
              />
            </Box>
          </GridItem>
          <GridItem textAlign={'center'} gridArea='arr3'>
            <ArrowForwardIcon
              transform={{
                base: 'rotate(90deg)',
                sm: 'rotate(180deg)',
                md: 'rotate(90deg)',
              }}
              w={6}
              h={6}
              color={'common.main'}
            />
          </GridItem>
          <GridItem
            bg={'white'}
            borderRadius='md'
            p='2'
            textAlign={'center'}
            gridArea='img4'
          >
            <Box
              fontSize={{ base: 'md' }}
              fontWeight='bold'
              bgColor={'common.second'}
              p={2}
              borderRadius='md'
              color={'common.main'}
            >
              {slides[4].title}
            </Box>

            <Box>
              <Image
                alt='GG56 Avatar collects and analyzes data'
                src={'/flowchart/4.png'}
                width={360}
                height={370}
              />
            </Box>
          </GridItem>
          <GridItem textAlign={'center'} gridArea='arr4'>
            <ArrowForwardIcon
              transform={{ base: 'rotate(90deg)', md: 'rotate(180deg)' }}
              w={6}
              h={6}
              color={'common.main'}
            />
          </GridItem>
          <GridItem
            bg={'white'}
            borderRadius='md'
            p='2'
            textAlign={'center'}
            gridArea='img5'
          >
            <Grid gridTemplateColumns={'1fr 1fr'} gap={2}>
              <GridItem>
                <Box
                  fontSize={{ base: 'md' }}
                  fontWeight='bold'
                  bgColor={'common.second'}
                  p={2}
                  borderRadius='md'
                  color={'common.main'}
                >
                  {slides[5].title}
                </Box>
              </GridItem>
              <GridItem>
                <Box
                  fontSize={{ base: 'md' }}
                  fontWeight='bold'
                  bgColor={'common.second'}
                  p={2}
                  borderRadius='md'
                  color={'common.main'}
                >
                  {slides[6].title}
                </Box>
              </GridItem>
              <GridItem textAlign={'center'} colSpan={2}>
                <Image
                  alt='Survey requster recieves data, GG56 prepares data for sale'
                  src={'/flowchart/5.png'}
                  width={480}
                  height={370}
                />
              </GridItem>
            </Grid>
          </GridItem>
          <GridItem textAlign={'center'} gridArea='arr5'>
            <ArrowForwardIcon
              transform={{
                base: 'rotate(90deg)',
                sm: 'none',
                md: 'rotate(180deg)',
              }}
              w={6}
              h={6}
              color={'common.main'}
            />
          </GridItem>
          <GridItem
            bg={'white'}
            borderRadius='md'
            p='2'
            textAlign={'center'}
            gridArea='img6'
          >
            <Box
              fontSize={{ base: 'md' }}
              fontWeight='bold'
              bgColor={'common.second'}
              p={2}
              borderRadius='md'
              color={'common.main'}
            >
              {slides[7].title}
            </Box>

            <Box position={'relative'}>
              <Image
                alt='All parties recieve benefits from using FingeRate 2.0'
                src={'/flowchart/6.png'}
                width={480}
                height={370}
              />
              <Grid
                gridTemplateColumns={`repeat(${slides[7].avatars.length}, 1fr)`}
                gap='2'
                position={'absolute'}
                bottom='0'
                w={'100%'}
              >
                {slides[7].avatars.map((avatar) => (
                  <GridItem key={avatar} fontSize='md' fontStyle={'italic'}>
                    {avatar}
                  </GridItem>
                ))}
              </Grid>
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}
