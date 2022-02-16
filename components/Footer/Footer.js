import { Container, Box, Text } from '@chakra-ui/react';
import Contact from '../Contact/Contact';

export default function Footer() {
  return (
    <Box as={'footer'} bg='blue.100'>
      <Container
        maxW='container.lg'
        display={'flex'}
        justifyContent={{ base: 'center', sm: 'space-between' }}
        alignItems={'center'}
        sx={{ gap: '0.5rem' }}
        p='2'
        flexWrap={'wrap-reverse'}
      >
        <Text fontSize='smaller'>
          @ {new Date().getFullYear()} GG56 Ltd. ALL RIGHTS RESERVED.
        </Text>
        <Contact />
      </Container>
    </Box>
  );
}
