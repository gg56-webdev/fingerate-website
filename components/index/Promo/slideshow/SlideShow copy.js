import {
    Grid,
    List,
    ListItem,
    Box,
    Flex,
    Spacer,
    UnorderedList,
} from '@chakra-ui/layout';
import { ArrowForwardIcon, CheckCircleIcon } from '@chakra-ui/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Counter from './Counter';

const MotionBox = motion(Box);

const color1 = '#710193';

export default function SlideShow() {
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
            autoHeight={true}
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
                        fontSize='3xl'
                        fontWeight='bold'
                        lineHeight='normal'
                        px={['8', '8', '0']}
                    >
                        <ListItem>
                            Explore the FingeRate Metaverse mapped from real
                            world
                        </ListItem>
                    </List>

                    <Box p='8'>
                        <Image
                            src='/slides/s1.png'
                            alt='FingeRate Metaverse integrates in real world'
                            width='500'
                            height='500'
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
                        fontSize='3xl'
                        fontWeight='bold'
                        lineHeight='normal'
                        px={['8', '8', '0']}
                    >
                        <ListItem>Pick the SoT you want</ListItem>
                        <UnorderedList fontSize='xl' listStyleType='circle'>
                            <ListItem>
                                Thousands of real-world locations to choose from
                            </ListItem>
                        </UnorderedList>
                    </List>

                    <Box p='8'>
                        <Image
                            src='/slides/s2.png'
                            alt='Explore SoT around your location'
                            width='500'
                            height='500'
                        />
                    </Box>
                </Flex>
            </SwiperSlide>
            <SwiperSlide>
                <Grid
                    gridTemplateAreas={[
                        `'img1' 'icon' 'img2' 'ul'`,
                        `'img1' 'icon' 'img2' 'ul'`,
                        `'img1 icon img2' 'ul ul ul'`,
                    ]}
                    gridTemplateColumns={['1fr', '1fr', '1fr auto 1fr']}
                    gridTemplateRows={[
                        '1fr auto 1fr auto',
                        '1fr auto 1fr auto',
                        'none',
                    ]}
                    position='relative'
                    justifyItems='center'
                    alignItems='center'
                >
                    <MotionBox gridArea='img1' p='8' position='relative'>
                        <Image
                            src='/slides/s3-1.png'
                            alt='Avatar interacting with SoT'
                            width='500'
                            height='500'
                        />
                        <Box
                            pos='absolute'
                            left={['14%', '16%']}
                            top='18%'
                            fontWeight='bold'
                            color='orange.400'
                            fontSize='xx-large'
                        >
                            $150
                        </Box>
                        <Box
                            pos='absolute'
                            right={['27%', '29%']}
                            top={['34%', '36%']}
                            fontWeight='bold'
                            color='common.main'
                            fontSize='xx-large'
                        >
                            $100
                        </Box>
                    </MotionBox>
                    <ArrowForwardIcon
                        gridArea='icon'
                        boxSize='6'
                        transform={['rotate(90deg)', 'rotate(90deg)', 'none']}
                    />
                    <Box gridArea='img2' p='8' pos='relative'>
                        <Image
                            src='/slides/s3-2.png'
                            alt='Avatar interacting with SoT'
                            width='500'
                            height='500'
                        />
                        <Box
                            pos='absolute'
                            left={['17%', '18%']}
                            top='18%'
                            fontWeight='bold'
                            color='orange.400'
                            fontSize='xx-large'
                        >
                            $50
                        </Box>

                        <CheckCircleIcon
                            boxSize='15%'
                            color='green.400'
                            pos='absolute'
                            right={['30%', '28%']}
                            top='34%'
                        />
                    </Box>
                    <List
                        gridArea='ul'
                        fontSize='3xl'
                        fontWeight='bold'
                        lineHeight='normal'
                        px={['8', '8', '0']}
                    >
                        <ListItem>
                            Claim ownership of the SoT &amp; be an SoT Owner
                        </ListItem>
                    </List>
                </Grid>
            </SwiperSlide>
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
                        fontSize='3xl'
                        fontWeight='bold'
                        lineHeight='normal'
                        px={['8', '8', '0']}
                    >
                        <ListItem fontSize='3xl'>
                            Be an SoT Owner &amp; enjoy the benefits
                        </ListItem>
                        <UnorderedList fontSize='xl' listStyleType='circle'>
                            <ListItem>Earn revenue from surveys</ListItem>
                            <ListItem>Higher resale value</ListItem>
                            <ListItem>
                                Additional revenues from more participation
                            </ListItem>
                        </UnorderedList>
                    </List>
                    <Box p='8' position='relative'>
                        <Image
                            src='/slides/s4-2.png'
                            alt='Explore SoT around your location'
                            width='500'
                            height='500'
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
