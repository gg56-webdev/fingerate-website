import {
  Container,
  Box,
  Stack,
  Link,
  Divider,
  Flex,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { default as NLink } from 'next/link';
import Image from 'next/image';
import gg56logo from '../../../public/footer/gg56.svg';

export default function Footer() {
  return (
    <Box as={'footer'} bg='white' mt='auto' shadow='inner'>
      <Container maxW='container.xl' p='2'>
        <Flex
          justifyContent={{ base: 'space-between' }}
          alignItems={'center'}
          sx={{ gap: '0.5rem' }}
          flexWrap={'wrap-reverse'}
        >
          <Stack as='address' direction={'row'} alignItems='center'>
            <Box display={{ base: 'none', sm: 'block' }} lineHeight='0'>
              <Image src={gg56logo} alt='GG56 Logo' width={35} height={35} />
            </Box>
            <Accordion allowToggle>
              <AccordionItem border='none' id='0' fontStyle='initial'>
                <AccordionButton p='0' fontFamily='sans-serif' fontWeight='bold'>
                  GG56 LIMITED
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel
                  fontSize='sm'
                  display='grid'
                  p='0'
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
                    <dd>서울 강남구 강남대로 408 4층</dd>
                  </Box>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Stack>
          <Flex color='blue' gap='6' justify='center'>
            <NLink href='/terms' passHref>
              <Link>서비스 이용약관</Link>
            </NLink>
            <NLink href='/privacy' passHref>
              <Link>개인정보처리방침</Link>
            </NLink>
          </Flex>
        </Flex>
        <Divider mt='1' />
        <Box as='small' display='block' fontSize='xs' color='common.main' textAlign='center' mt='1'>
          @{new Date().getFullYear()} GG56 Ltd. ALL RIGHTS RESERVED.
        </Box>
      </Container>
    </Box>
  );
}
