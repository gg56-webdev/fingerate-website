import { Box, Container, Flex, Heading, Stack, Text } from '@chakra-ui/react';

import ko from '../locales/ko/team.json';
import en from '../locales/en/team.json';
import Head from 'next/head';

const Team = ({ locale }) => {
  const t = locale === 'ko' ? ko : en;
  return (
    <>
      <Head>
        <title>Team</title>
      </Head>
      <Container textAlign='center' pt='65px'>
        <Heading as='h1'>{t.h1}</Heading>
        <Text>{t.subtitle}</Text>
      </Container>
    </>
  );
};

export default Team;

const Profile = ({ person }) => {
  const { name, subtitles, socialLinks } = person;
  return (
    <Stack>
      {/* <Image /> */}
      <Box as='strong'>{name}</Box>
      {subtitles.length > 0 &&
        subtitles.map((s, i) => (
          <Text key={i} as='small'>
            {s}
          </Text>
        ))}
      {socialLinks.length > 0 && (
        <Flex gap='2'>
          {socialLinks.map((s, i) => (
            <div key={i}>{s}</div>
          ))}
        </Flex>
      )}
    </Stack>
  );
};
