import { useEffect } from 'react';
import { ChevronRightIcon, LinkIcon } from '@chakra-ui/icons';
import { Box, IconButton, useDisclosure, useBreakpointValue } from '@chakra-ui/react';
import Contact from '../Contact/Contact';

export default function Social() {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });
  useEffect(() => !isMobile && onOpen(), [isMobile, onOpen]);

  return (
    <Box
      as='aside'
      position='fixed'
      top='50%'
      transform={isOpen ? 'translate(0%, -50%)' : 'translate(100%,-50%)'}
      right='0'
      bg='common.second'
      zIndex='10'
      p='4'
      borderLeftRadius='md'
      transition='0.3s'
      shadow={isOpen ? 'md' : 'none'}
    >
      <IconButton
        shadow={isOpen ? 'none' : 'md'}
        aria-label='toggle list map menu'
        onClick={onToggle}
        pos='absolute'
        top='50%'
        left='-0.5'
        transform='translate(-100%, -50%)'
        size='md'
        variant={isOpen ? 'ghost' : 'solid'}
        isRound
        colorScheme='purple'
        transition='0.3s'
        icon={isOpen ? <ChevronRightIcon boxSize='8' /> : <LinkIcon boxSize='6' />}
      />
      {isOpen && <Contact vertical />}
    </Box>
  );
}
