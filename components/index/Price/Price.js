import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Container, Heading, Flex, Stack, Text, Grid, Link } from '@chakra-ui/react';

export default function Price({
  text: {
    content: { list, h2, currency, disclaimer },
    title,
  },
}) {
  return (
    <Box bgImage={'/price/metaverse3.webp'} bgSize='cover'>
      <Container maxW={'container.lg'} textAlign='center' py={8} px='2'>
        <Heading as={'h2'} mb='10' color={'common.second'} p='2' bg={'common.main'} borderRadius='md' shadow='md'>
          {h2}
        </Heading>
        <Stack bg='whiteAlpha.800' p='2' borderRadius={'md'}>
          {list.map((row) => (
            <Flex
              key={row.grade}
              flexDirection={{ base: 'column', md: 'row' }}
              borderRadius={'md'}
              bg={`grades.${row.grade.charAt(0)}`}
              shadow='inner'
            >
              <Stack
                spacing={1}
                color='white'
                flexShrink={0}
                flexBasis='125px'
                p='4'
                fontFamily={'sans-serif'}
                textShadow='-1px -1px 1px rgba(255,255,255,.1), 1px 1px 1px rgba(0,0,0,.5)'
              >
                <Box as={'strong'} fontWeight='bold' fontSize={'3xl'}>
                  {row.grade}
                </Box>
                <Box fontSize={'2xl'}>
                  {currency} {row.price}
                </Box>
              </Stack>
              <Grid
                flex='1'
                p='2'
                borderRadius={'md'}
                gridTemplateColumns={{ base: '1fr', md: '1fr 1fr' }}
                gap='2'
                fontWeight={'bold'}
                fontSize={'xl'}
              >
                <Text bg='white' p='2' display={'grid'} placeItems='center' borderRadius='md' shadow={'md'}>
                  {row.description}
                </Text>
                <Text bg='white' p='2' display={'grid'} placeItems='center' borderRadius='md' shadow={'md'}>
                  {row.explanation}
                </Text>
              </Grid>
            </Flex>
          ))}
          <Box
            fontStyle={'italic'}
            fontWeight='bold'
            fontSize='2xl'
            bg='white'
            p='4'
            borderRadius='md'
            shadow='outline'
          >
            {disclaimer}
            <ArrowForwardIcon mx='2' />
            <Link href='mailto:admin@fingerate.world' color={'blue'}>
              admin@fingerate.world
            </Link>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
