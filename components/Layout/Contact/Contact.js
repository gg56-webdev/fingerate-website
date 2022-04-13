import { Box, Flex, Heading, Container, Stack } from '@chakra-ui/layout';

import Image from 'next/image';
import contact from './contact.json';

export default function Contact({ vertical }) {
  return (
    <Stack as='ul' listStyleType='none' direction={vertical ? 'column' : 'row'} justify='center'>
      {contact.map((item) => (
        <Box
          key={item.n}
          as='li'
          width='40px'
          height='40px'
          transition='0.2s'
          opacity={0.75}
          _hover={{ opacity: '1' }}
          pointerEvents={item.l ? 'auto' : 'none'}
          fontSize={0}
        >
          <a href={item.l || '#'} target='_blank' rel='noopener noreferrer'>
            <Image src={`/social/${item.i}.svg`} width='40' height='40' alt={`${item.n} icon`} />
          </a>
        </Box>
      ))}
    </Stack>
  );
}
