import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        textAlign: "center",
        borderTop: "1px solid",
        borderColor: "divider"
      }}
    >
      <Typography variant="caption" color="text.secondary">
        Built by Jubin
      </Typography>
    </Box>
  );
}
