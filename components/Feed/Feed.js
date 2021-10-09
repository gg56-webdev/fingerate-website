import { Box, Heading, Container, Flex, Text } from '@chakra-ui/layout';
import Counter from './Counter';
import {
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    StatGroup,
} from '@chakra-ui/stat';

export default function Feed({ text: { title, content } }) {
    return (
        <Box
            as='section'
            id='feed'
            w='100%'
            bgColor='common.second'
            pt='10'
            color='blackAlpha.800'
            py='16'
        >
            <Container maxW='container.lg'>
                <Heading as='h2' textAlign='center' mb='8'>
                    {title}
                </Heading>
                <StatGroup>
                    <Stat textAlign='center'>
                        <StatLabel as='h3' fontSize={['md', 'xl']}>
                            {content[0]}
                        </StatLabel>
                        <Counter to={112_087} />
                    </Stat>
                    <Stat textAlign='center'>
                        <StatLabel as='h3' fontSize={['md', 'xl']}>
                            {content[1]}
                        </StatLabel>
                        <Counter to={6_590} />
                    </Stat>
                </StatGroup>
            </Container>
        </Box>
    );
}
