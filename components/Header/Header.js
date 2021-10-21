import {
    Box,
    Container,
    Flex,
    Stack,
    useDisclosure,
    Link,
    Select,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import Image from 'next/image';
import { default as NLink } from 'next/link';
import nav from './nav.json';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Header() {
    const router = useRouter();
    const { locale } = router;
    const [navbar, setNavbar] = useState(false);
    const { isOpen, onToggle } = useDisclosure();

    const changeLang = (e) => {
        const locale = e.target.value;
        router.push('/', '/', { locale });
        onToggle();
    };

    const changeBackground = () => {
        if (window.scrollY >= 66) {
            setNavbar(true);
        } else {
            setNavbar(false);
        }
    };

    useEffect(() => {
        changeBackground();
        // adding the event when scroll change background
        window.addEventListener('scroll', changeBackground);
    });

    return (
        <Box
            as='header'
            pos='fixed'
            w='100%'
            backgroundColor={navbar ? 'common.main' : 'transperent'}
            transition='all 0.2s'
            color='text.second'
            zIndex='sticky'
        >
            <Container maxW='container.xl'>
                <Flex
                    as='nav'
                    align='center'
                    justify='space-between'
                    wrap='wrap'
                >
                    <Flex as='a' href='/' align='center'>
                        <Image
                            src='/logo_1.png'
                            alt='FingeRate logo'
                            width='50'
                            height='50'
                        />
                        <Box
                            color={navbar ? 'common.second' : 'white'}
                            fontSize='2xl'
                            fontWeight='bold'
                        >
                            FingeRate
                        </Box>
                    </Flex>

                    <Box
                        display={{ base: 'block', md: 'none' }}
                        onClick={onToggle}
                    >
                        {isOpen ? <CloseIcon /> : <HamburgerIcon boxSize='6' />}
                    </Box>
                    <Box
                        display={{
                            base: isOpen ? 'block' : 'none',
                            md: 'block',
                        }}
                        flexBasis={{ base: '100%', md: 'auto' }}
                        pb={[4, 4, 0, 0]}
                    >
                        <Stack
                            spacing={2}
                            align='center'
                            justify={[
                                'center',
                                'space-evenly',
                                'flex-end',
                                'flex-end',
                            ]}
                            direction={['column', 'column', 'row', 'row']}
                            pt={[4, 4, 0, 0]}
                            bgColor={[
                                'common.main',
                                'common.main',
                                'transparent',
                            ]}
                        >
                            {nav.map((item) => (
                                <NLink
                                    key={item.n}
                                    href={item.l}
                                    passHref={/\//.test(item.l)}
                                >
                                    <Link
                                        onClick={onToggle}
                                        border={
                                            /\//.test(item.l) && '1px solid'
                                        }
                                        borderColor={
                                            /\//.test(item.l) && 'text.second'
                                        }
                                        px='2'
                                        borderRadius='md'
                                        _hover={{
                                            bg: 'common.second',
                                            color: 'text.main',
                                            boxShadow: 'md',
                                        }}
                                        isExternal={/\//.test(item.l)}
                                    >
                                        {item.n}
                                        {/http/.test(item.l) && (
                                            <ExternalLinkIcon mx='2px' />
                                        )}
                                    </Link>
                                </NLink>
                            ))}
                            <Box w='auto' p={2}>
                                <Select
                                    size='xs'
                                    variant='outline'
                                    color='text.main'
                                    bgColor='white'
                                    onChange={changeLang}
                                    defaultValue={locale}
                                >
                                    <option value='en'>English</option>
                                    <option value='ko'>한국어</option>
                                </Select>
                            </Box>
                        </Stack>
                    </Box>
                </Flex>
            </Container>
        </Box>
    );
}
