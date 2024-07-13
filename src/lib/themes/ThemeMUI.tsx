import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles/createPalette' {
    interface Palette {
        tertiary: PaletteColorOptions;
    }
    interface PaletteOptions {
        tertiary: PaletteColorOptions;
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
        },
    }
});

export default ThemeMUI;