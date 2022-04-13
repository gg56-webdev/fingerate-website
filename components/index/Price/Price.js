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
      <Container maxW={'container.lg'} textAlign='center' py={8}>
        <Heading as={'h2'} mb='10' color={'common.second'} p='2' bg={'common.main'} borderRadius='md'>
          {h2}
        </Heading>
        <Stack gap='2' bg='whiteAlpha.800' px='2' py='4' borderRadius={'md'}>
          {list.map((row) => (
            <Flex
              key={row.grade}
              flexDirection={{ base: 'column', md: 'row' }}
              borderRadius={'md'}
              bg={`grades.${row.grade.charAt(0)}`}
              w={{ base: '100%' }}
              sx={{
                boxShadow: 'inset 0px 0px 20px 3px rgb(255 255 255 / 25%)',
              }}
            >
              <Stack
                spacing={1}
                color='white'
                flexShrink={0}
                flexBasis='125px'
                sx={{ aspectRatio: '1/1' }}
                p='2'
                justifyContent='center'
                fontFamily={'sans-serif'}
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
                p={2}
                borderRadius={'md'}
                gridTemplateColumns={{ base: '1fr', md: '1fr 1fr' }}
                gap='2'
                fontWeight={'bold'}
              >
                <Text
                  fontSize={'xl'}
                  bg='white'
                  p='2'
                  display={'grid'}
                  placeItems='center'
                  borderRadius='md'
                  shadow={'md'}
                >
                  {row.description}
                </Text>
                <Text
                  fontSize={'xl'}
                  bg='white'
                  p='2'
                  display={'grid'}
                  placeItems='center'
                  borderRadius='md'
                  shadow={'md'}
                >
                  {row.explanation}
                </Text>
              </Grid>
            </Flex>
          ))}
          <Box fontStyle={'italic'} fontWeight='bold' fontSize='2xl' bg='white' p='4' borderRadius='md' shadow='lg'>
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
