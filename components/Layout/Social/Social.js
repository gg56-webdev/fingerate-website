import { useEffect } from 'react';
import { ChevronRightIcon, CloseIcon, LinkIcon } from '@chakra-ui/icons';
import { Box, IconButton, useDisclosure, useMediaQuery } from '@chakra-ui/react';
import Contact from '../Contact/Contact';

export default function Social() {
  const [isMobile] = useMediaQuery('(max-width: 1150px)');
  const { isOpen, onToggle, onClose } = useDisclosure({ defaultIsOpen: true });
  useEffect(() => {
    isMobile && onClose();
  }, [isMobile, onClose]);

  return (
    <Box
      as='aside'
      position={'fixed'}
      top='50%'
      transform={isOpen ? 'translate(0%, -50%)' : 'translate(100%,-50%)'}
      right='0'
      bg='common.second'
      zIndex={10}
      p='4'
      borderLeftRadius={'md'}
      transition='all 0.2s'
      shadow={isOpen ? 'md' : 'none'}
    >
      <IconButton
        aria-label='toggle show social links'
        position={'absolute'}
        top={'50%'}
        left={0}
        transform={isOpen ? 'translate(-100%, -50%)' : 'translate(calc(-100% - 4px), -50%)'}
        onClick={onToggle}
        borderRadius='full'
        w={10}
        h={10}
        variant={isOpen ? 'ghost' : 'solid'}
        colorScheme={'purple'}
        icon={isOpen ? <ChevronRightIcon boxSize={'2em'} /> : <LinkIcon boxSize={'1.5em'} />}
        transition='0.2s'
      />
      <Contact vertical />
    </Box>
  );
}
