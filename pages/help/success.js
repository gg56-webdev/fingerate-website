import { Box, Container, Heading, Link, Stack } from '@chakra-ui/react';
import { default as NLink } from 'next/link';
import Head from 'next/head';
import ko from '../../locales/ko/help/success.json';

export default function Success() {
  const t = ko;
  return (
    <>
      <Head>
        <title>{t.title}</title>
      </Head>
      <Container maxW={'container.sm'} pt={'80px'} pb={'8'} h={'full'} display={'grid'} placeItems={'center'}>
        <Stack
          textAlign={'center'}
          bg={'white'}
          borderRadius={'md'}
          px={'8'}
          py={'4'}
          shadow={'md'}
          alignItems={'center'}
        >
          <Box fontSize={'3xl'}>🙏</Box>
          <Box fontWeight={'bold'} fontSize={'xl'}>
            {t.thanks}
          </Box>
          <NLink href={'/'} passHref>
            <Link color={'blue'} w={'fit-content'}>
              {t.goMain}
            </Link>
          </NLink>
        </Stack>
      </Container>
    </>
  );
}
