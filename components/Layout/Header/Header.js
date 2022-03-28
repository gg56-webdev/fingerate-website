import { Box, Container, Flex, Stack, useDisclosure, Link, Select, Spinner, Spacer } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, ExternalLinkIcon, CheckCircleIcon } from '@chakra-ui/icons';
import Image from 'next/image';
import { default as NLink } from 'next/link';

import frLogo from '../../../public/background/fr2.svg';

// import nav from './nav.json';
import en from '../../../locales/en/header.json';
import ko from '../../../locales/ko/header.json';

import { useRouter } from 'next/router';
import Dropdown from './Dropdown';

import { useContext } from 'react';
import { UserContext } from '../../../context/user';

export default function Header() {
  const router = useRouter();
  const { locale, pathname, asPath, query } = router;
  const t = locale === 'en' ? en : ko;

  const { isOpen, onToggle } = useDisclosure();

  const changeLang = (e) => {
    const locale = e.target.value;
    router.push({ pathname, query }, asPath, { locale });
    onToggle();
  };

  const { user, loading, error } = useContext(UserContext);

  return (
    <Box as='header' pos='fixed' w='100%' color='text.second' zIndex='sticky' padding={2}>
      <Container
        maxW='container.xl'
        backgroundColor='white'
        borderRadius={6}
        boxShadow={'lg'}
        p={1}
        border={'1px solid'}
        borderColor={'gray.300'}>
        <Flex as='nav' align='center' justify='space-between' wrap='wrap'>
          <Flex as='a' href='/' align='center' sx={{ gap: '0.25rem' }}>
            <Box fontSize={0} borderRadius='md' overflow={'hidden'}>
              <Image src={frLogo} alt='FingeRate logo' width='40' height='40' />
            </Box>
            <Box color='common.main' fontSize='2xl' fontWeight='bold' fontFamily={'sans-serif'}>
              FingeRate
            </Box>
          </Flex>

          <Box display={{ base: 'block', lg: 'none' }} onClick={onToggle} color={'common.main'} mr={2}>
            {isOpen ? <CloseIcon /> : <HamburgerIcon boxSize='6' />}
          </Box>
          <Box
            display={{
              base: isOpen ? 'block' : 'none',
              lg: 'block',
            }}
            flexBasis={{ base: '100%', lg: 'auto' }}
            // pb={[4, 4, 0, 0]}
          >
            <Stack
              spacing={3}
              align='center'
              justify={['center', 'space-evenly', 'flex-end', 'flex-end']}
              direction={['column', 'column', 'column', 'row']}
              pt={[4, 4, 0, 0]}
              // bgColor={['common.main', 'common.main', 'transparent']}
            >
              {t.nav.map((item) => {
                if (item.dropdown)
                  return (
                    <Box key={item.n}>
                      <Dropdown item={item} onToggle={onToggle} />
                    </Box>
                  );
                if (item.l)
                  return (
                    <NLink key={item.n} href={item.l} passHref>
                      <Link
                        onClick={onToggle}
                        border={item.important && '1px solid'}
                        borderColor={item.important && 'common.main'}
                        fontWeight={item.important && 'bold'}
                        bg={item.important && 'common.main'}
                        color={item.important ? 'white' : 'common.main'}
                        px='2'
                        borderRadius='md'
                        _hover={{
                          bg: 'common.second',
                          color: 'common.main',
                          boxShadow: 'md',
                        }}
                        isExternal={item.external}>
                        {item.n}
                        {item.external && <ExternalLinkIcon mx='2px' />}
                      </Link>
                    </NLink>
                  );
              })}
              <Spacer />
              <Box color={'common.main'} onClick={onToggle}>
                {error ? (
                  error
                ) : loading ? (
                  <Spinner />
                ) : user ? (
                  <Stack direction={'row'} alignItems='center' spacing={'1'}>
                    <NLink href={'/user'}>{user.email.split('@')[0]}</NLink>
                    {user.emailVerified && <CheckCircleIcon />}
                  </Stack>
                ) : (
                  <NLink href='/enter'>로그인/가입하기</NLink>
                )}
              </Box>
              <Spacer />

              {/* <Select
                w={'fit-content'}
                size='sm'
                variant='outline'
                color='common.main'
                bgColor='white'
                onChange={changeLang}
                defaultValue={locale}
                border='1px solid'
                borderColor='common.main'
              >
                <option value='en'>English</option>
                <option value='ko'>한국어</option>
              </Select> */}
            </Stack>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}
