import {
  Box,
  Container,
  Heading,
  Flex,
  Grid,
  GridItem,
  Text,
  Stack,
} from '@chakra-ui/react';
import Image from 'next/image';

export default function LearnMore({ text: { content } }) {
  return (
    <Box>
      <Container maxW={'container.lg'} textAlign={'center'}>
        <Heading as={'h2'}>{content.h2}</Heading>
        <Flex sx={{ gap: '1rem' }}>
          <Stack
            bg={'white'}
            borderRadius='md'
            w='100%'
            p={2}
            flexDir='column'
            h={'fit-content'}
          >
            <Heading as={'h3'} fontSize='lg'>
              {content.box1.title}
            </Heading>
            <Grid gridTemplateColumns={'2fr 1fr'} flexGrow='1'>
              <GridItem as={Text} bg='common.second' p={2}>
                {content.box1.p}
              </GridItem>
              <GridItem as={Box} alignSelf={'center'}>
                <Image width={150} height={150} src='/about/sot.png' />
              </GridItem>
            </Grid>
          </Stack>
          <Stack bg={'white'} borderRadius='md' w='100%' p={2} h='fit-content'>
            <Heading as={'h3'} fontSize='lg'>
              {content.box2.title}
            </Heading>
            <Stack>
              <Flex p={2} borderRadius={'md'} bg='blue.100'>
                <Box
                  borderRadius={'md'}
                  bg={'white'}
                  display='grid'
                  placeItems='center'
                  flexGrow={'1'}
                >
                  장소 1
                </Box>
                <Image width={150} height={150} src='/about/sot.png' />
              </Flex>
              <Flex
                p={2}
                borderRadius={'md'}
                flexDir={'row-reverse'}
                bg='yellow.100'
              >
                <Box
                  borderRadius={'md'}
                  bg={'white'}
                  display='grid'
                  placeItems='center'
                  flexGrow={'1'}
                >
                  장소 2
                </Box>
                <Image width={150} height={150} src='/about/sot.png' />
              </Flex>
              <Flex p={2} borderRadius={'md'} bg='gray.100'>
                <Box
                  borderRadius={'md'}
                  bg={'white'}
                  display='grid'
                  placeItems='center'
                  flexGrow={'1'}
                >
                  장소 1
                </Box>
                <Image width={150} height={150} src='/about/sot.png' />
              </Flex>
            </Stack>
          </Stack>
        </Flex>
      </Container>
    </Box>
  );
}
