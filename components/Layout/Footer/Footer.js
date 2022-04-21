import { Container, Box, Text, Stack, Link, Divider, Flex } from '@chakra-ui/react';
import { default as NLink } from 'next/link';
import Image from 'next/image';
import gg56logo from '../../../public/footer/gg56.svg';

export default function Footer() {
  return (
    <Box as={'footer'} bg='white' marginBlockStart='auto'>
      <Container maxW='container.lg' p='2'>
        <Box
          display={'flex'}
          justifyContent={{ base: 'center', sm: 'space-between' }}
          alignItems={'center'}
          sx={{ gap: '0.5rem' }}
          flexWrap={'wrap-reverse'}
        >
          <Stack direction={'row'} alignItems='center'>
            <Box display={{ base: 'none', sm: 'block' }}>
              <Image src={gg56logo} alt='GG56 Logo' width={60} height={60} />
            </Box>
            <Stack spacing={'0'}>
              <Box as={'strong'} color='common.main'>
                GG56 LIMITED
              </Box>
              <Flex as='address' flexDirection='row' sx={{ gap: '0.5rem' }}>
                <Stack spacing={'0'}>
                  <Box as='small'>
                    Contact: <Link href='mailto:admin@fingerate.world'>admin@fingerate.world</Link>
                  </Box>
                  <Box as='small'>사업자등록번호 : 351-86-01750</Box>
                  <Box as='small'>상호명:주식회사 지지56코리아</Box>
                </Stack>

                <Stack spacing='0'>
                  <Box as='small'>대표자:김영군</Box>
                  <Box as='small'>사업자주소:서울특별시 강남구 테헤란로 437</Box>
                  <Box as='small'>
                    연락처: <Link href='tel:025566780'>02-556-6780</Link>
                  </Box>
                </Stack>
              </Flex>
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
