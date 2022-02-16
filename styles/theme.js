import { extendTheme } from '@chakra-ui/react';
import { Card } from './Card';

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: '#f4f5f7',
        color: '#09244d',
        fontSize: '18px',
      },
    },
  },
  colors: {
    common: {
      main: '#710193',
      mainLight: '#c301fe',
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

export const koreanTheme = extendTheme(
  {
    fonts: {
      heading: 'Do Hyeon',
      body: 'Gowun Dodum',
    },
    components: {
      Heading: {
        baseStyle: {
          fontWeight: 'normal',
        },
      },
    },
  },
  theme
);
