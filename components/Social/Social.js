import { Container, Box, Heading } from '@chakra-ui/layout';
import Script from 'next/script';

export default function Social() {
    return (
        <Box id='social' background='white'>
            <Container maxW='container.xl' py='8'>
                <Heading as='h2' textAlign='center' mb='8'>
                    #FingeRate
                </Heading>
                <div
                    className='taggbox-container'
                    style={{ width: '100%', height: '100%', overflow: 'auto' }}
                >
                    <div
                        className='taggbox-socialwall'
                        data-wall-id='75100'
                        view-url='https://widget.taggbox.com/75100'
                    ></div>
                    <Script src='https://widget.taggbox.com/embed.min.js' />
                </div>
            </Container>
        </Box>
    );
}
