import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Flex,
} from '@chakra-ui/react';
import { Fragment } from 'react';

const gradeColors = {
  S: { r: 80, g: 173, b: 255 },
  A: { r: 213, g: 179, b: 66 },
  B: { r: 178, g: 202, b: 205 },
  C: { r: 213, g: 97, b: 115 },
  D: { r: 186, g: 140, b: 99 },
};

const getRGBcolor = ({ r = 20, g = 20, b = 20 }) => `rgb(${r},${g},${b})`;

export default function Price({
  text: {
    content: { list, h2 },
    title,
  },
}) {
  return (
    <Box>
      <Container maxW={'container.lg'} textAlign='center' py={8}>
        <Heading as={'h2'} mb='10'>
          {h2}
        </Heading>
        <Grid
          gridTemplateColumns={{ base: '1fr' }}
          gap='4'
          fontSize={'x-large'}
          color='common.main'
        >
          {list.map((row) => (
            <GridItem
              key={row}
              as={Flex}
              flexDirection={{ base: 'column', md: 'row' }}
              p='2'
              borderRadius={'md'}
              bg={getRGBcolor(gradeColors[row[2]])}
              sx={{ gap: '0.5rem' }}
            >
              <Box flex={1} p='2' bg='white' borderRadius={'md'}>
                <Box
                  as={'strong'}
                  display='block'
                  color={getRGBcolor(gradeColors[row[2]])}
                  fontSize='xxl'
                >
                  {row[0][0]}
                </Box>
                <Box as={'small'} fontSize='sm'>
                  {row[0][1]}
                </Box>
              </Box>
              <Box
                flex={1}
                display={'grid'}
                placeItems='center'
                p='2'
                borderRadius={'md'}
                bg='white'
                fontSize='xl'
                bg='white'
              >
                {row[1]}
              </Box>
            </GridItem>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
