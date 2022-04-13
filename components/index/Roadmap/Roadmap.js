import { ArrowRightIcon } from '@chakra-ui/icons';
import { Box, Container, Grid, GridItem, Heading, Stack, Text, Flex, UnorderedList, ListItem } from '@chakra-ui/react';

export default function Roadmap({ text: { content, title } }) {
  return (
    <Box overflow={'hidden'} bg='cyan.100'>
      <Container maxW={'container.xl'} py={8} px='1'>
        <Heading as={'h2'} mb='10' textAlign='center'>
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
            width: { base: '4px', md: '102%' },
            height: { base: '102%', md: '4px' },
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
              <Box w='20px' height='20px' flexShrink='0' bg={'common.main'} borderRadius='50%' />
              <Box
                fontSize='xx-large'
                fontWeight={'bold'}
                color='common.main'
                sx={{
                  writingMode: { base: 'vertical-lr', md: 'horizontal-tb' },
                }}
              >
                {step.year}
              </Box>
              <Stack borderRadius={'md'} bg='white' p={2} flexGrow={{ base: 1, md: 0 }} shadow='md'>
                <Heading
                  as={'h3'}
                  fontSize='xl'
                  color={'common.main'}
                  textAlign='center'
                  bg='common.second'
                  p='2'
                  borderRadius='md'
                >
                  {step.title}
                </Heading>
                <Stack>
                  {step.sections.map((section) => (
                    <Box key={section.title} borderRadius='md' border='1px solid' borderColor='common.main' p='2'>
                      <Heading as='h4' textAlign='center' fontSize='lg'>
                        {section.title}
                      </Heading>
                      <UnorderedList>
                        {section.points.map((point) => (
                          <ListItem key={point} fontSize='md'>
                            {point}
                          </ListItem>
                        ))}
                      </UnorderedList>
                    </Box>
                  ))}
                </Stack>
              </Stack>
            </GridItem>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
