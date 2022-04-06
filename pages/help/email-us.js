import { Container, Heading, Box, FormControl, FormLabel, Input, Textarea, Button } from '@chakra-ui/react';
import Head from 'next/head';
import ko from '../../locales/ko/help/email-us.json';

export default function Email() {
  const t = ko;
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
          name={'contact'}
          method={'POST'}
          data-netlify={true}
          data-netlify-honeypot={'bot-field'}
          action={'/help/success'}
        >
          <input type='hidden' name='form-name' value='contact' />
          <FormControl isRequired>
            <label htmlFor='email'>{t.email}</label>
            <Input mt={'1'} id={'email'} type={'email'} name={'email'} />
          </FormControl>
          <FormControl isRequired>
            <label htmlFor='name'>{t.name}</label>
            <Input mt={'1'} id={'name'} type={'text'} name={'name'} />
          </FormControl>
          <FormControl isRequired>
            <label htmlFor='message'>{t.message}</label>
            <Textarea mt={'1'} id={'message'} resize={'none'} name={'message'} />
          </FormControl>
          <Button type={'submit'} colorScheme={'purple'}>
            {t.submit}
          </Button>
        </Box>
      </Container>
    </>
  );
}
