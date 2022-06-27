import { SotIcon } from '../../../public/sot icons/icons';
import {
  useBreakpointValue,
  Popover,
  PopoverTrigger,
  PopoverHeader,
  PopoverContent,
  Button,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  PopoverFooter,
  Tag,
  TagLabel,
  Flex,
  Grid,
  Icon,
  Box,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { Marker } from 'react-map-gl';
import { default as NLink } from 'next/link';

export default function SotMarker({ coordinates, map, t, ...sot }) {
  const isNft = sot.source !== 'Firebase';
  const hasOwner = !!sot.owner;
  const color = isNft ? 'blue' : 'purple';

  const [isClicked, setIsClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isMobile = useBreakpointValue({ base: true, md: false });

  const flyToCoords = () => {
    const center = [sot._long, sot._lat];
    map.flyTo({ center, zoom: 15, essential: true });
  };

  return (
    <Marker longitude={coordinates[0]} latitude={coordinates[1]} style={{ zIndex: isHovered ? 3 : isClicked ? 2 : 1 }}>
      <Popover
        isLazy
        isOpen={isClicked || (!isMobile && isHovered)}
        placement='top'
        autoFocus={false}
        modifiers={[{ name: 'preventOverflow', options: { padding: { top: 60 }, altAxis: true } }]}
      >
        <PopoverTrigger>
          <SotIcon
            cursor='pointer'
            boxSize='14'
            color={color}
            opacity={hasOwner ? 0.6 : 1}
            onClick={() => {
              setIsClicked(!isClicked);
              if (isMobile) flyToCoords();
            }}
            onMouseOver={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onDoubleClick={flyToCoords}
          />
        </PopoverTrigger>
        <PopoverContent
          border='2px solid'
          borderColor={hasOwner ? 'gray.200' : `${color}.200`}
          w='fit-content'
          variants={{}}
        >
          <PopoverArrow />
          {isClicked && <PopoverCloseButton onClick={() => setIsClicked(false)} />}
          <PopoverHeader color={color} fontWeight='bold' fontSize='sm' pr='10'>
            {sot.name}
          </PopoverHeader>
          <PopoverBody display='flex' gap='1' flexDir='column'>
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
            <Flex gap='1'>
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
              <Box
                flex='1'
                px='2'
                display='flex'
                alignItems='center'
                bg={hasOwner ? 'gray.100' : 'common.second'}
                shadow='inner'
                borderRadius='4px'
              >
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
          </PopoverBody>
          {isClicked && (
            <PopoverFooter display='flex' justifyContent='center'>
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
            </PopoverFooter>
          )}
        </PopoverContent>
      </Popover>
    </Marker>
  );
}
