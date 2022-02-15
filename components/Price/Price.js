import { Box, Container, Grid, GridItem, Heading } from '@chakra-ui/react';
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
      <Container maxW={'container.lg'} textAlign='center'>
        <Heading as={'h2'}>{h2}</Heading>
        <Grid
          gridTemplateColumns={'1fr 1fr'}
          gap='4'
          fontSize={'x-large'}
          color='common.main'
        >
          {list.map((row) => (
            <Fragment key={row}>
              <GridItem
                p='2'
                borderRadius={'md'}
                border='2px solid'
                borderColor={getRGBcolor(gradeColors[row[2]])}
              >
                <Box
                  as={'strong'}
                  display='block'
                  color={getRGBcolor(gradeColors[row[2]])}
                >
                  {row[0][0]}
                </Box>
                <Box as={'small'}>{row[0][1]}</Box>
              </GridItem>
              <GridItem
                display={'grid'}
                placeItems='center'
                p='2'
                borderRadius={'md'}
                border='2px solid'
                borderColor={getRGBcolor(gradeColors[row[2]])}
              >
                {row[1]}
              </GridItem>
            </Fragment>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
