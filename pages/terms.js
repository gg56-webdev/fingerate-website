import { Box, Container, Heading } from '@chakra-ui/react';
import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';

export default function terms({ text }) {
  return (
    <Container maxW={'container.lg'} pt='70px'>
      <Heading textAlign={'center'}>서비스 이용약관</Heading>
      <ReactMarkdown components={ChakraUIRenderer()} skipHtml>
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
