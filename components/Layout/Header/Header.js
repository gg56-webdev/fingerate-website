import {
  Box,
  Container,
  Flex,
  useDisclosure,
  LinkOverlay,
  LinkBox,
  Link,
  Select,
  Spinner,
  Button,
  IconButton,
  useOutsideClick,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, CheckCircleIcon, WarningIcon } from '@chakra-ui/icons';
import Image from 'next/image';
import { default as NLink } from 'next/link';

import frLogo from '../../../public/background/fr2.svg';

import en from '../../../locales/en/header.json';
import ko from '../../../locales/ko/header.json';

import { useRouter } from 'next/router';
import Dropdown from './Dropdown';

import { useUserContext } from '../../../context/user';
import { useRef } from 'react';

export default function Header() {
  const ref = useRef();
  useOutsideClick({ ref, handler: () => onClose() });
  const router = useRouter();
  const t = router.locale === 'ko' ? ko : en;

  const { isOpen, onToggle, onClose } = useDisclosure();

  return (
    <Box as='header' pos='fixed' w='full' zIndex='sticky' p='2'>
      <Container
        maxW='container.xl'
        backgroundColor='white'
        borderRadius='md'
        boxShadow='lg'
        p='1'
        border='1px solid'
        borderColor='purple.100'
      >
        <Flex ref={ref} as='nav' align='center' justify='space-between' wrap='wrap'>
          <LinkBox display='flex' alignItems='center' gap='1'>
            <Box fontSize={0} sx={{ '& img': { borderRadius: 'md' } }}>
              <Image src={frLogo} alt='FingeRate logo' width='40' height='40' />
            </Box>
            <NLink href='/' passHref>
              <LinkOverlay
                color='common.main'
                fontSize='2xl'
                fontWeight='bold'
                fontFamily='sans-serif'
                onClick={onClose}
              >
                FingeRate
              </LinkOverlay>
            </NLink>
          </LinkBox>

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
              gap='2'
              px='2'
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
              <ChangeLang router={router} onClose={onClose} />
              <Auth onClose={onClose} t={t.auth} />
            </Flex>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}

const LOCALES = Object.freeze({
  ko: '한국어',
  en: 'English',
});

function ChangeLang({ router, onClose }) {
  const { pathname, query, asPath, locales, locale, push } = router;
  const changeLang = (e) => {
    const locale = e.target.value;
    push({ pathname, query }, asPath, { locale });
    onClose();
  };
  return (
    <Select
      w='auto'
      size='sm'
      borderRadius='md'
      color='common.main'
      onChange={changeLang}
      mr={{ md: '2' }}
      value={locale}
    >
      {locales.map((l) => (
        <option key={l} value={l}>
          {LOCALES[l] || l}
        </option>
      ))}
    </Select>
  );
}

function Auth({ onClose, t }) {
  const { user, loading, error } = useUserContext();
  if (error)
    return (
      <Flex align='center' p='1' color='red' gap='1'>
        Auth error
        <WarningIcon />
      </Flex>
    );
  if (loading) return <Spinner color='common.mainLight' />;
  if (user !== null)
    return (
      <Flex color='common.mainLight' align='center' maxW='15ch' gap='1'>
        <NLink href='/dashboard' passHref>
          <Link onClick={onClose} isTruncated>
            {user.email.split('@')[0]}
          </Link>
        </NLink>
        {user.emailVerified && <CheckCircleIcon />}
      </Flex>
    );
  return (
    <NLink href='/enter' passHref>
      <Link color='common.mainLight' onClick={onClose}>{`${t.login} / ${t.signup}`}</Link>
    </NLink>
  );
}
