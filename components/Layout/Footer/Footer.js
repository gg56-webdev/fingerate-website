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
import Image from 'next/image';
import gg56logo from '../../../public/footer/gg56.svg';

import en from '../../../locales/en/footer.json';
import ko from '../../../locales/ko/footer.json';
import { useRouter } from 'next/router';

export default function Footer() {
  const { locale } = useRouter();

  const t = locale === 'ko' ? ko : en;

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
                    <dt>{t.companyInfo.company.term}</dt>
                    <dd>{t.companyInfo.company.description}</dd>
                  </Box>
                  <Box display='inline-flex' flexWrap={{ base: 'wrap', md: 'nowrap' }}>
                    <dt>{t.companyInfo.contact.term}</dt>
                    <dd>
                      <Link color='blue' href='tel:025566780'>
                        02-556-6780
                      </Link>
                    </dd>
                  </Box>
                  <Box display='inline-flex' flexWrap={{ base: 'wrap', md: 'nowrap' }}>
                    <dt>{t.companyInfo.businessNumber.term}</dt>
                    <dd>351-86-01750</dd>
                  </Box>
                  <Box display='inline-flex' flexWrap={{ base: 'wrap', md: 'nowrap' }}>
                    <dt>{t.companyInfo.email.term}</dt>
                    <dd>
                      <Link color='blue' href='mailto:admin@fingerate.world'>
                        admin@fingerate.world
                      </Link>
                    </dd>
                  </Box>

                  <Box display='inline-flex' flexWrap={{ base: 'wrap', md: 'nowrap' }}>
                    <dt>{t.companyInfo.ceo.term}</dt>
                    <dd>{t.companyInfo.ceo.description}</dd>
                  </Box>

                  <Box display='inline-flex' flexWrap={{ base: 'wrap', md: 'nowrap' }}>
                    <dt>{t.companyInfo.address.term}</dt>
                    <dd>{t.companyInfo.address.description}</dd>
                  </Box>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Stack>
          <Flex color='blue' gap='6' justify='center'>
            <Link href={t.links.terms.link}>{t.links.terms.name}</Link>
            <Link href={t.links.privacy.link}>{t.links.privacy.name}</Link>
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
