import { Container, Box } from '@chakra-ui/layout';
import SlideShow from './slideshow/SlideShow';
import SlideAnim from '../utils/SlideAnim';

export default function Promo({ text: { name, content } }) {
    return (
        <Box bgColor='white' id='promo'>
            <Container maxW='container.xl' py='8' whiteSpace='pre-wrap'>
                <SlideAnim>
                    <SlideShow content={content} />
                </SlideAnim>
            </Container>
        </Box>
    );
}
