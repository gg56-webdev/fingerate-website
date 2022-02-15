import {
  Box,
  Button,
  Flex,
  Grid,
  Link,
  Text,
  Spacer,
  GridItem,
} from '@chakra-ui/react';
import Image from 'next/image';
import { default as NLink } from 'next/link';

export default function MapCard({ sot, price, onSelectSoT }) {
  return (
    <Grid
      gap={2}
      p={1}
      border='1px solid'
      borderColor={'gray.300'}
      borderRadius={6}
      transition={'ease-in-out'}
      _hover={{ boxShadow: 'outline' }}
      alignItems={'center'}
    >
      <Button onClick={() => onSelectSoT(sot)}>See on map</Button>
      <Image
        width={200}
        height={200}
        src={sot.image}
        blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkrAcAAIcAgit25/8AAAAASUVORK5CYII='
        placeholder='blur'
        alt={`Thumbnail of ${sot.id}`}
      />
      <Flex justifyContent={'space-between'}>
        <Link
          bg={'common.main'}
          color={'white'}
          py='1'
          px='2'
          fontSize={'small'}
          borderRadius={6}
          href={sot.url}
          target={'_blank'}
          isExternal
        >
          Buy SoT
        </Link>
        <Text>₩ {price}</Text>
      </Flex>
    </Grid>
  );
}
