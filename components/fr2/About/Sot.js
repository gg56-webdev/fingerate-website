import {
  Box,
  Container,
  Grid,
  Heading,
  ListItem,
  OrderedList,
  SimpleGrid,
  Stack,
  Text,
  UnorderedList,
} from '@chakra-ui/layout';
import Card from '../../utils/Card';
import Image from 'next/image';
import SotImg from '../../../public/about/sot.png';
import SlideAnim from '../../utils/SlideAnim';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const boxVariants = {
  hidden: {
    y: 50,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export default function Sot({ text: { content } }) {
  return (
    <Container maxW='container.xl' pt='80px' pb='8'>
      <Grid
        gridTemplateAreas={{
          base: `'img' 'heading' 'list'`,
          lg: `'img list' 'heading list' `,
        }}
        gridTemplateColumns={{ base: '1fr', lg: '2fr 4fr' }}
        justifyItems='center'
        alignItems='center'
        rowGap={{ base: 8, lg: 0 }}
        columnGap='12'
        whiteSpace='pre-wrap'
      >
        <Card gridArea='heading'>
          <Stack spacing='6' textAlign='center'>
            <Heading as='h2'>{content.h2}</Heading>
            <Text gridArea='sub' fontSize='lg'>
              {content.p}
            </Text>
          </Stack>
        </Card>
        <Box gridArea='img'>
          <Image src={SotImg} alt='SoT virtual terminal with example of survey on the screen' placeholder='blur' />
        </Box>
        <Stack spacing='16' gridArea='list'>
          <Card as={Stack} spacing='6'>
            <Heading fontSize='2xl' as='h3' textAlign='center' textDecoration='underline'>
              {content.how}
            </Heading>
            <OrderedList spacing='4' pl='4'>
              {content.ol.map((i, index) => (
                <ListItem key={index}>{i}</ListItem>
              ))}
            </OrderedList>
          </Card>

          <Stack spacing='6'>
            <Heading fontSize='2xl' as='h3' textAlign='center' textDecoration='underline'>
              {content.benefit}
            </Heading>
            <SlideAnim stagger={0.2}>
              <SimpleGrid columns={[1, 1, 3]} spacing={4}>
                {content.table.map((i, index) => (
                  <MotionBox
                    key={index}
                    bgColor='white'
                    // bgGradient={i[3]}
                    // color='white'
                    borderRadius='md'
                    p={2}
                    shadow='md'
                    border='2px'
                    borderColor={i[4]}
                    variants={boxVariants}
                  >
                    <Heading as='h4' fontSize={'2xl'} textAlign='center' mb='4' color={i[4]}>
                      {i[0]}
                    </Heading>
                    <UnorderedList spacing='4' listStyleType='none'>
                      <ListItem>{i[1]}</ListItem>
                      <ListItem>{i[2]}</ListItem>
                    </UnorderedList>
                  </MotionBox>
                ))}
              </SimpleGrid>
            </SlideAnim>
          </Stack>
        </Stack>
      </Grid>
    </Container>
  );
}
