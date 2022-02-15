import { Text, Box, Container, Heading, Flex, Button } from '@chakra-ui/react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import HeroImg from '../../public/avatar/wave.webp';
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

export default function Hero({ text: { name, content } }) {
  return (
    <Box
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
    >
      <Container maxW='container.xl' h='95%' position='relative' zIndex='2'>
        <Flex
          pt={'70px'}
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
          >
            <MotionHeading
              variants={item}
              as='h1'
              color='text.second'
              fontSize={['xx-large', 'xx-large', '5xl']}
              mb='6'
              whiteSpace='pre-wrap'
            >
              {content.h2}
            </MotionHeading>
            <Flex flexDir={'column'} alignItems='center'>
              {content.features.map((feature, _id) => (
                <MotionText
                  key={feature}
                  variants={item}
                  alignSelf={{
                    base: _id % 2 === 0 ? 'flex-start' : 'flex-end',
                    md: _id % 2 === 0 ? 'flex-start' : 'center',
                  }}
                  w={{ base: '100%', sm: '70%' }}
                  bg='common.second'
                  color='common.main'
                  border='1px solide'
                  borderColor='common.main'
                  textAlign={'center'}
                  fontSize={['md', 'md', 'xl']}
                  mb='4'
                  p={2}
                  borderRadius='md'
                  whiteSpace='pre-wrap'
                  fontWeight='bold'
                >
                  {feature}
                </MotionText>
              ))}
            </Flex>
            <Flex justifyContent={'center'}>
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
            w={['100%', '50%']}
            h={'100%'}
            display={['none', 'none', 'block']}
            variants={container}
            initial='hidden'
            animate='enter'
            pos='relative'
          >
            {/* <iframe
              src='https://my.spline.design/iphone13copy-a0383159b7cc650c9d123c75f7a7d180/'
              frameBorder='0'
              width='100%'
              height='100%'
            ></iframe> */}
            {/* <Image
              src={HeroImg}
              alt='avatar wave'
              priority={true}
              placeholder='blur'
            />
            <MotionBox
              pos='absolute'
              bottom='0'
              right='-5%'
              bg='white'
              w='20%'
              h='20%'
              borderRadius='md'
              whileHover={{ scale: 1.2 }}
              animate={{
                y: [null, -20, 0],
                rotate: 90,
                transition: { repeat: Infinity, duration: 10 },
              }}
            />
            <MotionBox
              pos='absolute'
              top='10%'
              right='10%'
              bg='cyan.200'
              w='14%'
              h='14%'
              borderRadius='md'
              // transform='rotate(85deg)'
              whileHover={{ scale: 1.2 }}
              animate={{
                y: [0, 50, 0, 50, 0],
                rotate: 360,
                transition: { repeat: Infinity, duration: 15 },
              }}
            />
            <MotionBox
              pos='absolute'
              bottom='35%'
              left='5'
              bg='blue.200'
              w='10%'
              h='10%'
              borderRadius='md'
              // transform='rotate(15deg)'
              whileHover={{ scale: 1.2 }}
              animate={{
                y: [0, -10, 0, -10, 0],
                rotate: -360 / 2,
                transition: { repeat: Infinity, duration: 7 },
              }}
            /> */}
          </MotionBox>
          {/* <motion.div
                        animate={{ y: -5 }}
                        transition={{ yoyo: Infinity, duration: 1 }}
                    >
                        <ChevronDownIcon boxSize='14' color='text.second' />
                    </motion.div> */}
        </Flex>
      </Container>
      <Box h={'5%'} bg='white' border={'1px solid'}>
        <Container
          maxW='container.xl'
          h={'100%'}
          textAlign='center'
          overflow={'hidden'}
        >
          <Box className={styles.animation}>
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
    </Box>
  );
}
