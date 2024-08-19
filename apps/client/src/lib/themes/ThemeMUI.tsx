import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles/createPalette' {
    interface Palette {
        tertiary: PaletteColorOptions;
    }
    interface PaletteOptions {
        tertiary: PaletteColorOptions;
    }
}

declare module '@mui/material/styles' {
    interface BreakpointOverrides {
        xs: false, // removes the `xs` breakpoint
        sm: false,
        md: false,
        lg: false,
        xl: false,
        ms: true,   // Add new breakpoints to match with tailwind
        mm: true,
        ml: true,
        tab: true,
        lap: true,
        pc: true;
    }
}

const ThemeMUI = createTheme({
    typography: {
        allVariants: {
            fontFamily: 'Nunito, Roboto, sans-serif',
            textTransform: 'none'
        }
    },
    palette: {
        primary: {
            main: "#6D9E8D"
        },
        secondary: {
            main: "hsl(259, 20%, 60%)"
        },
        tertiary: {
            main: "#AC86AF"
        },
        background: {
            default: "#F3F7F6"
        },
        text: {
            primary: "#0C1210"
        }
    },
    breakpoints: {
        values: {
            ms: 360,
            mm: 400,
            ml: 580,
            tab: 780,
            lap: 1023,
            pc: 1440
        }
    },
    components: {
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    "&.Mui-selected, &.Mui-selected:hover": {
                        backgroundColor: "hsl(159, 20%, 60%)"
                    }
                }
            }
        }
    }
});

export default ThemeMUI;