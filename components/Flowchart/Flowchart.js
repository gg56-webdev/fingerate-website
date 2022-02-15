import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
  Container,
  Heading,
  Box,
  Grid,
  GridItem,
  Popover,
  PopoverTrigger,
  PopoverBody,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  Flex,
} from '@chakra-ui/react';
import Image from 'next/image';

export default function Flowchart({
  text: {
    content: { slides },
    title,
  },
}) {
  return (
    <Box id='flowchart' bg={'white'}>
      <Container maxW={'container.xl'}>
        <Heading as={'h2'} textAlign='center'>
          {title}
        </Heading>
        <Grid
          gridTemplateColumns={'1fr 18px 1fr 18px 0.5fr'}
          gridTemplateRows={'1fr 18px 1fr'}
          gridTemplateAreas={{
            base: `'img1 arr1 img2 arr2 img3' '. . . . arr3' 'img6 arr5 img5 arr4 img4'`,
          }}
          justifyItems='center'
          alignItems={'center'}
          gap='2'
        >
          <GridItem textAlign={'center'} gridArea='img1'>
            <Box>{slides[0].title}</Box>
            <Box>
              <Image src={'/flowchart/1.png'} width={380} height={316} />
            </Box>
          </GridItem>
          <GridItem textAlign={'center'} gridArea='arr1'>
            <ArrowForwardIcon w={6} h={6} color={'common.main'} />
          </GridItem>
          <GridItem textAlign={'center'} gridArea='img2' alignSelf={'start'}>
            <Grid gridTemplateColumns={'1fr 1fr'} gap={2}>
              <GridItem>
                <Box>{slides[1].title}</Box>
              </GridItem>
              <GridItem>
                <Box>{slides[2].title}</Box>
              </GridItem>
              <GridItem textAlign={'center'} colSpan={2}>
                <Image src={'/flowchart/2.png'} width={421} height={273} />
              </GridItem>
            </Grid>
          </GridItem>
          <GridItem textAlign={'center'} gridArea='arr2'>
            <ArrowForwardIcon w={6} h={6} color={'common.main'} />
          </GridItem>
          <GridItem
            as={Flex}
            textAlign={'center'}
            gridArea='img3'
            alignSelf={'start'}
            flexDir={'column'}
            h='100%'
          >
            <Box>{slides[0].title}</Box>

            <Box mt={14}>
              <Image src={'/flowchart/3.png'} width={233} height={233} />
            </Box>
          </GridItem>
          <GridItem textAlign={'center'} gridArea='arr3'>
            <ArrowForwardIcon
              w={6}
              h={6}
              color={'common.main'}
              transform={'rotateZ(90deg)'}
            />
          </GridItem>
          <GridItem alignSelf={'start'} textAlign={'center'} gridArea='img4'>
            <Box>{slides[0].title}</Box>

            <Box>
              <Image src={'/flowchart/4.png'} width={190} height={290} />
            </Box>
          </GridItem>
          <GridItem textAlign={'center'} gridArea='arr4'>
            <ArrowForwardIcon
              w={6}
              h={6}
              color={'common.main'}
              transform={'rotateZ(180deg)'}
            />
          </GridItem>
          <GridItem alignSelf={'start'} textAlign={'center'} gridArea='img5'>
            <Grid gridTemplateColumns={'1fr 1fr'} gap={2}>
              <GridItem>
                <Box>{slides[0].title}</Box>
              </GridItem>
              <GridItem>
                <Box>{slides[0].title}</Box>
              </GridItem>
              <GridItem textAlign={'center'} colSpan={2}>
                <Image src={'/flowchart/5.png'} width={463} height={232} />
              </GridItem>
            </Grid>
          </GridItem>
          <GridItem textAlign={'center'} gridArea='arr5'>
            <ArrowForwardIcon
              w={6}
              h={6}
              color={'common.main'}
              transform={'rotateZ(180deg)'}
            />
          </GridItem>
          <GridItem alignSelf={'start'} textAlign={'center'} gridArea='img6'>
            <Box>{slides[0].title}</Box>

            <Box>
              <Image src={'/flowchart/6.png'} width={642} height={373} />
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}
