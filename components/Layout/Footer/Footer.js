import { Container, Box, Text, Stack, Link } from '@chakra-ui/react';
import { default as NLink } from 'next/link';
import Image from 'next/image';
import Contact from '../Contact/Contact';
import gg56logo from '../../../public/footer/gg56.svg';

export default function Footer() {
  return (
    <Box
      as={'footer'}
      bg='white'
      pos={'absolute'}
      bottom='0'
      w={'100%'}
      zIndex='2'
    >
      <Container maxW='container.lg' p='2'>
        <Box
          display={'flex'}
          justifyContent={{ base: 'center', sm: 'space-between' }}
          alignItems={'center'}
          sx={{ gap: '0.5rem' }}
          flexWrap={'wrap-reverse'}
        >
          <Stack direction={'row'} alignItems='center'>
            <Image src={gg56logo} alt='GG56 Logo' width={60} height={60} />
            <Stack spacing={'0'}>
              <Box as={'strong'} color='common.main'>
                GG56 LIMITED
              </Box>
              <Stack as='address' spacing={'0'}>
                <Box as='small'>
                  Contact:{' '}
                  <Link href='mailto:admin@fingerate.world'>
                    admin@fingerate.world
                  </Link>
                </Box>
                <Box as='small'>사업자등록번호 : 351-86-01750</Box>
              </Stack>
            </Stack>
          </Stack>
          <Box color={'blue'}>
            <NLink href={'/terms'}>서비스 이용약관</NLink>
          </Box>
          {/* <Contact /> */}
        </Box>
        <Text fontSize='smaller' textAlign={'center'} mt='2'>
          @ {new Date().getFullYear()} GG56 Ltd. ALL RIGHTS RESERVED.
        </Text>
      </Container>
    </Box>
  );
}
