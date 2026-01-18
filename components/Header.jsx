import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Divider
} from "@mui/material";

import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import HomeIcon from "@mui/icons-material/Home";
import DocsIcon from "@mui/icons-material/LibraryBooks";
import { APP_DESCRIPTION, APP_NAME, SOCIALS } from "../lib/constants";

export default function Header({ darkMode, onToggleDarkMode }) {
  return (
    <AppBar position="sticky" elevation={0} color="default">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT */}
        <Box display="flex" alignItems="center" gap={1.5} sx={{ height: 64 }}>
          <Box
            component="img"
            src={darkMode ? "/images/js-logo-512-dark.png" : "/images/js-logo-512-light.png"}
            alt={`${APP_NAME} Logo`}
            sx={{
              height: '100%',     // Fill the parent Box height
              width: 'auto',       // Maintain aspect ratio
              maxHeight: '64px',   // Optional: prevent it from getting too huge on massive screens
              py: 0.5              // Optional: adds a tiny bit of "breathing room" top and bottom
            }}
          />
          <Box>
            <Typography variant="h6" fontWeight={600} lineHeight={1.1}>
              {APP_NAME}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {APP_DESCRIPTION}
            </Typography>
          </Box>
        </Box>

        {/* RIGHT */}
        <Box display="flex" alignItems="center">
          <IconButton
            href="/"
            aria-label="Home"
          >
            <HomeIcon />
          </IconButton>

          <IconButton
            href="/docs"
            aria-label="Documentation"
          >
            <DocsIcon />
          </IconButton>

          <IconButton
            href={SOCIALS.GITHUB}
            target="_blank"
            aria-label="GitHub"
          >
            <GitHubIcon />
          </IconButton>

          <IconButton
            href={SOCIALS.LINKEDIN}
            target="_blank"
            aria-label="LinkedIn"
          >
            <LinkedInIcon />
          </IconButton>

          <IconButton
            onClick={onToggleDarkMode}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Box>
      </Toolbar>
      <Divider />
    </AppBar>
  );
}
