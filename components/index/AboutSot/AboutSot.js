import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  UnorderedList,
  ListItem,
  Text,
  Stack,
  OrderedList,
} from '@chakra-ui/react';
import Image from 'next/image';
import sotImg from '../../../public/about/msot.png';

export default function AboutSot({ text: { content } }) {
  return (
    <Box as='section' bg='purple.100' id='about-sot'>
      <Container maxW='container.xl' py='8' px='2'>
        <Heading as='h2' textAlign={'center'} mb='10'>
          {content.h2}
        </Heading>
        <Grid
          gridTemplateAreas={{
            base: `'img' 'info' 'list'`,
            md: `'img info' 'list list'`,
            lg: `'img list' 'info list' `,
          }}
          gridTemplateColumns={{ base: '1fr', md: '1fr .75fr', lg: '.6fr 1fr' }}
          rowGap={{ base: 4, lg: 0 }}
          columnGap={{ base: 0, lg: 10 }}
          alignItems='center'
        >
          <Box gridArea='info' p='4' borderRadius='md' bg='white' textAlign='center' shadow='outline'>
            <Heading as='h3' mb='4'>
              {content.h3}
            </Heading>
            <Text>{content.p}</Text>
          </Box>
          <Box gridArea='img' pos='relative' h='300'>
            <Image src={sotImg} alt='Metaverse SoT Device' layout='fill' objectFit='contain' />
          </Box>
          <Box gridArea='list' bg='white' borderRadius='md' shadow='md' p='4'>
            <Heading as='h3' textAlign='center' mb='4'>
              {content.listHeading}
            </Heading>
            <OrderedList>
              {content.ol.map((li, i) => (
                <ListItem key={i} sx={{ '&::marker': { color: 'common.main', fontWeight: 'bold' } }}>
                  {li}
                </ListItem>
              ))}
            </OrderedList>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}
