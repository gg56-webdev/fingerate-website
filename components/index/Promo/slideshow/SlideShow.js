import { List, ListItem, Box, Flex, UnorderedList } from '@chakra-ui/layout';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Counter from './Counter';

import Slide1 from '../../../public/slides/s1.png';
import Slide2 from '../../../public/slides/s2.png';
import Slide3 from '../../../public/slides/s3.png';
import Slide4 from '../../../public/slides/s4.png';

const MotionBox = motion(Box);

const color1 = '#710193';

export default function SlideShow({ content }) {
    return (
        <Swiper
            slidesPerView={1}
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            loop={true}
            autoplay={{ delay: 5000 }}
            observer={true}
            observeParents={true}
            // autoHeight={true}
        >
            <SwiperSlide>
                <Flex
                    direction={[
                        'column-reverse',
                        'column-reverse',
                        'row-reverse',
                    ]}
                    w='100%'
                    justifyContent='center'
                    alignItems='center'
                >
                    <List
                        maxW={['100%', '100%', '30%']}
                        fontSize={['2xl', '3xl']}
                        fontWeight='bold'
                        lineHeight='normal'
                        px={['8', '8', '0']}
                    >
                        <ListItem>{content[0][0]}</ListItem>
                    </List>

                    <Box p='8'>
                        <Image
                            src={Slide1}
                            alt='FingeRate Metaverse integrates in real world'
                            placeholder='blur'
                        />
                    </Box>
                </Flex>
            </SwiperSlide>
            <SwiperSlide>
                <Flex
                    direction={['column-reverse', 'column-reverse', 'row']}
                    w='100%'
                    justifyContent='center'
                    alignItems='center'
                >
                    <List
                        maxW={['100%', '100%', '30%']}
                        fontSize={['2xl', '3xl']}
                        fontWeight='bold'
                        lineHeight='normal'
                        px={['8', '8', '0']}
                        spacing='4'
                    >
                        <ListItem>{content[1][0]}</ListItem>
                        <UnorderedList
                            fontSize={['md', 'xl']}
                            listStyleType='circle'
                        >
                            <ListItem>{content[1][1][0]}</ListItem>
                        </UnorderedList>
                    </List>

                    <Box p='8'>
                        <Image
                            src={Slide2}
                            alt='Explore SoT around your location'
                            placeholder='blur'
                        />
                    </Box>
                </Flex>
            </SwiperSlide>
            <SwiperSlide>
                <Flex
                    direction={['column', 'column', 'row']}
                    w='100%'
                    justifyContent='center'
                    alignItems='center'
                >
                    <MotionBox p='8' position='relative'>
                        <Image
                            src={Slide3}
                            alt='Avatar interacting with SoT'
                            placeholder='blur'
                        />
                        <MotionBox
                            pos='absolute'
                            left={['14%', '16%']}
                            top='18%'
                            fontWeight='bold'
                            color='orange.400'
                            fontSize='xx-large'
                            animate={{
                                opacity: [1, 1, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatDelay: 3,
                            }}
                        >
                            $150
                        </MotionBox>
                        <MotionBox
                            pos='absolute'
                            left={['14%', '16%']}
                            top='14%'
                            fontWeight='bold'
                            color='black'
                            fontSize='xl'
                            animate={{
                                opacity: [0, 1, 0],
                                x: [0, 0, 180],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatDelay: 3,
                            }}
                        >
                            -$100
                        </MotionBox>
                        <MotionBox
                            pos='absolute'
                            left={['14%', '16%']}
                            top='18%'
                            fontWeight='bold'
                            color='orange.400'
                            fontSize='xx-large'
                            animate={{
                                opacity: [0, 0, 1],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatDelay: 3,
                            }}
                        >
                            $50
                        </MotionBox>
                        <MotionBox
                            pos='absolute'
                            right={['27%', '29%']}
                            top={['34%', '36%']}
                            fontWeight='bold'
                            color='common.main'
                            fontSize='xx-large'
                            animate={{
                                opacity: [1, 1, 0],
                                y: [0, 0, 50],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatDelay: 3,
                            }}
                        >
                            $100
                        </MotionBox>
                        <MotionBox
                            pos='absolute'
                            right={['-44%', '-13%']}
                            top='34%'
                            animate={{
                                opacity: [0, 0, 1],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatDelay: 3,
                            }}
                        >
                            <CheckCircleIcon boxSize='15%' color='green.400' />
                        </MotionBox>
                    </MotionBox>
                    <List
                        maxW={['100%', '100%', '30%']}
                        fontSize={['2xl', '3xl']}
                        fontWeight='bold'
                        lineHeight='normal'
                        px={['8', '8', '0']}
                    >
                        <ListItem>{content[2][0]}</ListItem>
                    </List>
                </Flex>
            </SwiperSlide>
            <SwiperSlide>
                <Flex
                    direction={['column-reverse', 'column-reverse', 'row']}
                    w='100%'
                    justifyContent='center'
                    alignItems='center'
                >
                    <List
                        maxW={['100%', '100%', '30%']}
                        fontSize={['2xl', '3xl']}
                        fontWeight='bold'
                        lineHeight='normal'
                        px={['8', '8', '0']}
                        spacing='4'
                    >
                        <ListItem fontSize={['2xl', '3xl']}>
                            {content[3][0]}
                        </ListItem>
                        <UnorderedList
                            fontSize={['md', 'xl']}
                            listStyleType='circle'
                        >
                            {content[3][1].map((i, index) => (
                                <ListItem key={index}>{i}</ListItem>
                            ))}
                        </UnorderedList>
                    </List>
                    <Box p='8' position='relative'>
                        <Image
                            src={Slide4}
                            alt='Explore SoT around your location'
                            placeholder='blur'
                        />
                        <Box
                            position='absolute'
                            w='10%'
                            h='10%'
                            top='10%'
                            right='50%'
                        >
                            <motion.svg
                                id='clock'
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 496 496'
                            >
                                <path
                                    id='circle'
                                    d='M256,8C119,8,8,119,8,256S119,504,256,504,504,393,504,256,393,8,256,8Zm0,448A200,200,0,1,1,456,256,199.94,199.94,0,0,1,256,456Z'
                                    transform='translate(-8 -8)'
                                    fill={color1}
                                />
                                <motion.g
                                    id='m'
                                    animate={{ rotate: 360 }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 2,
                                        ease: 'linear',
                                    }}
                                >
                                    <circle
                                        cx='248'
                                        cy='248'
                                        r='248'
                                        fill='none'
                                    />
                                    <rect
                                        x='220'
                                        y='96'
                                        width='56'
                                        height='152'
                                        rx='10'
                                        fill={color1}
                                    />
                                </motion.g>
                                <motion.g
                                    id='h'
                                    animate={{ rotate: 360 }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 2 * 12,
                                        ease: 'linear',
                                    }}
                                >
                                    <rect
                                        x='261.49'
                                        y='194.51'
                                        width='56'
                                        height='122.98'
                                        rx='8.99'
                                        transform='translate(537.49 -41.49) rotate(90)'
                                        fill={color1}
                                    />
                                    <circle
                                        cx='248'
                                        cy='248'
                                        r='248'
                                        fill='none'
                                    />
                                </motion.g>
                            </motion.svg>
                        </Box>
                        <Box
                            pos='absolute'
                            left={['10%', '18%']}
                            top='15%'
                            fontWeight='bold'
                            color='orange.400'
                        >
                            <Counter from={50} to={1000} dur={240} />
                        </Box>
                    </Box>
                </Flex>
            </SwiperSlide>
        </Swiper>
    );
}
