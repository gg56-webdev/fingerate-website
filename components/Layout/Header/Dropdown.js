import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { default as NLink } from 'next/link';

export default function Dropdown({ item, onClose }) {
  return (
    <Menu autoSelect={false}>
      {item?.important && (
        <MenuButton
          as={Button}
          size='sm'
          rightIcon={<ChevronDownIcon boxSize={6} />}
          colorScheme='purple'
          bg='common.main'
          fontSize='inherit'
          fontWeight='inherit'
          sx={{
            '&[data-active] svg': { transform: 'rotateZ(180deg)' },
            '& svg': { transition: 'transform 0.2s' },
            '&:is(:hover, :active, [data-active])': { bg: 'common.second', color: 'common.main', shadow: 'md' },
          }}
        >
          {item.n}
        </MenuButton>
      )}
      <MenuList color='common.main'>
        {item.dropdown.map((item) => (
          <NLink key={item.n} href={item.l} passHref>
            <MenuItem as='a' _hover={{ bg: 'common.second' }} onClick={onClose}>
              {item.n}
            </MenuItem>
          </NLink>
        ))}
      </MenuList>
    </Menu>
  );
}
