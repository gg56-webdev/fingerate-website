import { Container, Box, Text } from '@chakra-ui/react';
import Contact from '../Contact/Contact';

export default function Footer() {
  return (
    <Box as={'footer'} bg='blue.100'>
      <Container
        maxW='container.xl'
        display={'flex'}
        justifyContent='space-between'
        alignItems={'center'}
        p='2'
      >
        <Text textAlign='center' fontSize='smaller'>
          @ {new Date().getFullYear()} GG56 Ltd. ALL RIGHTS RESERVED.
        </Text>
        <Contact />
      </Container>
    </Box>
  );
}
