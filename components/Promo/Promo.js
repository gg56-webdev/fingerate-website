import { Container, Box } from '@chakra-ui/layout';
import SlideShow from './slideshow/SlideShow';
import SlideAnim from '../utils/SlideAnim';

export default function Promo() {
    return (
        <Box bgColor='white' id='promo'>
            <Container maxW='container.xl' py='8'>
                <SlideAnim>
                    <SlideShow />
                </SlideAnim>
            </Container>
        </Box>
    );
}
