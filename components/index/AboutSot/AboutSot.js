import { Box, Container, Grid, GridItem, Heading, UnorderedList, ListItem, Text, Stack } from '@chakra-ui/react';
import Image from 'next/image';
import img from '../../../public/about/msot.png';

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
          <GridItem order={{ base: 2 }} colSpan='2'>
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
          <GridItem order={{ base: 1 }} h='300' pos='relative'>
            <Image alt='Metaverse SoT Device' src={img} layout='fill' objectFit='contain' />
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}
