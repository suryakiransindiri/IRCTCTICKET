import { createTheme } from "@mui/material/styles";
import colors from "./colors";
import typography from "./typography";

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
    background: {
      default: colors.background,
    },
    text: {
      primary: colors.text.primary,
      secondary: colors.text.secondary,
    },
  },
  typography: typography,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",  // Rounded corners for all buttons
          padding: "8px 16px",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: colors.primary,
        },
      },
    },
  },
});

export default theme;
