import { Container, Box, Text, Stack, Link, Divider, Flex, Grid } from '@chakra-ui/react';
import { default as NLink } from 'next/link';
import Image from 'next/image';
import gg56logo from '../../../public/footer/gg56.svg';

export default function Footer() {
  return (
    <Box as={'footer'} bg='white' marginBlockStart='auto' shadow='inner'>
      <Container maxW='container.xl' p='2'>
        <Flex
          justifyContent={{ base: 'center', sm: 'space-between' }}
          alignItems={'center'}
          sx={{ gap: '0.5rem' }}
          flexWrap={'wrap-reverse'}
        >
          <Stack as='address' direction={'row'} alignItems='center'>
            <Box display={{ base: 'none', sm: 'block' }} fontSize='0'>
              <Image src={gg56logo} alt='GG56 Logo' width={70} height={70} />
            </Box>
            <Stack spacing={'0'} fontSize='sm' flex='1' fontStyle='initial'>
              <Box as={'strong'} color='common.main' fontFamily='sans-serif' fontSize='lg'>
                GG56 LIMITED
              </Box>
              <Grid
                as='dl'
                gridTemplateColumns='auto auto'
                columnGap='2'
                rowGap={{ base: 2, md: 0 }}
                alignItems='start'
                sx={{
                  '& dt': { color: 'gray.400', mr: 1 },
                  '& dt::after': { content: `':'` },
                }}
              >
                <Box display='inline-flex' flexWrap={{ base: 'wrap', md: 'nowrap' }}>
                  <dt>상호명</dt>
                  <dd>주식회사 지지56코리아</dd>
                </Box>
                <Box display='inline-flex' flexWrap={{ base: 'wrap', md: 'nowrap' }}>
                  <dt>연락처</dt>
                  <dd>
                    <Link color='blue' href='tel:025566780'>
                      02-556-6780
                    </Link>
                  </dd>
                </Box>
                <Box display='inline-flex' flexWrap={{ base: 'wrap', md: 'nowrap' }}>
                  <dt>사업자등록번호</dt>
                  <dd>351-86-01750</dd>
                </Box>
                <Box display='inline-flex' flexWrap={{ base: 'wrap', md: 'nowrap' }}>
                  <dt>Contact</dt>
                  <dd>
                    <Link color='blue' href='mailto:admin@fingerate.world'>
                      admin@fingerate.world
                    </Link>
                  </dd>
                </Box>

                <Box display='inline-flex' flexWrap={{ base: 'wrap', md: 'nowrap' }}>
                  <dt>대표자</dt>
                  <dd>김영군</dd>
                </Box>

                <Box display='inline-flex' flexWrap={{ base: 'wrap', md: 'nowrap' }}>
                  <dt>사업자주소</dt>
                  <dd>서울특별시 강남구 테헤란로 437</dd>
                </Box>
              </Grid>
            </Stack>
          </Stack>
          <Flex as='nav' color={'blue'}>
            <NLink href={'/terms'} passHref>
              <Link>서비스 이용약관</Link>
            </NLink>
          </Flex>
        </Flex>
        <Divider mt='1' />
        <Box as={'small'} display='block' fontSize='xs' color='common.main' textAlign={'center'} mt='1'>
          @{new Date().getFullYear()} GG56 Ltd. ALL RIGHTS RESERVED.
        </Box>
      </Container>
    </Box>
  );
}
