import { createTheme } from '@mui/material/styles';
import { blue, red } from '@mui/material/colors';

const BELLOTA_FONT = 'Bellota Text';
const ECONOMICA_FONT = 'Economica';
const PLAYFAIR_FONT = 'Playfair Display';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#888888',
    },
    error: {
      main: red.A400,
    },
  },
  shadows: [
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
  ],
  shape: {
    borderRadius: 0,
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'contained' },
          style: {
            fontFamily: BELLOTA_FONT,
            fontWeight: 700,
            transition: 'all .3s ease-in-out',
            '&:hover': {
              opacity: 0.5,
            },
          },
        },
        {
          props: { variant: 'outlined' },
          style: {
            fontFamily: BELLOTA_FONT,
            fontWeight: 700,
            transition: 'all .3s ease-in-out',
            '&:hover': {
              backgroundColor: '#00000015',
            },
          },
        },
        {
          props: { variant: 'text' },
          style: {
            fontFamily: BELLOTA_FONT,
          },
        },
      ],
    },
    MuiButtonBase: {
      defaultProps: {
        // The props to change the default for.
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
    },
    MuiContainer: {
      styleOverrides: {
        maxWidthXl: {
          maxWidth: 1600,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          '& span': {
            fontFamily: ECONOMICA_FONT,
            fontSize: '20px',
            fontWeight: 700,
            textTransform: 'uppercase',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'all .3s ease-in-out',
          '&:hover': {
            backgroundColor: '#00000000',
            path: {
              stroke: '#00000050',
            },
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontFamily: BELLOTA_FONT,
          '& input': {
            fontWeight: '600',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: BELLOTA_FONT,
          fontWeight: 700,
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          margin: '5px 1px',
          fontFamily: BELLOTA_FONT,
        },
      },
    },
    MuiPaper: {
      variants: [
        {
          props: { variant: 'outlined' },
          style: {
            padding: '15px',
            backgroundColor: '#F6F6F6',
            borderColor: '#D9D9D9',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              backgroundColor: '#FFFFFF',
            },
          },
        },
      ],
    },
    MuiTextField: {
      variants: [
        {
          props: { variant: 'outlined' },
          style: {
            fontFamily: BELLOTA_FONT,
            transition: 'all 0.2s ease-in-out',
            '&:hover fieldset': {
              backgroundColor: '#00000002',
            },
            '& fieldset': {
              backgroundColor: '#00000008',
              borderColor: '#00000000',
            },
          },
        },
      ],
    },
    MuiTypography: {
      variants: [
        {
          props: { variant: 'h1' },
          style: {
            fontFamily: PLAYFAIR_FONT,
            fontSize: '60px',
            textTransform: 'uppercase',
          },
        },
        // HEADLINE 1
        {
          props: { variant: 'h2' },
          style: {
            fontFamily: PLAYFAIR_FONT,
            fontSize: '60px',
            textTransform: 'uppercase',
          },
        },
        // Form title
        {
          props: { variant: 'h3' },
          style: {
            fontFamily: BELLOTA_FONT,
            fontSize: '20px',
            fontWeight: 700,
            textTransform: 'uppercase',
          },
        },
        {
          props: { variant: 'h4' },
          style: {
            fontFamily: BELLOTA_FONT,
          },
        },
        {
          props: { variant: 'h5' },
          style: {
            fontFamily: PLAYFAIR_FONT,
          },
        },
        {
          props: { variant: 'h6' },
          style: {
            fontFamily: PLAYFAIR_FONT,
          },
        },
        // HEADLINE 2
        {
          props: { variant: 'subtitle1' },
          style: {
            fontFamily: BELLOTA_FONT,
            fontSize: '15px',
            textTransform: 'uppercase',
            fontWeight: 700,
          },
        },
        // HEADLINE 3
        {
          props: { variant: 'subtitle2' },
          style: {
            fontFamily: ECONOMICA_FONT,
            fontSize: '20px',
            fontWeight: 700,
            textTransform: 'uppercase',
          },
        },
        {
          props: { variant: 'body1' },
          style: {
            fontFamily: BELLOTA_FONT,
            fontSize: '15px',
            textTransform: 'uppercase',
          },
        },
        {
          props: { variant: 'body2' },
          style: {
            fontFamily: BELLOTA_FONT,
            fontSize: '15px',
            fontWeight: 700,
          },
        },
        {
          props: { variant: 'button' },
          style: {
            fontFamily: BELLOTA_FONT,
          },
        },
        {
          props: { variant: 'caption' },
          style: {
            fontFamily: BELLOTA_FONT,
          },
        },
        {
          props: { variant: 'overline' },
          style: {
            fontFamily: BELLOTA_FONT,
          },
        },
        {
          props: { variant: 'inherit' },
          style: {
            fontFamily: BELLOTA_FONT,
          },
        },
      ],
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#00000040',
          fontWeight: 700,
          textDecoration: 'underline',
          cursor: 'pointer',
          transition: 'all .3s ease-in-out',
          '&:hover': {
            color: '#00000060',
          },
          '&:active': {
            color: '#00000090',
          },
        },
      },
    },
  },
});

export default theme;
