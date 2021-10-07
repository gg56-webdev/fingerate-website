import { Box, Heading, Container, Flex,Text } from "@chakra-ui/layout"
import Counter from "./Counter"

export default function Feed({ text: { title, content } }) {
    return(
        <Box as='section' id='feed' w='100%'  bgColor='common.second' pt='10' color="blackAlpha.800" py='16'>
            <Container maxW='container.lg'>
                <Heading as='h2' textAlign='center' mb="8">{title}</Heading>
                <Flex justify={['space-around','space-evenly']}>
                    <Flex textAlign='center'  justifyContent='space-between' flexDir='column'>
                        <Heading as='h3' fontSize={['md','xl']}>
                           {content[0]}
                        </Heading>
                        <Counter to={112_087} />
                    </Flex>
                    <Flex textAlign='center' justifyContent='space-between' flexDir='column'>
                        <Heading as='h3'  fontSize={['md','xl']}>
                            {content[1]}
                        </Heading>
                        <Counter to={6_590} />
                    </Flex>
                </Flex>
            </Container>
        </Box>
    )
}