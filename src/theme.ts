import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { outlinedInputClasses } from '@mui/material';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#19857b',
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
    MuiButton: {
      variants: [
        {
          props: { variant: 'contained' },
          style: {
            textTransform: 'none',
            fontFamily: 'bellota-text',
            '&:hover': {
              opacity: 0.5,
              // transition: 'opacity 0.5s linear',
            },
          },
        },
      ],
      styleOverrides: {
        root: {
          // borderRadius: 0,
          // boxShadow: 'none',
          // '&.Mui-disabled': {
          //   fontSize: '15rem',
          // },
          transition: '0.5s',
          '&MuiInputBase': {
            color: 'pink',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: 'pink',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'pink',
            },
            '&:hover fieldset': {
              borderColor: 'pink',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'pink',
            },
          },
        },
      },
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
    MuiInput: {
      styleOverrides: {
        root: {
          '&:before': {
            borderBottom: '1px solid #909090',
          },
          '&:hover:not(.Mui-disabled, .Mui-error):before': {
            borderBottom: '1px solid #282828',
          },
          '&.Mui-focused:after': {
            borderBottom: '1px solid #282828',
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
    // MuiTextField: {
    // variants: [
    //   {
    //     props: { variant: 'outlined' },
    //     style: {
    //       '&:hover': {
    //         backgroundColor: '#00000025',
    //         borderColor: '#00000050',
    //         transition: '0.5s',
    //       },
    //     },
    //   },
    // ],
    // styleOverrides: {
    //   root: {
    //     styles: {
    //       '--TextField-brandBorderColor': '#000000',
    //       '--TextField-brandBorderHoverColor': '#B2BAC2',
    //       '--TextField-brandBorderFocusedColor': '#6F7E8C',
    //       '& label.Mui-focused': {
    //         color: 'var(--TextField-brandBorderFocusedColor)',
    //       },
    //     },
    //   },
    // },
    // },
    // MuiOutlinedInput: {
    //   styleOverrides: {
    //     notchedOutline: {
    //       borderColor: '#00000040',
    // cursor: 'default',
    //     },
    //     root: {
    // [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
    //   borderColor: '#00000040',
    //   backgroundColor: '#FFFFFF',
    // },
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
          props: { variant: 'h2' },
          style: {
            fontFamily: 'bellota-text',
          },
        },
        {
          props: { variant: 'body1' },
          style: {
            fontFamily: 'bellota-text',
          },
        },
      ],
    },
  },
});

export default theme;
