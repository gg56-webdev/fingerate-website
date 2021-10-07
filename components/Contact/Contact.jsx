import {Box, Flex, Heading, Container, Stack} from '@chakra-ui/layout'

import Image from 'next/image'
import contact from './contact.json'

export default function Contact({ text: { title, content } }) {
    return(
        <Box as='section' id='contact' 
        // bgGradient='linear(to-r, white 0%, white 50%, common.main 50%)' 
        w='100%'
        >
            <Container maxW='container.xl' py='8'>
                <Flex textAlign='center'>
                    <Box flex='1'> 
                        <Heading as='h3' fontSize='2xl' mb='8'>
                            {content[0].h3}
                        </Heading>
                        <Stack as='ul' listStyleType='none' direction='row' justify='center' >
                            {contact.map((item) => (
                                <Box
                                key={item.n}
                                as='li'
                                width='40px'
                                height='40px'
                                transition='0.2s'
                                opacity={item.l ? '0.8' : '0.4'}
                                _hover={{ opacity: '1' }}
                                pointerEvents={item.l ? 'auto' : 'none'}
                            >
                                <a
                                    href={item.l || '#'}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    <Image
                                        src={`/social/${item.i}.svg`}
                                        width='40'
                                        height='40'
                                        alt={`${item.n} icon`}
                                    />
                                </a>
                            </Box>
                            ))}
                        </Stack>
                    </Box>
                    {/* <Box flex='1'>
                        <Heading as='h3' color="text.second" fontSize='2xl'>
                            {content[1].h3}
                        </Heading>
                    </Box> */}
                </Flex>
            </Container>
        </Box>
    )
}