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
      <Container maxW={'container.xl'} textAlign={'center'} py='8'>
        <Heading as={'h2'} mb='10'>
          {content.h2}
        </Heading>
        <Grid gap='2' gridTemplateColumns={{ base: '1fr', md: '1.5fr 1fr' }}>
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
            <Grid gridTemplateColumns={'2fr 1fr'} flexGrow='1' gap='2'>
              <GridItem
                as={Text}
                bg='common.second'
                p={2}
                borderRadius='md'
                textAlign={'left'}
              >
                {content.box1.p}
              </GridItem>
              <GridItem
                as={Box}
                fontSize='0'
                borderRadius={'md'}
                overflow='hidden'
              >
                <Image
                  alt='Signis gathering in the FingeRate Metaverse'
                  width={400}
                  height={400}
                  src='/learn more/signis/church.png'
                />
              </GridItem>
            </Grid>
          </Stack>
          <Stack bg={'white'} borderRadius='md' w='100%' p={2} h='fit-content'>
            <Heading as={'h3'} fontSize='lg'>
              {content.box2.title}
            </Heading>
            <Stack>
              <Flex
                sx={{ gap: '1rem' }}
                alignItems={'center'}
                p={2}
                borderRadius={'md'}
                bg='blue.100'
              >
                <Box borderRadius={'md'} bg={'white'} flexGrow={'1'} p={2}>
                  United States, New York, Times Square
                </Box>
                <Box
                  fontSize='0'
                  borderRadius={'md'}
                  overflow='hidden'
                  border={'2px solid'}
                  borderColor='white'
                >
                  <Image
                    alt=''
                    width={200}
                    height={200}
                    src='/learn more/locations/S.png'
                  />
                </Box>
              </Flex>
              <Flex
                sx={{ gap: '1rem' }}
                alignItems={'center'}
                p={2}
                borderRadius={'md'}
                flexDir={'row-reverse'}
                bg='yellow.100'
              >
                <Box borderRadius={'md'} bg={'white'} flexGrow={'1'} p={2}>
                  Germany, Hamburg, Hamburg Townhall
                </Box>
                <Box
                  fontSize='0'
                  borderRadius={'md'}
                  overflow='hidden'
                  border={'2px solid'}
                  borderColor='white'
                >
                  <Image
                    alt=''
                    width={200}
                    height={200}
                    src='/learn more/locations/A.png'
                  />
                </Box>
              </Flex>
              <Flex
                sx={{ gap: '1rem' }}
                alignItems={'center'}
                p={2}
                borderRadius={'md'}
                bg='gray.100'
              >
                <Box borderRadius={'md'} bg={'white'} flexGrow={'1'} p={2}>
                  Japan, Sapporo, Sapporo Odori Park
                </Box>
                <Box
                  fontSize='0'
                  borderRadius={'md'}
                  overflow='hidden'
                  border={'2px solid'}
                  borderColor='white'
                >
                  <Image
                    alt=''
                    width={200}
                    height={200}
                    src='/learn more/locations/B.png'
                  />
                </Box>
              </Flex>
            </Stack>
          </Stack>
        </Grid>
      </Container>
    </Box>
  );
}
