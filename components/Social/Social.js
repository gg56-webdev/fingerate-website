import { Container, Grid, GridItem, Heading } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/react';
import Item from './Item';

export default function Social({ text: { title, content } }) {
    return (
        <Container as='section' id='social' maxW='container.xl' py='16'>
            <Heading textAlign='center' mb='8'>
                {title}
            </Heading>
            <Grid
                gridGap='1'
                // gridTemplateColumns='repeat(auto-fill, minmax(100px,1fr))'
                gridTemplateColumns='repeat(4, 1fr)'
                gridAutoRows='100px'
                gridAutoFlow='dense'
            >
                <Item rs='3' cs='2'>
                    1
                </Item>
                <Item rs='1' cs='3'>
                    2
                </Item>
                <Item rs='2' cs='2'>
                    3
                </Item>
                <Item rs='2' cs='1'>
                    4
                </Item>
                <Item cs='1' rs='1'>
                    5
                </Item>
            </Grid>
        </Container>
    );
}
