import { Box, Stack, Grid } from '@chakra-ui/react';

export default function Feed({ feed }) {
  return (
    <Box
      alignSelf='center'
      display={{ base: 'none', sm: 'grid' }}
      bg='whiteAlpha.800'
      borderRadius='md'
      gridTemplateColumns='repeat(3, 1fr)'
      textAlign='center'
      w={{ sm: 'full', lg: '80%' }}
      p='2'
    >
      {feed.map((item) => (
        <Stack key={item.item} p='2' alignItems={'center'} flex='1' spacing={1}>
          <Box as='strong' fontFamily='sans-serif' fontSize={{ base: '2xl', md: '3xl' }} color={'common.main'}>
            {item.number}
          </Box>
          <Box as='small' fontSize={{ base: 'md', md: 'xl' }} fontStyle='italic'>
            {item.item}
          </Box>
        </Stack>
      ))}
    </Box>
  );
}
