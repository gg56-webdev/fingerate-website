import {
    Box,
    Container,
    Grid,
    Heading,
    ListItem,
    OrderedList,
    SimpleGrid,
    Stack,
    Text,
    UnorderedList,
} from '@chakra-ui/layout';
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import Image from 'next/image';
import SlideAnim from '../utils/SlideAnim';
import Card from '../utils/Card';

export default function Sot({ content }) {
    return (
        <Container maxW='container.xl' pt='16' pb='8'>
            <Grid
                gridTemplateAreas={{
                    base: `'heading' 'img' 'list'`,
                    md: `'heading' 'img' 'list'`,
                    lg: `'heading list' 'img list'`,
                }}
                gridTemplateColumns={['1fr', '1fr', '1fr', '2fr 4fr']}
                justifyItems='center'
                alignItems='center'
                rowGap={['8', '8', '0']}
                columnGap='12'
            >
                <Stack spacing='6' gridArea='heading' textAlign='center'>
                    <Heading as='h2'>{content.h2}</Heading>
                    <Text gridArea='sub' fontSize='lg'>
                        {content.p}
                    </Text>
                </Stack>
                <Box gridArea='img'>
                    <Image
                        src='/about/sot.png'
                        width='500'
                        height='500'
                        alt='SoT virtual terminal with example of survey on the screen'
                    />
                </Box>
                <Stack spacing='16' gridArea='list'>
                    <Stack spacing='6'>
                        <Heading
                            fontSize='lg'
                            as='h3'
                            textAlign='center'
                            textDecoration='underline'
                        >
                            {content.how}
                        </Heading>
                        <OrderedList spacing='4' pl='4'>
                            {content.ol.map((i, index) => (
                                <ListItem key={index}>{i}</ListItem>
                            ))}
                        </OrderedList>
                    </Stack>
                    <Stack spacing='6'>
                        <Heading
                            fontSize='lg'
                            as='h3'
                            textAlign='center'
                            textDecoration='underline'
                        >
                            {content.benefit}
                        </Heading>
                        <SimpleGrid columns={[1, 1, 3]} spacing={4}>
                            {content.table.map((i, index) => (
                                <Box
                                    key={index}
                                    bgColor='white'
                                    // bgGradient={i[3]}
                                    // color='white'
                                    borderRadius='md'
                                    p={2}
                                    shadow='md'
                                    border='2px'
                                    borderColor={i[4]}
                                >
                                    <Heading
                                        as='h4'
                                        fontSize={'xl'}
                                        textAlign='center'
                                        mb='4'
                                        color={i[4]}
                                    >
                                        {i[0]}
                                    </Heading>
                                    <UnorderedList
                                        spacing='4'
                                        listStyleType='none'
                                    >
                                        <ListItem>{i[1]}</ListItem>
                                        <ListItem>{i[2]}</ListItem>
                                    </UnorderedList>
                                </Box>
                            ))}
                        </SimpleGrid>
                    </Stack>
                </Stack>
            </Grid>
        </Container>
    );
}
