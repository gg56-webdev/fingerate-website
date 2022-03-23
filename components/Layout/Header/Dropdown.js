import { Menu, MenuButton, MenuList, MenuItem, useDisclosure, Link, ExternalLinkIcon } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { default as NLink } from 'next/link';

export default function Dropdown({ item, onToggle }) {
  const { isOpen, onOpen, onClose, onToggle: onToggleDrop } = useDisclosure();
  return (
    <Menu isOpen={isOpen}>
      <MenuButton
        disabled={item?.disabled}
        border={item.important && '1px solid'}
        borderColor={item.important && 'common.main'}
        fontWeight={item.important && 'bold'}
        bg={item.important && 'common.main'}
        color={item.important ? 'white' : 'common.main'}
        px='2'
        borderRadius='md'
        _hover={{
          bg: 'common.second',
          color: 'common.main',
          boxShadow: 'md',
        }}
        onMouseEnter={onOpen}
        onClick={onToggleDrop}
        onMouseLeave={onClose}>
        {item.n}
        {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </MenuButton>
      <MenuList onMouseEnter={onOpen} onMouseLeave={onClose}>
        {item.dropdown.map((item) => (
          <MenuItem
            key={item.n}
            onClick={onToggle}
            border={item.important && '1px solid'}
            borderColor={item.important && 'common.main'}
            fontWeight={item.important && 'bold'}
            bg={item.important && 'common.main'}
            color={item.important ? 'white' : 'common.main'}
            _hover={{
              bg: 'common.second',
              color: 'common.main',
              boxShadow: 'md',
            }}>
            <NLink href={item.l} passHref={item.external}>
              <Link w={'100%'} isExternal={item.external} _hover={{ textDecoration: 'none' }}>
                {item.n}
                {item.external && <ExternalLinkIcon mx='2px' />}
              </Link>
            </NLink>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
