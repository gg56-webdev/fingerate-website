import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: '#f4f5f7',
        color: '#09244d',
      },
    },
  },
  colors: {
    common: {
      main: '#710193',
      mainLight: '#c301fe',
      second: '#BFFFB3',
    },
    grades: {
      S: '#710193',
      A: '#06e08c', //#FFD700
      B: '#50adff',
      C: '#d56173',
      D: '#b784a7', //#ba8c63
    },
    text: {
      main: '#09244d',
      second: '#ffffff',
    },
  },
});

export const koreanTheme = extendTheme(
  {
    styles: {
      global: {
        body: { fontSize: '18px' },
      },
    },
    fonts: {
      heading: 'Do Hyeon',
      body: 'Gowun Dodum',
    },
    components: {
      Heading: {
        baseStyle: {
          fontWeight: 'normal',
          letterSpacing: '1px',
        },
      },
    },
  },
  theme
);
