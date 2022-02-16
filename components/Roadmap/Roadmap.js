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

        <Stack
          direction={'row'}
          position='relative'
          _before={{
            content: `""`,
            position: 'absolute',
            top: '51px',
            width: '104%',
            left: '50%',
            transform: 'translateX(-50%)',
            height: '4px',
            bg: 'common.main',
            borderRadius: '100px',
          }}
        >
          {content.steps.map((step, i) => (
            <Stack
              key={step.title}
              position='relative'
              spacing={'8'}
              flex='1'
              direction={'column'}
            >
              <Box
                position={'relative'}
                fontSize='xx-large'
                fontWeight={'bold'}
                color='common.main'
                lineHeight={'normal'}
                _after={{
                  content: `""`,
                  position: 'absolute',
                  transform: 'translate(-50%, 100%)',
                  left: '50%',
                  bottom: '0',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  bg: 'common.main',
                }}
              >
                {i + 1}
              </Box>
              <Box borderRadius={'md'} bg='common.second' p={2} flexGrow='1'>
                <Heading as={'h3'} fontSize='lg'>
                  {step.title}
                </Heading>
                <Text>{step.p}</Text>
              </Box>
            </Stack>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
