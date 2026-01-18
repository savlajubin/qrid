"use client";

import { useEffect, useMemo, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export default function AppThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("qrido-dark-mode");
    if (stored !== null) {
      setDarkMode(stored === "true");
    } else {
      setDarkMode(
        window.matchMedia("(prefers-color-scheme: dark)").matches
      );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("qrido-dark-mode", darkMode);
  }, [darkMode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light"
        }
      }),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children({ darkMode, setDarkMode })}
    </ThemeProvider>
  );
}
