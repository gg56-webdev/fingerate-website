import { Box, Container, Heading, Text } from '@chakra-ui/react';
import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import Head from 'next/head';

export default function terms({ text }) {
  return (
    <Container maxW={'container.lg'} pt='70px' pb='4'>
      <Head>
        <title>서비스 이용약관</title>
      </Head>
      <Heading as='h1' textAlign={'center'}>
        서비스 이용약관
      </Heading>
      <ReactMarkdown className='markdown'>{text}</ReactMarkdown>
    </Container>
  );
}
export async function getStaticProps() {
  const text = fs.readFileSync(path.join('docs', 'terms.md'), 'utf-8');

  return {
    props: {
      text,
    },
  };
}
