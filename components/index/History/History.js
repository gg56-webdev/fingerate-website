import { Box, Container, Heading, Grid, GridItem } from '@chakra-ui/react';
const dates = ['2020.12', '2021.06', '2021.10', '2022.01'];

export default function History({ text: { content } }) {
  return (
    <Box bg='blue.100' overflow={'hidden'}>
      <Container maxW={'container.xl'} textAlign='center' py={8} px='2'>
        <Heading as='h2' mb='10'>
          {content.h2}
        </Heading>
        <Grid
          gridTemplateColumns={{
            md: 'repeat(6,1fr)',
            base: '1fr auto 1fr',
          }}
          gridTemplateRows={{
            md: 'repeat(3, auto)',
            base: 'repeat(6, 1fr)',
          }}
          gridTemplateAreas={{
            md: `'e1 . e3 . e5 .' 'time time time time time time' '. e2 . e4 . e6'`,
            base: `'e1 time .' '. time e2' 'e3 time .' '. time e4' 'e5 time .' '. time e6'`,
          }}
          gap='2'
          fontWeight='bold'
          fontSize={{ base: 'md', md: 'lg' }}
          color='common.main'
        >
          {content.events.map((ev, i) => (
            <GridItem
              key={ev}
              bg='common.second'
              gridArea={`e${i + 1}`}
              alignSelf={{ base: 'center', md: i % 2 === 0 ? 'end' : 'start' }}
              borderRadius={'md'}
              border='2px solid white'
              p='2'
              shadow='md'
            >
              {ev}
            </GridItem>
          ))}
          <Grid
            position={'relative'}
            gridArea={'time'}
            gridTemplateColumns={{ md: 'repeat(6, 1fr)', base: '1fr' }}
            gridTemplateRows={{ base: 'repeat(6, 1fr)', md: 'none' }}
            alignItems='center'
            justifyItems='center'
            isolation='isolate'
            _before={{
              content: `''`,
              position: 'absolute',
              width: { md: '102%', base: '4px' },
              height: { md: '4px', base: '102%' },
              bg: 'common.mainLight',
              zIndex: -1,
              borderRadius: 'full',
              opacity: 0.5,
            }}
          >
            {dates.map((item) => (
              <GridItem
                key={item}
                border='0.25rem solid'
                borderColor='blue.100'
                bg='common.main'
                color='white'
                px='4'
                py='1'
                borderRadius='full'
                fontFamily='sans-serif'
                gridColumn={item === '2022.01' && { base: 'auto', md: 5 }}
                gridRow={item === '2022.01' && { base: 5, md: 'auto' }}
                shadow='inner'
              >
                {item}
              </GridItem>
            ))}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
