import { Box, Stack, Grid } from '@chakra-ui/react';

export default function Feed({ feed }) {
  return (
    <Box
      alignSelf='center'
      display={{ base: 'none', sm: 'grid' }}
      bg='whiteAlpha.600'
      borderRadius='md'
      gridTemplateColumns='repeat(3, 1fr)'
      textAlign='center'
      w={{ sm: '80%' }}
    >
      {feed.map((item) => (
        <Stack key={item.item} p='2' alignItems={'center'} flex='1' spacing={1}>
          <Box as='strong' fontFamily='sans-serif' fontSize={{ base: 'lg', md: '3xl' }} color={'common.main'}>
            {item.number}
          </Box>
          <Box as='small' fontSize={{ base: 'sm', md: 'xl' }} fontStyle='italic'>
            {item.item}
          </Box>
        </Stack>
      ))}
    </Box>
  );
}
