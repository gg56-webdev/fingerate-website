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
    <Box bg='gray.200'>
      <Container maxW={'container.xl'} textAlign={'center'} py='8'>
        <Heading as={'h2'} mb='10'>
          {content.h2}
        </Heading>
        <Grid gap='2' gridTemplateColumns={{ base: '1fr', md: '1.25fr 1fr' }}>
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
                />
              </GridItem>
            </Flex>
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
                  춘천 구곡폭포
                </Box>
                <Box
                  fontSize='0'
                  borderRadius={'md'}
                  overflow='hidden'
                  border={'2px solid'}
                  borderColor='white'
                >
                  <Image
                    alt='Thumbnail of SoT Device'
                    width={450}
                    height={316}
                    src='/learnMore/locations/1.png'
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
                  춘천 스카이워크
                </Box>
                <Box
                  fontSize='0'
                  borderRadius={'md'}
                  overflow='hidden'
                  border={'2px solid'}
                  borderColor='white'
                >
                  <Image
                    alt='Thumbnail of SoT Device'
                    width={295}
                    height={391}
                    src='/learnMore/locations/2.jpg'
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
                  YBM 어학원 종로 본사
                </Box>
                <Box
                  fontSize='0'
                  borderRadius={'md'}
                  overflow='hidden'
                  border={'2px solid'}
                  borderColor='white'
                >
                  <Image
                    alt='Thumbnail of SoT Device'
                    width={294}
                    height={391}
                    src='/learnMore/locations/3.jpg'
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
