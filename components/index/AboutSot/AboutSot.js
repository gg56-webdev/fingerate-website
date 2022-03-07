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
} from '@chakra-ui/react';
import Image from 'next/image';

export default function AboutSot({ text: { content } }) {
  return (
    <Box bg='purple.100'>
      <Container maxW={'container.lg'} py='8'>
        <Heading as='h2' textAlign={'center'} mb='10'>
          {content.h2}
        </Heading>
        <Grid
          gridTemplateColumns={{ base: '1fr', md: '1fr 1fr 1fr' }}
          gridTemplateAreas={{
            base: `'img' 'list1' 'list2'`,
            md: `'list1 img list2'`,
          }}
          gap='4'
          bg={'white'}
          p='6'
          borderRadius={'md'}
          alignItems='center'
        >
          <GridItem gridArea={'list1'}>
            <Heading
              textAlign={{ base: 'center', md: 'left' }}
              mb='2'
              fontSize={'xl'}
              as={'h3'}
            >
              {content.list1.h3}
            </Heading>
            <UnorderedList>
              {content.list1.listItems.map((item) => (
                <ListItem listStylePos={'inside'} key={item}>
                  {item}
                </ListItem>
              ))}
            </UnorderedList>
          </GridItem>
          <GridItem gridArea={'img'} justifySelf='center'>
            <Stack textAlign={'center'}>
              <Image
                alt='SoT device'
                src='/about/fr-hand.png'
                width={500}
                height={500}
              />
              <Text
                fontSize={'xl'}
                whiteSpace='pre-wrap'
                fontWeight={'bold'}
                color='common.main'
              >
                {content.imgCaption}
              </Text>
            </Stack>
          </GridItem>
          <GridItem gridArea={'list2'}>
            <Heading
              textAlign={{ base: 'center', md: 'left' }}
              mb='2'
              fontSize={'xl'}
              as={'h3'}
            >
              {content.list2.h3}
            </Heading>
            <UnorderedList display={'flex'} flexWrap='wrap'>
              {content.list2.listItems.map((item) => (
                <ListItem listStylePos={'inside'} key={item} mr='4'>
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
