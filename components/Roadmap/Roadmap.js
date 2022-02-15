import { ArrowRightIcon } from '@chakra-ui/icons';
import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Stack,
  Text,
  transform,
} from '@chakra-ui/react';

export default function Roadmap({ text: { content, title } }) {
  return (
    <Box>
      <Container maxW={'container.lg'} textAlign='center'>
        <Heading as={'h2'}>{content.h2}</Heading>
        <Stack direction={'column'}>
          <Grid
            gridTemplateColumns={`repeat(${content.steps.length}, 1fr)`}
            justifyItems='center'
            gap={2}
          >
            {content.steps.map((step, i) => (
              <Box
                key={i}
                fontSize='xx-large'
                fontWeight={'bold'}
                color='common.main'
              >
                {i + 1}
              </Box>
            ))}
          </Grid>
          <Box
            w='100%'
            height={'3px'}
            bg='common.main'
            position={'relative'}
            borderRadius='50px'
          >
            <ArrowRightIcon
              position={'absolute'}
              top='50%'
              right={0}
              transform='translateY(-50%)'
              color={'common.main'}
            />
          </Box>
          <Grid
            gridTemplateColumns={`repeat(${content.steps.length}, 1fr)`}
            justifyItems='center'
            // px={2}
            gap={2}
          >
            {content.steps.map((step) => (
              <GridItem
                borderRadius={'md'}
                key={step.title}
                bg='common.second'
                p={2}
                position='relative'
                _before={{
                  content: `''`,
                  w: '20px',
                  h: '20px',
                  borderRadius: '50%',
                  bg: 'common.main',
                  position: 'absolute',
                  top: '-20px',
                  right: '50%',
                  transform: 'translateX(50%)',
                }}
              >
                <Heading as={'h3'} fontSize='lg'>
                  {step.title}
                </Heading>
                <Text>{step.p}</Text>
              </GridItem>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}
