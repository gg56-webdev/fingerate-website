import Sot from '../components/About/Sot';
import { useRouter } from 'next/router';
import { Box, Container } from '@chakra-ui/layout';

import en from '../locales/en/index.json';
import ko from '../locales/ko/index.json';

export default function Docs() {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en.sections.about.sot : ko.sections.about.sot;
  return (
    <Box>
      <Container maxWidth='container.xl'>
        {/* <Heading as='h2'>{title}</Heading> */}
        <Sot content={t} />
      </Container>
    </Box>
  );
}
