import { CloseIcon, LinkIcon } from '@chakra-ui/icons';
import { Box, Button, Stack, useDisclosure } from '@chakra-ui/react';
import Contact from '../Contact/Contact';

export default function Social() {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
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
    >
      <Button
        position={'absolute'}
        top='50%'
        left={'0'}
        transform='translate(calc(-100% - 4px), -50%)'
        onClick={onToggle}
        borderRadius='full'
        w={12}
        h={12}
        bg='whiteAlpha.700'
        color={'common.main'}
      >
        {isOpen ? <CloseIcon /> : <LinkIcon boxSize={'1.5em'} />}
      </Button>
      <Contact vertical />
    </Box>
  );
}
