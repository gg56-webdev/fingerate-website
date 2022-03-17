import {
  Box,
  Button,
  Flex,
  Grid,
  Link,
  Text,
  Spacer,
  GridItem,
  Heading,
} from '@chakra-ui/react';
import Image from 'next/image';
import { default as NLink } from 'next/link';

export default function MapCard({ sot, onSelectSoT }) {
  return (
    <Grid
      gap={2}
      p={1}
      border='1px solid'
      borderColor={'gray.300'}
      borderRadius={6}
      transition={'ease-in-out'}
      _hover={{ boxShadow: 'outline', cursor: 'pointer' }}
      alignItems={'center'}
    >
      <Box>
        <Image
          width={200}
          height={200}
          src={sot.image}
          layout='responsive'
          blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkrAcAAIcAgit25/8AAAAASUVORK5CYII='
          placeholder='blur'
          alt={`Thumbnail of ${sot.id}`}
          onClick={() => onSelectSoT(sot)}
        />
      </Box>
      <Box as='strong' fontSize={'lg'} fontFamily='sans-serif'>
        {sot.name}
      </Box>

      <Flex
        alignItems={'center'}
        sx={{ gap: '0.25rem' }}
        flexWrap='wrap-reverse'
      >
        {sot.owner ? (
          '판매 완료'
        ) : (
          <>
            <NLink href={`/sots/${sot.id}`}>
              <Link
                bg={'common.mainLight'}
                color={'white'}
                py='1'
                px='2'
                fontSize={'md'}
                borderRadius={6}
              >
                SOT 구매
              </Link>
            </NLink>

            <Flex
              flex={'1'}
              sx={{ gap: '0.5rem' }}
              p='1'
              alignItems={'center'}
              bg={'common.second'}
              borderRadius={'md'}
              fontWeight={'bold'}
            >
              <Box bg='white' borderRadius={'md'} px='1'>
                {sot.grade}
              </Box>
              <Text as={'span'} color='common.main'>
                $ {sot.price.toLocaleString()}
              </Text>
            </Flex>
          </>
        )}
      </Flex>
    </Grid>
  );
}
