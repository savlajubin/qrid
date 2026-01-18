"use client";

import { useEffect, useMemo, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export default function AppThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(window.matchMedia("(prefers-color-scheme: dark)").matches);

  useEffect(() => {
    // Select the media query
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    // Define the listener function
    const handleChange = (e) => {
      // Check if user has a manual override saved
      const hasOverride = localStorage.getItem("qrido-dark-mode") !== null;

      // Only auto-switch if the user hasn't set a manual preference
      if (!hasOverride) {
        setDarkMode(e.matches);
      }
    };

    // Modern browsers (Chrome 88+, Safari 14+, Firefox 66+)
    mediaQuery.addEventListener("change", handleChange);

    // Cleanup to prevent memory leaks
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleDarkMode = (value) => {
    setDarkMode((prev) => {
      const newValue = typeof value === "boolean" ? value : !prev;
      localStorage.setItem("qrido-dark-mode", newValue);
      return newValue;
    });
  };

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
      {children({ darkMode, setDarkMode: toggleDarkMode })}
    </ThemeProvider>
  );
}
