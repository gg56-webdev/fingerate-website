import { Container, Heading, Box, FormControl, Input, Textarea, Button, Link, Stack } from '@chakra-ui/react';
import { default as NLink } from 'next/link';
import Head from 'next/head';
import { useForm, ValidationError } from '@formspree/react';
import ko from '../../locales/ko/help/email-us.json';

export default function Email() {
  const t = ko;
  const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_FORM);

  if (state.succeeded) {
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
              {t.success.thanks}
            </Box>
            <NLink href={'/'} passHref>
              <Link color={'blue'} w={'fit-content'}>
                {t.success.goMain}
              </Link>
            </NLink>
          </Stack>
        </Container>
      </>
    );
  }
  return (
    <>
      <Head>
        <title>{t.title}</title>
      </Head>
      <Container maxW={'container.sm'} pt={'80px'} pb={'4'}>
        <Heading as={'h1'} textAlign={'center'} mb={'2'}>
          {t.h1}
        </Heading>
        <Box
          as={'form'}
          display={'flex'}
          flexDir={'column'}
          sx={{ gap: '6' }}
          bg={'white'}
          borderRadius={'md'}
          shadow={'md'}
          p={'8'}
          onSubmit={handleSubmit}
        >
          <FormControl isRequired>
            <label htmlFor='email'>{t.email}</label>
            <Input mt={'1'} id={'email'} type={'email'} name={'email'} />
            <ValidationError prefix='Email' field='email' errors={state.errors} />
          </FormControl>
          <FormControl isRequired>
            <label htmlFor='name'>{t.name}</label>
            <Input mt={'1'} id={'name'} type={'text'} name={'name'} />
            <ValidationError prefix='Name' field='name' errors={state.errors} />
          </FormControl>
          <FormControl isRequired>
            <label htmlFor='message'>{t.message}</label>
            <Textarea mt={'1'} id={'message'} resize={'none'} name={'message'} />
            <ValidationError prefix='Message' field='message' errors={state.errors} />
          </FormControl>
          <Button type={'submit'} colorScheme={'purple'} disabled={state.submitting}>
            {t.submit}
          </Button>
        </Box>
      </Container>
    </>
  );
}
