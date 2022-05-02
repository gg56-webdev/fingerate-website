import {
  Box,
  Container,
  Flex,
  Stack,
  useDisclosure,
  Link,
  Select,
  Spinner,
  Spacer,
  Button,
  IconButton,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, ExternalLinkIcon, CheckCircleIcon, WarningIcon } from '@chakra-ui/icons';
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

  const { isOpen, onToggle, onClose } = useDisclosure();

  const changeLang = (e) => {
    const locale = e.target.value;
    router.push({ pathname, query }, asPath, { locale });
    onToggle();
  };

  return (
    <Box as='header' pos='fixed' w='full' color='white' zIndex='sticky' padding='2'>
      <Container
        maxW='container.xl'
        backgroundColor='white'
        borderRadius='md'
        boxShadow='lg'
        p='1'
        border='1px solid'
        borderColor='purple.100'
      >
        <Flex as='nav' align='center' justify='space-between' wrap='wrap'>
          <Flex align='center' sx={{ gap: '0.25rem' }}>
            <Box fontSize={0} borderRadius='md' overflow={'hidden'}>
              <Image src={frLogo} alt='FingeRate logo' width='40' height='40' />
            </Box>
            <NLink href='/' passHref>
              <Link color='common.main' fontSize='2xl' fontWeight='bold' fontFamily={'sans-serif'} onClick={onClose}>
                FingeRate
              </Link>
            </NLink>
          </Flex>

          <IconButton
            aria-label={`${isOpen ? 'close' : 'open'} navbar`}
            display={{ base: 'grid', lg: 'none' }}
            placeItems='center'
            onClick={onToggle}
            color={'common.main'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon boxSize='6' />}
            variant='ghost'
            colorScheme='purple'
          />

          <Box
            display={{
              base: isOpen ? 'block' : 'none',
              lg: 'block',
            }}
            flexBasis={{ base: 'full', lg: 'auto' }}
          >
            <Flex
              align='center'
              direction={{ base: 'column', lg: 'row' }}
              pt={{ base: 4, lg: 0 }}
              pb={{ base: 2, lg: 0 }}
              sx={{ gap: 2 }}
              fontSize='md'
              fontWeight='bold'
            >
              {t.nav.map((item) => {
                if (item.dropdown) return <Dropdown key={item.n} item={item} onClose={onClose} />;
                return (
                  <NLink key={item.n} href={item.l} passHref>
                    <Button
                      as='a'
                      size='sm'
                      colorScheme='purple'
                      bg='common.main'
                      fontSize='inherit'
                      fontWeight='inherit'
                      _hover={{ bg: 'common.second', color: 'common.main', shadow: 'md' }}
                      _active={{ bg: 'common.second', color: 'common.main' }}
                      onClick={onClose}
                    >
                      {item.n}
                    </Button>
                  </NLink>
                );
              })}
              <Spacer />
              <Auth onClick={onClose} t={t} />
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
            </Flex>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}

function Auth({ onClick, t }) {
  const { user, loading, error } = useContext(UserContext);
  if (error)
    return (
      <Flex align='center' p='1' color='red'>
        Auth error
        <WarningIcon ml='1' />
      </Flex>
    );
  if (loading) return <Spinner color='common.mainLight' />;
  if (user !== null)
    return (
      <NLink href='/user' passHref>
        <Link color='common.mainLight' onClick={onClick}>
          {user.email.split('@')[0]}
          {user.emailVerified && <CheckCircleIcon ml='1' />}
        </Link>
      </NLink>
    );
  return (
    <NLink href='/enter' passHref>
      <Link color='common.mainLight' onClick={onClick}>{`${t.login}/${t.signup}`}</Link>
    </NLink>
  );
}
