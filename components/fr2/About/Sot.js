import { Box, Container, Grid, Heading, ListItem, OrderedList, Stack, Text, Flex } from '@chakra-ui/layout';
import Image from 'next/image';
import SotImg from '../../../public/about/sot.png';

export default function Sot({ text: { content } }) {
  return (
    <Container maxW='container.xl' pt='80px' pb='8' px='2'>
      <Grid
        gridTemplateAreas={{
          base: `'img' 'heading' 'list'`,
          md: `'img heading' 'list list'`,
          lg: `'img list' 'heading list' `,
        }}
        gridTemplateColumns={{ base: '1fr', md: '1fr .75fr', lg: '.6fr 1fr' }}
        alignItems='center'
        justifyItems='center'
        rowGap={{ base: 4, lg: 0 }}
        columnGap={{ base: 0, lg: 10 }}
        whiteSpace='pre-wrap'
      >
        <Stack gridArea='heading' textAlign='center' bg='white' p='4' shadow='outline' borderRadius='md'>
          <Heading as='h2'>{content.h2}</Heading>
          <Text gridArea='sub' fontSize='xl'>
            {content.p}
          </Text>
        </Stack>
        <Box gridArea='img'>
          <Image src={SotImg} alt='SoT virtual terminal with example of survey on the screen' placeholder='blur' />
        </Box>
        <Stack gridArea='list' spacing='8'>
          <Stack spacing='6' bg='white' p='4' shadow='md' borderRadius='md'>
            <Box fontSize='3xl' as='h3' textAlign='center' fontWeight='bold'>
              {content.how}
            </Box>
            <OrderedList spacing='4' pl='6'>
              {content.ol.map((i, index) => (
                <ListItem key={index} sx={{ '&::marker': { color: 'common.main', fontWeight: 'bold' } }}>
                  {i}
                </ListItem>
              ))}
            </OrderedList>
          </Stack>
          <Stack spacing='6'>
            <Box fontSize='3xl' as='h3' textAlign='center' fontWeight='bold'>
              {content.benefit}
            </Box>
            <Flex justify='center' flexWrap='wrap' sx={{ gap: 2 }} textAlign='center'>
              {content.table.map((item) => (
                <Stack
                  key={item.user}
                  bg='white'
                  borderRadius='md'
                  shadow='md'
                  p='4'
                  borderTop='.75rem solid'
                  borderTopColor={item.color}
                  flexBasis={{ base: '100%', sm: '25ch' }}
                >
                  <Box as='h4' fontSize='2xl' fontWeight='bold' color={item.color}>
                    {item.user}
                  </Box>
                  <Stack>
                    {item.points.map((point) => (
                      <Box key={point}>{point}</Box>
                    ))}
                  </Stack>
                </Stack>
              ))}
            </Flex>
          </Stack>
        </Stack>
      </Grid>
    </Container>
  );
}
