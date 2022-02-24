import { ArrowRightIcon } from '@chakra-ui/icons';
import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Stack,
  Text,
  Flex,
  transform,
} from '@chakra-ui/react';

export default function Roadmap({ text: { content, title } }) {
  return (
    <Box overflow={'hidden'}>
      <Container maxW={'container.xl'} textAlign='center' py={8} px='1'>
        <Heading as={'h2'} mb='10'>
          {content.h2}
        </Heading>

        <Grid
          gridTemplateColumns={{
            md: `repeat(${content.steps.length}, 1fr)`,
          }}
          gap='2'
          position={'relative'}
          _before={{
            content: `""`,
            position: 'absolute',
            top: { base: '50%', md: '10px' },
            left: { base: '10px', md: '50%' },
            width: { base: '4px', md: '104%' },
            height: { base: '104%', md: '4px' },
            transform: {
              base: 'translate(-50%, -50%)',
              md: 'translate(-50%, -50%)',
            },
            bg: 'common.main',
            borderRadius: '100px',
          }}
        >
          {content.steps.map((step, i) => (
            <GridItem
              as={Flex}
              key={step.title}
              flexDir={{ base: 'row', md: 'column' }}
              alignItems='center'
              sx={{ gap: '0.5rem' }}
            >
              <Box
                w='20px'
                height='20px'
                flexShrink='0'
                bg={'common.main'}
                borderRadius='50%'
              />
              <Box fontSize='xx-large' fontWeight={'bold'} color='common.main'>
                {i + 1}
              </Box>
              <Box borderRadius={'md'} bg='common.second' p={2} flexGrow='1'>
                <Heading as={'h3'} fontSize='xl' color={'common.main'}>
                  {step.title}
                </Heading>
                <Text>{step.p}</Text>
              </Box>
            </GridItem>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
