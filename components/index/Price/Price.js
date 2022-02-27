import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Flex,
} from '@chakra-ui/react';

export default function Price({
  text: {
    content: { list, h2 },
    title,
  },
}) {
  return (
    <Box bgImage={'/price/metaverse3.webp'} bgSize='cover'>
      <Container maxW={'container.lg'} textAlign='center' py={8}>
        <Heading
          as={'h2'}
          mb='10'
          color={'common.second'}
          p='2'
          bg={'common.main'}
          borderRadius='md'
        >
          {h2}
        </Heading>
        <Grid
          gridTemplateColumns={{ base: '1fr' }}
          gap='4'
          fontSize={'x-large'}
          color='common.main'
        >
          {list.map((row) => (
            <GridItem
              key={row}
              as={Flex}
              flexDirection={{ base: 'column', md: 'row' }}
              p='1'
              borderRadius={'md'}
              bg={'white'}
              color='white'
              sx={{ gap: '0.25rem' }}
            >
              <Box flex={1} p='2' borderRadius={'md'} bg={`grades.${row[2]}`}>
                <Box as={'strong'} display='block' fontSize='xxl'>
                  {row[0][0]}
                </Box>
                <Box as={'small'} fontSize='sm'>
                  {row[0][1]}
                </Box>
              </Box>
              <Box
                flex={0.75}
                display={'grid'}
                placeItems='center'
                p='2'
                borderRadius={'md'}
                fontSize='xl'
                bg={`grades.${row[2]}`}
              >
                {row[1]}
              </Box>
            </GridItem>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
