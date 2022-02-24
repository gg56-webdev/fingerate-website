import { Box } from '@chakra-ui/react';

export default function Marketplace() {
  return (
    <Box
      as='iframe'
      src='https://opensea.io/collection/fingeratesot?embed=true'
      width='100%'
      minH='100vh'
      frameBorder='0'
      allowFullScreen
    ></Box>
  );
}
