import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';
import Image from 'next/image';

export default function AboutSot({ text: { content } }) {
  return (
    <Box>
      <Container maxW={'container.lg'}>
        <Heading as='h2' textAlign={'center'}>
          {content.h2}
        </Heading>
        <Grid gridTemplateColumns={'1fr 1fr 1fr'}>
          <GridItem>
            <Heading as={'h3'}>{content.list1.h3}</Heading>
            <UnorderedList>
              {content.list1.listItems.map((item) => (
                <ListItem key={item}>{item}</ListItem>
              ))}
            </UnorderedList>
          </GridItem>
          <GridItem>
            <Box>
              <Image src='/about/sot.png' width={500} height={500} />
            </Box>
          </GridItem>
          <GridItem>
            <Heading as={'h3'}>{content.list2.h3}</Heading>
            <UnorderedList>
              {content.list2.listItems.map((item) => (
                <ListItem key={item}>{item}</ListItem>
              ))}
            </UnorderedList>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}
