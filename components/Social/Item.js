import { GridItem, Grid } from '@chakra-ui/layout';

export default function Item({ rs = 1, cs = 1, children }) {
    return (
        <GridItem rowSpan={rs} colSpan={cs} borderRadius='md' overflow='hidden'>
            <Grid placeItems='center' color='white' bgColor='black' h='100%'>
                {children}
            </Grid>
        </GridItem>
    );
}
