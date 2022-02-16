import {
  Text,
  Box,
  Container,
  Heading,
  Flex,
  Button,
  Grid,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import styles from '../../styles/animation.module.css';

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

const link = 'https://opensea.io/collection/fingeratesot';

export default function Hero({ text: { content } }) {
  return (
    <Flex
      as='section'
      w='100%'
      h='100vh'
      minH='720px'
      maxH={'1080px'}
      // bgColor='common.main'
      bgGradient='linear(to-br, common.mainLight, common.second)'
      position='relative'
      _after={{
        content: `""`,
        position: 'absolute',
        background: 'url(https://grainy-gradients.vercel.app/noise.svg)',
        opacity: '0.35',
        inset: '0',
        width: '100%',
        height: '100%',
        zIndex: '1',
      }}
      overflowX='hidden'
      flexDir={'column'}
    >
      <Container
        maxW='container.xl'
        flexGrow='1'
        position='relative'
        zIndex='2'
      >
        <Flex
          pt={'65px'}
          align='center'
          justify='center'
          flexDirection={{ base: 'column-reverse', md: 'row' }}
          h='100%'
          alignContent='center'
        >
          <MotionBox
            w={{ base: '100%', md: '50%' }}
            textAlign={{ base: 'center', md: 'left' }}
            pr={{ md: 2 }}
            variants={container}
            initial='hidden'
            animate='enter'
            exit='exit'
          >
            <MotionHeading
              variants={item}
              as='h1'
              color='text.second'
              fontSize={['xx-large', 'xx-large', '5xl']}
              mb='2'
              whiteSpace={{ md: 'pre-wrap' }}
              pl={{ md: 6 }}
            >
              {content.h2}
            </MotionHeading>
            <Grid
              gridTemplateColumns={{ base: '1fr 1fr', md: '0.25fr 1fr 0.25fr' }}
              gap={2}
              mb='2'
              px={2}
            >
              {content.features.map((feature, _id) => (
                <MotionText
                  key={feature}
                  variants={item}
                  bg='common.second'
                  color='common.main'
                  textAlign={'center'}
                  fontSize={{ base: 'sm', md: 'xl' }}
                  p={2}
                  borderRadius='md'
                  whiteSpace={{ md: 'pre-wrap' }}
                  fontWeight='bold'
                  display='grid'
                  placeItems='center'
                  gridColumn={{ md: _id % 2 === 0 ? '1 / 3' : '2 / -1' }}
                >
                  {feature}
                </MotionText>
              ))}
            </Grid>
            <Flex justifyContent={'center'} mb='2'>
              <MotionButton
                flex='1'
                rel='noopener noreferrer'
                as='a'
                href={link}
                variants={item}
                variant='outline'
                border='1px solid'
                borderColor='text.second'
                color='text.second'
                fontSize='x-large'
                mr={4}
                _hover={{
                  bg: 'common.main',
                  color: 'text.second',
                  boxShadow: 'md',
                }}
                target='_blank'
              >
                {content.btn1}
              </MotionButton>
              <MotionButton
                flex='1'
                rel='noopener noreferrer'
                as='a'
                href={link}
                variants={item}
                variant='outline'
                border='1px solid'
                borderColor='text.second'
                color='text.second'
                fontSize='x-large'
                _hover={{
                  bg: 'common.main',
                  color: 'text.second',
                  boxShadow: 'md',
                }}
                target='_blank'
              >
                {content.btn2}
              </MotionButton>
            </Flex>
          </MotionBox>

          <MotionBox
            w={{ base: '100%', md: '50%' }}
            // display={['none', 'none', 'block']}
            variants={container}
            initial='hidden'
            animate='enter'
            pos='relative'
            flexGrow='1'
            h='100%'
          >
            <iframe
              src='https://my.spline.design/sotdevice-fb79e2d7b8093da7f604cef8e68b8715/'
              frameBorder='0'
              width='100%'
              height='100%'
              loading='lazy'
            ></iframe>
          </MotionBox>
        </Flex>
      </Container>
      <Box
        h={'fit-content'}
        bg='white'
        borderTop={'1px solid'}
        borderBottom={'1px solid'}
        borderColor='common.mainLight'
      >
        <Container
          maxW='container.xl'
          h={'100%'}
          textAlign='center'
          overflow={'hidden'}
        >
          <Box className={styles.animation} h='100%'>
            <Box display={'inline-block'}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
              volutpat, ante eu bibendum tincidunt, sem lacus vehicula augue, ut
              suscipit.
            </Box>
            <Box display={'inline-block'}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
              volutpat, ante eu bibendum tincidunt, sem lacus vehicula augue, ut
              suscipit.
            </Box>
          </Box>
        </Container>
      </Box>
    </Flex>
  );
}
