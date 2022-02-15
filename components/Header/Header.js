import {
  Box,
  Container,
  Flex,
  Stack,
  useDisclosure,
  Link,
  Select,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import Image from 'next/image';
import { default as NLink } from 'next/link';

// import nav from './nav.json';
import en from '../../locales/en/header.json';
import ko from '../../locales/ko/header.json';

import { useRouter } from 'next/router';
import Dropdown from './Dropdown';

export default function Header() {
  const router = useRouter();
  const { locale, pathname } = router;
  const t = locale === 'en' ? en : ko;

  const { isOpen, onToggle } = useDisclosure();

  const changeLang = (e) => {
    const locale = e.target.value;
    router.push(pathname, pathname, { locale });
    onToggle();
  };

  return (
    <Box
      as='header'
      pos='fixed'
      w='100%'
      color='text.second'
      zIndex='sticky'
      padding={2}
    >
      <Container
        maxW='container.xl'
        backgroundColor='white'
        borderRadius={6}
        boxShadow={'lg'}
        px={1}
        border={'1px solid'}
        borderColor={'gray.300'}
      >
        <Flex as='nav' align='center' justify='space-between' wrap='wrap'>
          <Flex as='a' href='/' align='center'>
            <Image
              src='/logo_1.png'
              alt='FingeRate logo'
              width='50'
              height='50'
            />
            <Box color='common.main' fontSize='2xl' fontWeight='bold'>
              FingeRate
            </Box>
          </Flex>

          <Box
            display={{ base: 'block', lg: 'none' }}
            onClick={onToggle}
            color={'common.main'}
            mr={2}
          >
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
              spacing={2}
              align='center'
              justify={['center', 'space-evenly', 'flex-end', 'flex-end']}
              direction={['column', 'column', 'column', 'row']}
              pt={[4, 4, 0, 0]}
              // bgColor={['common.main', 'common.main', 'transparent']}
            >
              {t.nav.map((item) => {
                if (item.dropdown)
                  return (
                    <Dropdown item={item} key={item.n} onToggle={onToggle} />
                  );
                if (item.l)
                  return (
                    <NLink key={item.n} href={item.l} passHref={item.external}>
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
                        isExternal={item.external}
                      >
                        {item.n}
                        {item.external && <ExternalLinkIcon mx='2px' />}
                      </Link>
                    </NLink>
                  );
              })}

              <Box w='auto' p={1}>
                <Select
                  size='xs'
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
                </Select>
              </Box>
            </Stack>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}
