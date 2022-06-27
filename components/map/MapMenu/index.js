import { useDisclosure, useBreakpointValue, Flex, IconButton } from '@chakra-ui/react';
import { HamburgerIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import { useEffect } from 'react';
import Filters from './Filters';
import SotList from './SotList';

export default function MapMenu({ filteredSots, t, ...rest }) {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });
  useEffect(() => !isMobile && onOpen(), [isMobile, onOpen]);
  return (
    <Flex
      flexDir='column'
      gap='1'
      zIndex='10'
      maxW={{ base: '85%', md: '45%' }}
      as='aside'
      pos='fixed'
      top='65px'
      bottom='8'
      left='0'
      bg='white'
      p='1'
      borderRightRadius='md'
      shadow={isOpen ? 'md' : 'none'}
      transition='transform 0.3s'
      transform={isOpen ? 'translate(0%, 0%)' : 'translate(-100%,0%)'}
    >
      <IconButton
        aria-label='toggle list map menu'
        onClick={onToggle}
        pos='absolute'
        top={isOpen ? '0' : '50%'}
        right='-0.5'
        transform='translateX(100%)'
        size='md'
        variant={isOpen ? 'ghost' : 'solid'}
        isRound
        colorScheme='purple'
        transition='0.3s'
        icon={isOpen ? <ChevronLeftIcon boxSize='8' /> : <HamburgerIcon boxSize='6' />}
      />
      <Filters t={t} {...rest} />
      <SotList t={t} filteredSots={filteredSots} onClose={isMobile ? onClose : () => {}} />
    </Flex>
  );
}
