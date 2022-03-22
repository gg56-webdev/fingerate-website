import { Box, Stack } from '@chakra-ui/react';

export default function Feed({ feed }) {
  return (
    <Box>
      <Stack
        bg='whiteAlpha.700'
        borderRadius={'md'}
        direction='row'
        w='80%'
        mx='auto'
        textAlign={'center'}
        shadow='md'
        flexWrap='wrap'
      >
        {feed.map((item) => (
          <Stack
            key={item.item}
            p='2'
            alignItems={'center'}
            flex='1'
            spacing={1}
          >
            <Box
              as='strong'
              fontSize={{ base: 'lg', md: '3xl' }}
              color={'common.main'}
            >
              {item.number}
            </Box>
            <Box
              as='small'
              fontSize={{ base: 'sm', md: 'xl' }}
              fontStyle='italic'
            >
              {item.item}
            </Box>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}
