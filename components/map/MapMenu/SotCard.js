import { Flex, Box, Tag, Button, Icon, TagLabel, Grid, IconButton } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { default as NLink } from 'next/link';

export default function SotCard({ sot, map, onClose, t }) {
  const isNft = sot.source !== 'Firebase';
  const hasOwner = !!sot.owner;
  const color = isNft ? 'blue' : 'purple';

  const flyToCoords = () => {
    const center = [sot._long, sot._lat];
    map.flyTo({ center, zoom: 15, essential: true });
    onClose();
  };

  return (
    <Flex
      flexDir='column'
      fontFamily='sans-serif'
      as='li'
      p='1.5'
      bg='gray.50'
      borderRadius='md'
      border='2px solid'
      borderColor={hasOwner ? 'gray.200' : `${color}.200`}
      gap='1.5'
      shadow='xs'
      pos='relative'
      sx={{ '&:hover .card-overlay': { opacity: 1 }, gap: 1 }}
    >
      <Box as='strong' color={color} fontSize='sm' lineHeight='1.25'>
        {sot.name}
      </Box>
      <Flex fontFamily='mono' gap='1' mt='auto' flexWrap='wrap'>
        <Tag borderRadius='4px' size='sm' colorScheme='purple' w='fit-content'>
          {sot.id}
        </Tag>
        {isNft && (
          <Tag borderRadius='4px' colorScheme='blue' size='sm' w='fit-content'>
            token_id: {sot.token_id}
          </Tag>
        )}
        <Tag borderRadius='4px' colorScheme='pink' size='sm' w='fit-content' fontFamily='sans-serif'>
          <Icon ml='-0.5'>
            <path
              fill='currentColor'
              fillRule='evenodd'
              d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z'
              clipRule='evenodd'
            />
          </Icon>
          <TagLabel isTruncated={false}>{sot.country}</TagLabel>
        </Tag>
      </Flex>
      <Flex gap='1' align='center'>
        <Grid
          fontSize='md'
          fontWeight='bold'
          placeItems='center'
          borderRadius='4px'
          w='7'
          h='7'
          bg={`grades.${sot.grade}`}
          color='white'
          shadow='inner'
          textShadow='-1px -1px 1px rgba(255,255,255,.1), 1px 1px 1px rgba(0,0,0,.5)'
        >
          {sot.grade}
        </Grid>
        <Box flex='1' px='2' bg={hasOwner ? 'gray.100' : 'common.second'} shadow='inner' borderRadius='4px'>
          <Box display='inline' fontWeight='bold' fontSize='sm' color={hasOwner ? 'gray.600' : 'purple'}>
            $ {sot.price.toLocaleString()}
          </Box>
          {hasOwner && (
            <Box as='ins' ml='1' fontSize='xs' textDecor='none' color='gray.500'>
              {t.general.sold}
            </Box>
          )}
        </Box>
      </Flex>
      <Flex
        className='card-overlay'
        opacity='0'
        transition='0.2s'
        pos='absolute'
        inset='1'
        p='1'
        bg='whiteAlpha.700'
        align='center'
        justify='center'
        gap='1'
        borderRadius='md'
      >
        <IconButton
          size='sm'
          icon={
            <Icon boxSize={4}>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'>
                <path
                  fillRule='evenodd'
                  d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z'
                  clipRule='evenodd'
                />
              </svg>
            </Icon>
          }
          colorScheme={color}
          variant='outline'
          bg='white'
          onClick={flyToCoords}
        />
        {isNft ? (
          <Button
            as='a'
            size='sm'
            colorScheme={color}
            href={sot.url}
            target='_blank'
            rel='noopener noreferrer'
            cursor='pointer'
          >
            {t.general.buyPolygon} <ExternalLinkIcon ml='2' />
          </Button>
        ) : (
          <NLink passHref href={sot.url}>
            <Button as='a' colorScheme={hasOwner ? 'gray' : color} cursor='pointer' size='sm'>
              {hasOwner ? t.general.view : t.general.buy}
            </Button>
          </NLink>
        )}
      </Flex>
    </Flex>
  );
}
