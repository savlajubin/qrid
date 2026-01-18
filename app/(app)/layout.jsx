"use client";

import { Box } from "@mui/material";

import "../styles/globals.css";
import AppThemeProvider from "../../components/AppThemeProvider";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppThemeProvider>
          {({ darkMode, setDarkMode }) => (
            <Box
              minHeight="100vh"
              display="flex"
              flexDirection="column"
            >
              {/* GLOBAL HEADER */}
              <Header
                darkMode={darkMode}
                onToggleDarkMode={() =>
                  setDarkMode(v => !v)
                }
              />

              {/* PAGE CONTENT */}
              <Box flexGrow={1}>{children}</Box>

              {/* GLOBAL FOOTER */}
              <Footer />
            </Box>
          )}
        </AppThemeProvider>
      </body>
    </html>
  );
}
