import { Box, useStyleConfig } from '@chakra-ui/react';

export default function Card(props) {
    const { children, ...rest } = props;
    const styles = useStyleConfig('Card');

    return (
        <Box __css={styles} {...rest}>
            {children}
        </Box>
    );
}
