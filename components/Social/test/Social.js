import { Container, Grid, GridItem, Heading } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/react';

export default function Social({ text: { title, content } }) {
    const randomNum = (limit) => Math.floor(Math.random() * limit) + 1;

    const digits = Array.from({ length: 8 }, () => [
        randomNum(4),
        randomNum(3),
    ]).concat([
        [1, 1],
        [1, 1],
        [1, 1],
        [1, 1],
        [1, 1],
    ]);
    return (
        <Container as='section' id='social' maxW='container.xl' py='16'>
            <Heading textAlign='center' mb='8'>
                {title}
            </Heading>
            <Grid
                w='100%'
                gridGap='1'
                gridTemplateColumns='repeat(auto-fill, minmax(100px,1fr))'
                gridAutoRows='100px'
                gridAutoFlow='dense'
            >
                {digits.map(([w, h]) => (
                    <GridItem colSpan={w} rowSpan={h} overflow='hidden'>
                        <Image
                            src='https://source.unsplash.com/random'
                            objectFit='cover'
                            display='block'
                            w='100%'
                            h='100%'
                        />
                    </GridItem>
                ))}
            </Grid>
        </Container>
    );
}
