import {
  Container,
  Grid,
  GridItem,
  Heading,
  Stack,
  Box,
  List,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import Image from 'next/image';

export default function Background({
  text: {
    content: { table, h2 },
  },
}) {
  return (
    <Box bg='cyan.100'>
      <Container maxW={'container.xl'} py='8' px={'2'}>
        <Heading as={'h2'} textAlign='center' mb='10'>
          {h2}
        </Heading>
        <Grid
          gridTemplateColumns={{ md: 'calc(124px + 0.5rem ) 1fr' }}
          alignItems='center'
          gap={2}
        >
          <GridItem
            gridColumn={'2 / -1'}
            display='flex'
            textAlign={'center'}
            flexDirection={{ md: 'row' }}
            pr={{ md: 2 }}
          >
            {table.topRow.map((col) => (
              <Stack key={col.text} flex={1} alignItems='center'>
                <Stack direction={'row'}>
                  {col.imgs.map((img) => (
                    <Box
                      key={img}
                      borderRadius='full'
                      bg={'white'}
                      fontSize='0'
                      overflow={'hidden'}
                    >
                      <Image src={img} alt='Logo' width={80} height={80} />
                    </Box>
                  ))}
                </Stack>
                <Box as={'strong'}>{col.text}</Box>
              </Stack>
            ))}
          </GridItem>

          {table.rows.map((row) => (
            <GridItem
              bg={'white'}
              key={row.title}
              gridColumn={'1/ -1'}
              borderLeftRadius={{ md: '200px' }}
              borderRadius='3xl'
              border='4px solid'
              borderColor={`${row.color}.500`}
              display='flex'
              alignItems={{ md: 'center' }}
              p={2}
              sx={{ gap: '0.75rem' }}
              flexDirection={{ base: 'column', md: 'row' }}
            >
              <Box
                flexShrink={0}
                bg={`${row.color}.500`}
                w={{ base: '100%', md: '120px' }}
                height='120px'
                borderRadius={{ base: '2xl', md: 'full' }}
                display={'grid'}
                textAlign='center'
                placeItems={'center'}
                color='white'
                alignSelf={'center'}
                fontWeight='bold'
              >
                {row.title}
              </Box>
              <UnorderedList flex={'1'}>
                {row.list1.map((listItem) => (
                  <ListItem key={listItem}>{listItem}</ListItem>
                ))}
              </UnorderedList>

              <ArrowForwardIcon
                alignSelf={'center'}
                boxSize='6'
                color={'common.main'}
                transform={{ base: 'rotate(90deg)', md: 'none' }}
              />
              <UnorderedList flex={'1'}>
                {row.list2.map((listItem) => (
                  <ListItem key={listItem} color='common.main'>
                    {listItem}
                  </ListItem>
                ))}
              </UnorderedList>
            </GridItem>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
