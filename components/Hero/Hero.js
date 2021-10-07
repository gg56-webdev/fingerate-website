import {
    Text,
    Box,
    Container,
    Heading,
    Flex,
    Button,
    Spacer,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import Image from 'next/image';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionButton = motion(Button);

const container = {
    hidden: {
        opacity: 0,
    },
    enter: {
        opacity: 1,
        transition: { staggerChildren: 0.3 },
    },
    exit: { opacity: 0, x: 0, y: -100 },
};

const item = {
    hidden: { opacity: 0, x: -100 },
    enter: { opacity: 1, x: 0, transition: { staggerChildren: 0.3 } },
};

const blocks = {
    hidden: {
        opacity: 0,
    },
    enter: {
        opacity: 1,
    },
};

const link = 'https://opensea.io/collection/sotcollection';

export default function Hero({ text: { name, content } }) {
    return (
        <Box
            as='section'
            w='100%'
            h='100vh'
            // bgColor='common.main'
            bgGradient='linear(to-br, #00C9FF, #F9AFD1)'
            pt='10'
            overflowX='hidden'
        >
            <Container maxW='container.xl' h='100%'>
                <Flex
                    align='center'
                    justify='center'
                    wrap='wrap'
                    h='100%'
                    alignContent='center'
                >
                    <MotionBox
                        w={['100%', '100%', '50%']}
                        textAlign={['center', 'center', 'left']}
                        variants={container}
                        initial='hidden'
                        animate='enter'
                        exit='exit'
                        mb='16'
                    >
                        <MotionHeading
                            variants={item}
                            as='h2'
                            color='text.second'
                            fontSize={['xxx-large', '6xl']}
                            mb='6'
                        >
                            {content.h2}
                        </MotionHeading>
                        <MotionText
                            variants={item}
                            color='text.second'
                            fontSize={['medium', '2xl']}
                            mb='8'
                            whiteSpace='pre-wrap'
                        >
                            {content.p}
                        </MotionText>
                        <MotionButton
                            rel='noopener noreferrer'
                            as='a'
                            href={link}
                            variants={item}
                            variant='outline'
                            border='1px solid'
                            borderColor='text.second'
                            color='text.second'
                            fontSize='large'
                            _hover={{
                                bg: 'common.second',
                                color: 'text.main',
                                boxShadow: 'md',
                            }}
                            target='_blank'
                        >
                            {content.btn1}
                        </MotionButton>
                    </MotionBox>

                    <MotionBox
                        w={['100%', '50%']}
                        display={['none', 'block']}
                        variants={container}
                        initial='hidden'
                        animate='enter'
                        pos='relative'
                    >
                        <Image
                            src='/avatar/wave.webp'
                            alt='avatar wave'
                            width='907'
                            height='888'
                            priority={true}
                        />
                        <MotionBox
                            pos='absolute'
                            bottom='0'
                            right='-5%'
                            bg='white'
                            w='20%'
                            h='20%'
                            borderRadius='md'
                            transform='rotate(30deg)'
                            variants={blocks}
                        />
                        <MotionBox
                            pos='absolute'
                            top='10%'
                            right='10%'
                            bg='cyan.200'
                            w='14%'
                            h='14%'
                            borderRadius='md'
                            transform='rotate(85deg)'
                            variants={blocks}
                        />
                        <MotionBox
                            pos='absolute'
                            bottom='35%'
                            left='5'
                            bg='blue.200'
                            w='10%'
                            h='10%'
                            borderRadius='md'
                            transform='rotate(15deg)'
                            variants={blocks}
                        />
                    </MotionBox>
                    {/* <motion.div
                        animate={{ y: -5 }}
                        transition={{ yoyo: Infinity, duration: 1 }}
                    >
                        <ChevronDownIcon boxSize='14' color='text.second' />
                    </motion.div> */}
                </Flex>
            </Container>
        </Box>
    );
}
