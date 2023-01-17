import { Box, Container, Flex, Grid, Link } from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import { ExternalLinkIcon } from '@chakra-ui/icons';

export default function News({ news, title }) {
  return (
    <Box bg='cyan.100' borderTop={'1px solid'} borderBottom={'1px solid'} borderColor='common.mainLight'>
      <Container maxW='container.lg' p='1'>
        <Grid gridTemplateColumns={'auto 1fr'} gap={{ md: 4 }}>
          <Box
            alignSelf={'center'}
            color='common.main'
            fontWeight={'bold'}
            fontSize='xl'
            pr='4'
            borderRight={'4px solid'}
            borderColor='common.main'
            display={{ base: 'none', md: 'block' }}
          >
            {title}
          </Box>
          <Swiper
            modules={[Autoplay]}
            direction={'vertical'}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            speed={500}
            style={{ height: '55px', width: '100%' }}
          >
            {news &&
              news.map((article) => (
                <SwiperSlide key={article.title}>
                  <Flex
                    as='article'
                    h='full'
                    justifyContent={'space-between'}
                    flexDir='row'
                    alignItems='center'
                    sx={{ gap: 1 }}
                  >
                    <Link href={article.link} isExternal color='blue' lineHeight='0.9' noOfLines='3'>
                      {article.title}
                      <ExternalLinkIcon />
                    </Link>
                    <Box as='time' dateTime={article.time} fontSize={{ base: 'sm', md: 'md' }}>
                      {article.time.replace(/ /g, '')}
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
