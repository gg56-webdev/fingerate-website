import {
    Text,
    Box,
    Container,
    Heading,
    Flex,
    Stack,
    Divider,
} from '@chakra-ui/layout';
import { motion } from 'framer-motion';
import Card from '../utils/Card';
import SlideAnim from '../utils/SlideAnim';
import Sot from './Sot';

import About1 from './svg-animation/About1';
import About2 from './svg-animation/About2';
import About3 from './svg-animation/About3';

const MotionBox = motion(Box);

const imgs = [About1(), About2(), About3()];

export default function About({ text: { title, content, sot } }) {
    return (
        <>
            <Box>
                <Container maxWidth='container.xl'>
                    {/* <Heading as='h2'>{title}</Heading> */}
                    <Sot content={sot} />
                </Container>
            </Box>
            <Box bgColor='purple.100' as='section' id='about'>
                <Container maxWidth='container.xl'>
                    <Stack
                        spacing={['32', '32', '40']}
                        overflow='hidden'
                        pb='16'
                        pt='8'
                        whiteSpace={['normal', 'pre-line']}
                    >
                        {content.map((i, index) => (
                            <SlideAnim
                                key={index}
                                from={(index + 1) % 2 !== 0 ? 'left' : 'right'}
                            >
                                <Heading as='h3' textAlign='center' mb='6'>
                                    {i.title}
                                </Heading>
                                <Flex
                                    direction={[
                                        'column',
                                        'column',
                                        (index + 1) % 2 !== 0
                                            ? 'row'
                                            : 'row-reverse',
                                    ]}
                                    alignItems='center'
                                >
                                    <Card
                                        maxW={['100%', '100%', '50%']}
                                        mb={['8', '8', 0]}
                                    >
                                        <Heading
                                            as='h4'
                                            mb='6'
                                            fontWeight='medium'
                                            fontSize='xx-large'
                                        >
                                            {i.h3}
                                        </Heading>
                                        <Text>{i.p}</Text>
                                    </Card>

                                    {imgs[index]}
                                </Flex>
                            </SlideAnim>
                        ))}
                    </Stack>
                </Container>
            </Box>
        </>
    );
}
