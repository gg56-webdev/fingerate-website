import { Box, Container, Heading, Grid, GridItem } from '@chakra-ui/react';

export default function History({ text: { content } }) {
  return (
    <Box bg='blue.100' overflow={'hidden'}>
      <Container maxW={'container.xl'} textAlign='center' py={8} px='1'>
        <Heading as='h2' mb='10'>
          {content.h2}
        </Heading>
        <Grid
          gridTemplateColumns={{
            md: 'repeat(6,1fr)',
            base: '1fr min-content 1fr',
          }}
          gridTemplateRows={{
            md: '1fr min-content 1fr',
            base: 'repeat(6, 1fr)',
          }}
          gridTemplateAreas={{
            md: `'e1 . e3 . e5 .' 'time time time time time time' '. e2 . e4 . e6'`,
            base: `'e1 time .' '. time e2' 'e3 time .' '. time e4' 'e5 time .' '. time e6'`,
          }}
          gap='2'
        >
          {content.events.map((ev, i) => (
            <GridItem
              key={ev}
              as={Box}
              bg='common.second'
              gridArea={`e${i + 1}`}
              display='grid'
              placeItems={'center'}
              borderRadius={'md'}
              border='2px solid'
              borderColor={'white'}
              color='common.main'
              fontSize={'lg'}
              fontWeight='bold'
              p='2'
              shadow='md'
            >
              {ev}
            </GridItem>
          ))}
          <GridItem
            position={'relative'}
            gridArea={'time'}
            as={Grid}
            gridTemplateColumns={{ md: 'repeat(6, 1fr)', base: '1fr' }}
            gridTemplateRows={{ base: 'repeat(6, 1fr)', md: 'none' }}
            alignItems='center'
            _before={{
              content: `''`,
              position: 'absolute',
              justifySelf: 'center',
              width: { md: '102%', base: '4px' },
              height: { md: '4px', base: '102%' },
              bg: 'common.main',
              zIndex: 1,
              borderRadius: '100px',
            }}
          >
            <GridItem
              zIndex='2'
              bg={'common.main'}
              borderRadius='lg'
              px='2'
              py='1'
              color={'white'}
              justifySelf={'center'}
            >
              2020.12
            </GridItem>
            <GridItem
              zIndex='2'
              bg={'common.main'}
              borderRadius='lg'
              px='2'
              py='1'
              color={'white'}
              justifySelf={'center'}
            >
              2021.06
            </GridItem>
            <GridItem
              zIndex='2'
              bg={'common.main'}
              borderRadius='lg'
              px='2'
              py='1'
              color={'white'}
              justifySelf={'center'}
            >
              2021.10
            </GridItem>
            <GridItem
              zIndex='2'
              bg={'common.main'}
              borderRadius='lg'
              px='2'
              py='1'
              color={'white'}
              justifySelf={'center'}
              gridColumn={{ md: '5' }}
              gridRow={{ base: '5', md: 'auto' }}
            >
              2022.01
            </GridItem>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}
