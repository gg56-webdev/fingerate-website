import { Box, Container, Heading, Text } from '@chakra-ui/react';
import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
// import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
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
      <ReactMarkdown
        components={{
          h2: ({ node, ...props }) => (
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '1rem' }} {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1rem' }} {...props} />
          ),
          p: ({ node, ...props }) => <p style={{ marginBottom: '0.5rem' }} {...props} />,
        }}
        skipHtml>
        {text}
      </ReactMarkdown>
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
