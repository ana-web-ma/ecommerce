import { createTheme } from '@mui/material/styles';
import { grey, red } from '@mui/material/colors';
import { outlinedInputClasses } from '@mui/material';

const BELLOTA_FONT = 'Bellota Text';
const ECONOMICA_FONT = 'Economica';
const PLAYFAIR_FONT = 'Playfair Display';
// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#0000020',
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
    // Name of the component
    // MuiButton: {
    //   variants: [
    //     {
    //       props: { variant: 'contained' },
    //       style: {
    //         // textTransform: 'none',
    //         // fontFamily: BELLOTA_FONT,
    //         '&:hover': {
    //           opacity: 0.5,
    //           // transition: 'opacity 0.5s linear',
    //         },
    //       },
    //     },
    //   ],
    //   styleOverrides: {
    //     root: {
    //       // borderRadius: 0,
    //       // boxShadow: 'none',
    //       // '&.Mui-disabled': {
    //       //   fontSize: '15rem',
    //       // },
    //       transition: '0.2s',
    //       '&MuiInputBase': {
    //         color: 'pink',
    //       },
    //       '& .MuiInput-underline:after': {
    //         borderBottomColor: 'pink',
    //       },
    //       '& .MuiOutlinedInput-root': {
    //         '& fieldset': {
    //           borderColor: 'pink',
    //         },
    //         '&:hover fieldset': {
    //           borderColor: 'pink',
    //         },
    //         '&.Mui-focused fieldset': {
    //           borderColor: 'pink',
    //         },
    //       },
    //     },
    //   },
    // },

    MuiButton: {
      variants: [
        {
          props: { variant: 'contained' },
          style: {
            fontFamily: BELLOTA_FONT,
            fontWeight: 700,
            transition: '0.3s',
            '&:hover': {
              opacity: 0.5,
              transition: '0.3s',
            },
          },
        },
        {
          props: { variant: 'outlined' },
          style: {
            fontFamily: BELLOTA_FONT,
            fontWeight: 700,
            '&:hover': {
              backgroundColor: '#00000025',
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
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#00000000',
            path: {
              stroke: '#00000050',
            },
          },
        },
      },
    },

    // MuiInput: {
    //   styleOverrides: {
    //     root: {
    //       '&:before': {
    //         borderBottom: '1px solid #909090',
    //       },
    //       '&:hover:not(.Mui-disabled, .Mui-error):before': {
    //         borderBottom: '1px solid #282828',
    //       },
    //       '&.Mui-focused:after': {
    //         borderBottom: '1px solid #282828',
    //       },
    //     },
    //   },
    // },
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

    // MuiLink: {
    //   variants: [
    //     {
    //       props: { underline: 'none' },
    //       style: {},
    //     },
    //   ],
    // },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          margin: '5px 1px',
          fontFamily: BELLOTA_FONT,
        },
      },
    },
    MuiTextField: {
      variants: [
        {
          props: { variant: 'outlined' },
          style: {
            fontFamily: BELLOTA_FONT,
            '&:hover fieldset': {
              backgroundColor: '#00000002',
              transition: '0.2s',
            },
            '& fieldset': {
              backgroundColor: '#00000008',
              borderColor: '#00000000',
              transition: '0.2s',
            },
            // '&:hover': {
            //   // backgroundColor: 'white',
            //   // borderColor: 'green',
            //   // transition: '0.2s',
            //   // '& fieldset': {
            //   //   // backgroundColor: 'pink',
            //   //   // borderColor: 'pink',
            //   //   // transition: '0.2s',
            //   // },
            //   // '& .MuiOutlinedInput-notchedOutline': {
            //   //   borderColor: 'pink',
            //   // },
            // },
          },
        },
      ],
      // styleOverrides: {
      //   root: {
      //     styles: {
      //       '--TextField-brandBorderColor': 'blue',
      //       '--TextField-brandBorderHoverColor': 'red',
      //       '--TextField-brandBorderFocusedColor': 'green',
      //       '& label.Mui-focused': {
      //         color: 'var(--TextField-brandBorderFocusedColor)',
      //       },
      //     },
      //   },
      // },
    },
    // MuiOutlinedInput: {
    //   styleOverrides: {
    //     notchedOutline: {
    //       borderColor: '#00000040',
    //       cursor: 'default',
    //     },
    //     root: {
    //       [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
    //         borderColor: '#00000040',
    //         backgroundColor: '#FFFFFF',
    //       },
    //       [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
    //         borderColor: '#00000040',
    //         borderWeight: '2px',
    //       },
    //     },
    //   },
    // },
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
            fontSize: '13px',
            fontWeight: 700,
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
  },
});

export default theme;
