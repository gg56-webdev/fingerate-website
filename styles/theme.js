import { extendTheme } from '@chakra-ui/react';
import { Card } from './Card';

export const theme = extendTheme({
    styles: {
        global: {
            body: {
                bg: '#f4f5f7',
                color: '#09244d',
            },
        },
    },
    textStyles: {
        imgs: {
            fontSize: 'min(2vw, 25px)',
        },
    },
    colors: {
        common: {
            main: '#710193',
            second: '#BFFFB3',
        },
        text: {
            main: '#09244d',
            second: '#ffffff',
        },
    },
    components: {
        Card,
    },
});
