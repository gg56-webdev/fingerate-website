import { Container, Box, Heading, Link, Text, Flex } from '@chakra-ui/layout';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import Image from 'next/image';

import SlideShow from './slideshow/SlideShow';
import SlideAnim from '../../utils/SlideAnim';
import { Button } from '@chakra-ui/react';

// export default function Promo({ text: { name, content } }) {
//     return (
//         <Box bgColor='white' id='promo'>
//             <Container maxW='container.xl' py='8' whiteSpace='pre-wrap'>
//                 <SlideAnim>
//                     <SlideShow content={content} />
//                 </SlideAnim>
//             </Container>
//         </Box>
//     );
// }

const priceListWon = { S: 1_000_000, A: 750_000, B: 500_000 };

export default function Promo({ sots, text: { name, content } }) {
  return (
    <Box id='promo'>
      <Container maxW='container.xl' py='8' whiteSpace='pre-wrap'>
        <Heading as='h2' textAlign={'center'} mb={6}>
          Featured SoT&apos;s
        </Heading>
        <Swiper
          slidesPerView={5}
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          //   pagination={{ clickable: true }}
          loop={true}
          autoplay={{ delay: 5000 }}
          observer={true}
          observeParents={true}
          spaceBetween={25}
          // autoHeight={true}
        >
          {sots.map((sot) => (
            <SwiperSlide key={sot.id}>
              <Flex
                flexDir={'column'}
                borderRadius={6}
                border={'1px solid '}
                borderColor={'common.main'}
              >
                <Image
                  width={200}
                  height={200}
                  src={sot.image}
                  blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkrAcAAIcAgit25/8AAAAASUVORK5CYII='
                  placeholder='blur'
                  alt={`Thumbnail of ${sot.id}`}
                />
                <Text fontWeight={'bold'} textAlign={'center'}>
                  ₩ {priceListWon[sot.grade]}
                </Text>
                <Link
                  bg={'common.main'}
                  display={'block'}
                  width={'100%'}
                  textAlign={'center'}
                  color={'white'}
                  py='1'
                  px='2'
                  borderRadius={6}
                  href={sot.url}
                  target={'_blank'}
                  isExternal
                >
                  Buy SoT
                </Link>
                <Text textAlign={'center'}>{sot.location}</Text>
              </Flex>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </Box>
  );
}
