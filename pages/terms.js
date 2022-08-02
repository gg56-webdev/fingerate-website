import { Box, Container, Heading, Text } from '@chakra-ui/react';
import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import Head from 'next/head';

export default function terms({ text }) {
  return (
    <Container
      shadow='md'
      maxW='container.lg'
      mb='4'
      px='8'
      py='4'
      className='markdown privacy'
      fontFamily='sans-serif'
      bg='white'
      mt='80px'
    >
      <Head>
        <title>SIGNIS FR이용약관</title>
      </Head>
      <Heading as='h1' textAlign='center' fontSize='4xl'>
        SIGNIS FR이용약관
      </Heading>
      <ReactMarkdown className='markdown'>{text}</ReactMarkdown>
    </Container>
  );
}
export async function getStaticProps() {
  const text = fs.readFileSync(path.join('docs', '08-02-2022', '이용약관.md'), 'utf-8');

  return { props: { text } };
}
