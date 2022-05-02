import { Box, Container, Grid, GridItem, Heading, Stack, Text, Flex, UnorderedList, ListItem } from '@chakra-ui/react';

export default function Roadmap({ text: { content, title } }) {
  return (
    <Box overflow={'hidden'} bg='cyan.100'>
      <Container maxW={'container.xl'} py={8} px='2'>
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
            bg: 'common.mainLight',
            borderRadius: '100px',
            opacity: 0.5,
            zIndex: 1,
          }}
        >
          {content.steps.map((step, i) => (
            <Stack
              key={step.title}
              flexDir={{ base: 'row', md: 'column' }}
              _before={{
                content: `''`,
                w: '20px',
                height: '20px',
                flexShrink: '0',
                bg: 'common.main',
                borderRadius: 'full',
                outline: '0.25rem solid',
                outlineColor: 'cyan.100',
                zIndex: 2,
                alignSelf: 'center',
              }}
            >
              <Box
                as='time'
                dateTime={step.year}
                fontSize='xx-large'
                fontWeight={'bold'}
                fontFamily='sans-serif'
                color='common.main'
                sx={{
                  writingMode: { base: 'vertical-lr', md: 'horizontal-tb' },
                }}
                alignSelf='center'
              >
                {step.year}
              </Box>
              <Stack borderRadius={'md'} bg='white' p='2' flexGrow={{ base: 1, md: 0 }} shadow='md'>
                <Box
                  as={'h3'}
                  fontSize='xl'
                  color={'common.main'}
                  textAlign='center'
                  fontWeight='bold'
                  bg='common.second'
                  p='2'
                  borderRadius='md'
                  shadow='inner'
                >
                  {step.title}
                </Box>
                <Stack>
                  {step.sections.map((section) => (
                    <Box key={section.title} borderRadius='md' border='2px solid' borderColor='purple.200' p='2'>
                      <Box as='h4' textAlign='center' fontSize='lg' fontWeight='bold'>
                        {section.title}
                      </Box>
                      <UnorderedList
                        display='flex'
                        flexDir={{ md: 'column' }}
                        flexWrap='wrap'
                        sx={{ columnGap: 8 }}
                        mt='1'
                      >
                        {section.points.map((point) => (
                          <ListItem key={point} fontSize='md' sx={{ '&::marker': { color: 'common.main' } }}>
                            {point}
                          </ListItem>
                        ))}
                      </UnorderedList>
                    </Box>
                  ))}
                </Stack>
              </Stack>
            </Stack>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
