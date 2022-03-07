import { Box, Container, Flex, Grid, Link } from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import { ExternalLinkIcon } from '@chakra-ui/icons';

const news = '';
export default function News() {
  return (
    <Box
      zIndex={2}
      flexBasis={'50px'}
      bg='cyan.100'
      borderTop={'1px solid'}
      borderBottom={'1px solid'}
      borderColor='common.mainLight'
    >
      <Container maxW='container.lg' overflow={'hidden'} px='2'>
        <Grid gridTemplateColumns={'auto 1fr'} gap={{ base: 2, md: 4 }}>
          <Box
            alignSelf={'center'}
            color='common.main'
            fontWeight={'bold'}
            fontSize='xl'
            pr={{ base: 2, md: 4 }}
            borderRight={'4px solid'}
            borderColor='common.main'
          >
            News
          </Box>
          <Swiper
            modules={[Autoplay]}
            direction={'vertical'}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            speed={500}
            style={{ height: '50px', width: '100%' }}
          >
            {news &&
              news.map((article) => (
                <SwiperSlide key={article.article}>
                  <Flex
                    h='100%'
                    justifyContent={'space-between'}
                    flexDir='row'
                    overflow={'hidden'}
                    alignItems={{ md: 'center' }}
                  >
                    <Link href={article.href} isExternal color='blue'>
                      {article.article}
                      <ExternalLinkIcon />
                    </Link>
                    <Box
                      as='time'
                      dateTime={article.date}
                      fontSize={{ base: 'sm', md: 'md' }}
                      alignSelf='center'
                    >
                      {article.date}
                    </Box>
                  </Flex>
                </SwiperSlide>
              ))}
          </Swiper>
        </Grid>
      </Container>
    </Box>
  );
}
