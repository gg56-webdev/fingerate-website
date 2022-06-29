import { Box, Container, Grid, GridItem, Heading, UnorderedList, ListItem, Text, Stack } from '@chakra-ui/react';
import Image from 'next/image';
import handWithPhone from '../../../public/about/fr-hand.png';

export default function AboutSot({ text: { content } }) {
  return (
    <Box bg='purple.100' id='about-sot'>
      <Container maxW={'container.lg'} py='8' px='2'>
        <Heading as='h2' textAlign={'center'} mb='10'>
          {content.h2}
        </Heading>
        <Grid
          gridTemplateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
          gap='4'
          bg={'white'}
          p='6'
          borderRadius={'md'}
          alignItems='center'
          shadow='md'
        >
          <GridItem order={{ base: 2, md: 'initial' }}>
            <Heading textAlign={{ base: 'center', md: 'left' }} mb='2' fontSize={'xl'} as={'h3'}>
              {content.list1.h3}
            </Heading>
            <UnorderedList>
              {content.list1.listItems.map((item) => (
                <ListItem listStylePos={'inside'} key={item} sx={{ '&::marker': { color: 'common.main' } }}>
                  {item}
                </ListItem>
              ))}
            </UnorderedList>
          </GridItem>
          <GridItem order={{ base: 1, md: 'initial' }} justifySelf='center'>
            <Stack textAlign={'center'}>
              <Image alt='Avatar holding phone with SoT App' src={handWithPhone} placeholder='blur' />
              <Text fontSize={'xl'} whiteSpace='pre-wrap' fontWeight={'bold'} color='common.main'>
                {content.imgCaption}
              </Text>
            </Stack>
          </GridItem>
          <GridItem order='3'>
            <Heading textAlign={{ base: 'center', md: 'left' }} mb='2' fontSize={'xl'} as={'h3'}>
              {content.list2.h3}
            </Heading>
            <UnorderedList display={'flex'} flexWrap='wrap'>
              {content.list2.listItems.map((item) => (
                <ListItem listStylePos={'inside'} key={item} mr='4' sx={{ '&::marker': { color: 'common.main' } }}>
                  {item}
                </ListItem>
              ))}
            </UnorderedList>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}
